"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import type { Product } from "@/features/products";
import ProductCard from "@/components/common/ProductCard";
import { cn } from "@/utils";

type Props = {
  title: string;
  description?: string;
  products: Product[];
  handle: string;
};

type SortKey = "featured" | "price-asc" | "price-desc" | "name";

export default function CollectionView({
  title,
  description,
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

  return (
    <section className="section section--padding">
      <div className="page-width">
        <div className="mb-6 md:mb-8">
          <h1 className="section-title">{title}</h1>
          {description && (
            <p className="mt-2 max-w-2xl text-sm text-black/60 md:text-base">
              {description}
            </p>
          )}
        </div>

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
                className="h-4 w-4 rounded border-black/20"
              />
              In stock only
            </label>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className={cn(
                "rounded-full border border-black/15 bg-white px-4 py-2 text-sm font-medium outline-none"
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

        {filtered.length === 0 ? (
          <div className="my-8 rounded-[28px] border border-[#EAE3D6] bg-gradient-to-b from-[#FFFDF9] to-[#FAF6EE] p-8 text-center shadow-[0_8px_30px_rgba(0,0,0,0.04)] md:my-12 md:p-16">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#FFF1F1] text-2xl text-[#BC0000] shadow-inner md:h-20 md:w-20 md:text-3xl">
              🚀
            </div>
            <span className="mt-5 inline-block rounded-full bg-[#BC0000]/10 px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#BC0000]">
              In Stock Soon
            </span>
            <h2 className="mt-3 font-heading text-2xl font-bold tracking-tight text-[#171717] md:text-3xl">
              Coming Soon to {title}
            </h2>
            <p className="mx-auto mt-2.5 max-w-lg text-sm leading-relaxed text-black/60 md:text-base">
              We are currently sourcing and testing premium inventory for this category. New products will be listed shortly!
            </p>
            <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
              <a
                href={`https://wa.me/923458006009?text=Hi%20Cyber%20Land,%20I%20am%20inquiring%20about%20products%20in%20${encodeURIComponent(title)}`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#1EBE5D] hover:shadow-md hover:shadow-[#25D366]/20"
              >
                <span>💬</span>
                <span>Inquire on WhatsApp (+92 345 8006009)</span>
              </a>
              <Link
                href="/collections"
                className="inline-flex items-center gap-2 rounded-full border border-black/15 bg-white px-6 py-3 text-sm font-bold text-[#171717] transition-all hover:border-[#BC0000] hover:text-[#BC0000]"
              >
                <span>Browse All Categories</span>
              </Link>
            </div>
          </div>
        ) : (
          <div className="collection-grid">
            {filtered.map((p, i) => (
              <ProductCard key={p.id} product={p} priority={i < 4} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
