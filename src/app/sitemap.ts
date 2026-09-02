import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";
import { supportPages, policyPages } from "@/constants/pages-content";
import { collectionMeta, products } from "@/features/products/data/catalog";
import { woocommerceService } from "@/services/woocommerce.service";
import type { Product } from "@/types";

/**
 * Sitemap reflects real indexable content:
 * - static content routes
 * - all collections (from collectionMeta)
 * - products from the real shop source (WooCommerce when configured,
 *   merged/deduplicated with the local catalog)
 * Private/utilities routes (cart, checkout, account, search) are excluded —
 * robots.ts also disallows them.
 */
export const dynamic = "force-dynamic";

async function getLiveProducts(): Promise<Product[]> {
  const local = products;
  if (!woocommerceService.isConfigured()) return local;
  try {
    const wcProducts = await woocommerceService.getProducts({
      per_page: 100,
      status: "publish",
    });
    // Deduplicate by handle; Woo (live) entries win.
    const seen = new Set<string>();
    const out: Product[] = [];
    for (const p of [...wcProducts, ...local]) {
      const key = (p.handle || p.id).toLowerCase();
      if (seen.has(key)) continue;
      seen.add(key);
      out.push(p);
    }
    return out;
  } catch {
    return local;
  }
}

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = siteConfig.url.replace(/\/$/, "");
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/collections",
    "/blogs/tech-blog",
  ].map((path) => ({
    url: `${base}${path}`,
    lastModified: now,
    changeFrequency: path === "" ? "daily" : "weekly",
    priority: path === "" ? 1 : 0.7,
  }));

  const collections: MetadataRoute.Sitemap = Object.keys(collectionMeta)
    .filter((handle) => handle !== "all")
    .map((handle) => ({
      url: `${base}/collections/${handle}`,
      lastModified: now,
      changeFrequency: "weekly" as const,
      priority: 0.8,
    }));

  const liveProducts = await getLiveProducts();
  const productRoutes: MetadataRoute.Sitemap = liveProducts.map((p) => ({
    url: `${base}/products/${p.handle}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: 0.9,
  }));

  const pages: MetadataRoute.Sitemap = Object.keys(supportPages).map((slug) => ({
    url: `${base}/pages/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));

  const policies: MetadataRoute.Sitemap = Object.keys(policyPages).map(
    (slug) => ({
      url: `${base}/policies/${slug}`,
      lastModified: now,
      changeFrequency: "yearly" as const,
      priority: 0.3,
    })
  );

  const blogPosts: MetadataRoute.Sitemap = [
    "anzu-v2-launch",
    "hive75-v2-guide",
    "level-up-your-setup",
    "streaming-essentials",
  ].map((slug) => ({
    url: `${base}/blogs/tech-blog/${slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.6,
  }));

  return [
    ...staticRoutes,
    ...collections,
    ...productRoutes,
    ...pages,
    ...policies,
    ...blogPosts,
  ];
}
