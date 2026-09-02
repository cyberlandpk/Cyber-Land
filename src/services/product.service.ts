import type { Product } from "@/types";
import {
  collectionMeta,
  products,
} from "@/features/products/data/catalog";
import { woocommerceService } from "./woocommerce.service";

/**
 * Product service — all product data access goes through here.
 *
 * Deterministic data-source strategy:
 * 1. When WooCommerce is configured, it is the PRIMARY source.
 * 2. The local catalog is merged in (deduplicated by handle) so demo
 *    products remain reachable and "related products" keep working across
 *    both sources.
 * 3. If WooCommerce fails, everything falls back to the local catalog.
 */

/** Merge two product lists, deduplicating by handle (first occurrence wins). */
function mergeProducts(primary: Product[], secondary: Product[]): Product[] {
  const seen = new Set<string>();
  const out: Product[] = [];
  for (const p of [...primary, ...secondary]) {
    const key = (p.handle || p.id).toLowerCase();
    if (seen.has(key)) continue;
    seen.add(key);
    out.push(p);
  }
  return out;
}

/** Fetch the merged catalog (Woo primary + local), or local-only on failure. */
async function getCatalog(): Promise<Product[]> {
  if (woocommerceService.isConfigured()) {
    try {
      const wcProducts = await woocommerceService.getProducts();
      // Woo is primary; local catalog fills in any handles Woo doesn't have.
      return mergeProducts(wcProducts, products);
    } catch (err) {
      console.warn("WooCommerce API fetch failed, using catalog fallback:", err);
    }
  }
  return [...products];
}

/** Deterministic, slug-based collection matching (no title heuristics). */
function matchesCollection(product: Product, handle: string): boolean {
  const h = handle.toLowerCase();
  const cols = product.collection.map((c) => c.toLowerCase());
  const tags = (product.tags ?? []).map((t) => t.toLowerCase());

  if (cols.includes(h)) return true;

  // Alias groups map to the exact slugs used by the store.
  const ALIASES: Record<string, string[]> = {
    "shop-all": ["all", "products"],
    all: ["products"],
    products: ["all"],
    laptops: ["new-laptops", "used-laptops"],
    "new-laptops": ["laptops"],
    "used-laptops": ["laptops"],
    cpu: ["new-cpu", "used-cpu"],
    "new-cpu": ["cpu"],
    "used-cpu": ["cpu"],
    "gaming-mouse-and-mousepad": ["mouse-mousepads", "mouse"],
    "mouse-and-mousepads": ["gaming-mouse-and-mousepad"],
  };

  // A parent collection shows child collection products (laptops ⊃ new-laptops).
  const childAliases = ALIASES[h];
  if (childAliases?.some((a) => cols.includes(a) || tags.includes(a))) {
    return true;
  }

  // Exact tag match is a legitimate, store-assigned signal.
  if (tags.includes(h)) return true;

  return false;
}

export const productService = {
  async getAll(): Promise<Product[]> {
    return getCatalog();
  },

  async getByHandle(handle: string): Promise<Product | null> {
    const h = handle.toLowerCase();
    if (woocommerceService.isConfigured()) {
      try {
        const wcProducts = await woocommerceService.getProducts({ slug: handle });
        if (wcProducts.length > 0) return wcProducts[0];
      } catch (err) {
        console.warn(
          "WooCommerce API getByHandle failed, using catalog fallback:",
          err
        );
      }
    }
    return products.find((p) => p.handle.toLowerCase() === h) ?? null;
  },

  async getById(id: string): Promise<Product | null> {
    if (woocommerceService.isConfigured()) {
      try {
        const product = await woocommerceService.getProductById(id);
        if (product) return product;
      } catch (err) {
        console.warn("WooCommerce API getById failed, using catalog fallback:", err);
      }
    }
    return products.find((p) => p.id === id) ?? null;
  },

  async getByCollection(handle: string): Promise<Product[]> {
    const h = handle.toLowerCase();

    // "all" / "shop-all" / "products" always show the full merged catalog.
    if (h === "all" || h === "shop-all" || h === "products") {
      return getCatalog();
    }

    const all = await getCatalog();
    return all.filter((p) => matchesCollection(p, h));
  },

  async getCollectionCounts(): Promise<Record<string, number>> {
    const handles = Object.keys(collectionMeta);
    const all = await getCatalog();
    const counts: Record<string, number> = {};
    for (const handle of handles) {
      const h = handle.toLowerCase();
      if (h === "all" || h === "shop-all" || h === "products") {
        counts[handle] = all.length;
        continue;
      }
      counts[handle] = all.filter((p) => matchesCollection(p, h)).length;
    }
    return counts;
  },

  async getRelated(product: Product, limit = 4): Promise<Product[]> {
    // Related products are computed from the SAME merged catalog the product
    // itself came from, so Woo and local products can reference each other.
    const all = await getCatalog();
    return all
      .filter(
        (p) =>
          p.id !== product.id &&
          p.collection.some((c) =>
            product.collection.map((x) => x.toLowerCase()).includes(c.toLowerCase())
          )
      )
      .slice(0, limit);
  },

  async search(query: string): Promise<Product[]> {
    const q = query.trim().toLowerCase();
    if (!q) return [];

    // 1. Ask WooCommerce first (the real shop source).
    const wcResults: Product[] = [];
    if (woocommerceService.isConfigured()) {
      try {
        const wcProducts = await woocommerceService.getProducts({ search: query });
        wcResults.push(...wcProducts);
      } catch (err) {
        console.warn("WooCommerce search API failed, using catalog fallback:", err);
      }
    }

    // 2. Merge with local-catalog matches, deduplicated by handle.
    const all = await getCatalog();
    const localMatches = all.filter(
      (p) =>
        p.title.toLowerCase().includes(q) ||
        p.tags?.some((t) => t.includes(q)) ||
        p.collection.some((c) => c.includes(q)) ||
        p.description?.toLowerCase().includes(q)
    );

    return mergeProducts(wcResults, localMatches);
  },

  getCollectionMeta(handle: string) {
    return (
      collectionMeta[handle] ?? {
        title: handle
          .replace(/-/g, " ")
          .replace(/\b\w/g, (c) => c.toUpperCase()),
      }
    );
  },
};
