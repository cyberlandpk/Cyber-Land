"use client";

import { useMemo, useState } from "react";
import { FilterX } from "lucide-react";
import type { Product } from "@/features/products";
import ProductCard from "@/components/common/ProductCard";
import CategoryComingSoon from "./CategoryComingSoon";
import { cn } from "@/utils";

type Props = {
  title: string;
  description?: string;
  categoryHandle?: string;
  products: Product[];
};

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

export default function CollectionView({
  title,
  description,
  categoryHandle,
  products,
}: Props) {
  const [sort, setSort] = useState<SortKey>("featured");
  const [inStockOnly, setInStockOnly] = useState(false);

  const filtered = useMemo(() => {
    let list = [...products];
    if (inStockOnly) list = list.filter((p) => p.available);
    switch (sort) {
      case "price-asc":
        list.sort((a, b) => a.price - b.price);
        break;
      case "price-desc":
        list.sort((a, b) => b.price - a.price);
        break;
      case "name":
        list.sort((a, b) => a.title.localeCompare(b.title));
        break;
      default:
        break;
    }
    return list;
  }, [products, sort, inStockOnly]);

  const hasNoProductsAtAll = products.length === 0;

  return (
    <section className="section section--padding">
      <div className="page-width">
        {/* Header Title & Description */}
        <div className="mb-6 md:mb-8">
          <h1 className="section-title">{title}</h1>
          {description && (
            <p className="mt-2 max-w-2xl text-sm text-black/60 md:text-base">
              {description}
            </p>
          )}
        </div>

        {/* Category has NO products: Render the Red Themed Coming Soon UI */}
        {hasNoProductsAtAll ? (
          <CategoryComingSoon
            title={title}
            description={description}
            categoryHandle={categoryHandle}
          />
        ) : (
          <>
            {/* Filter & Sort Bar (Only when category actually has products) */}
            <div className="mb-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-black/50">
                {filtered.length} product{filtered.length !== 1 ? "s" : ""}
              </p>
              <div className="flex flex-wrap items-center gap-3">
                <label className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    checked={inStockOnly}
                    onChange={(e) => setInStockOnly(e.target.checked)}
                    className="h-4 w-4 rounded border-black/20 accent-[#BC0000]"
                  />
                  In stock only
                </label>
                <select
                  value={sort}
                  onChange={(e) => setSort(e.target.value as SortKey)}
                  className={cn(
                    "rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-medium outline-none transition focus:border-[#BC0000]"
                  )}
                  aria-label="Sort products"
                >
                  <option value="featured">Featured</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                  <option value="name">Name</option>
                </select>
              </div>
            </div>

            {/* Filtered empty state vs populated grid */}
            {filtered.length === 0 ? (
              <div className="my-8 rounded-[24px] border border-black/10 bg-white p-8 text-center shadow-xs md:p-12">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-red-50 text-[#BC0000]">
                  <FilterX className="h-6 w-6" />
                </div>
                <h3 className="mt-4 font-heading text-xl font-bold text-black/90">
                  No products match your selected filters
                </h3>
                <p className="mt-1 text-sm text-black/60">
                  Try clearing your filters to see all available gear in this collection.
                </p>
                <button
                  type="button"
                  onClick={() => {
                    setInStockOnly(false);
                    setSort("featured");
                  }}
                  className="mt-5 inline-flex items-center gap-2 rounded-full bg-[#BC0000] px-6 py-2.5 text-sm font-bold text-white shadow-xs transition hover:bg-[#920000] cursor-pointer"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="collection-grid">
                {filtered.map((p, i) => (
                  <ProductCard key={p.id} product={p} priority={i < 4} />
                ))}
              </div>
            )}
          </>
        )}
      </div>
    </section>
  );
}
