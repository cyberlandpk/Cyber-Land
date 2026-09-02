import type { Metadata } from "next";
import { Suspense } from "react";
import { productService } from "@/services/product.service";
import ProductCard from "@/components/common/ProductCard";

type Props = {
  searchParams: Promise<{ q?: string }>;
};

export async function generateMetadata(): Promise<Metadata> {
  return {
    title: "Search",
    description:
      "Search Cyber Land products — laptops, gaming gear, hardware, and accessories.",
    alternates: {
      canonical: "/search",
    },
    robots: {
      index: false,
      follow: true,
    },
  };
}

async function Results({ q }: { q: string }) {
  // Searches the real shop data source (WooCommerce with catalog fallback).
  const results = q ? await productService.search(q) : [];

  return (
    <section className="section section--padding">
      <div className="page-width">
        <h1 className="section-title mb-2">
          {q ? `Search results for “${q}”` : "Search"}
        </h1>
        <p className="mb-8 text-sm text-black/50">
          {q
            ? `${results.length} result${results.length !== 1 ? "s" : ""}`
            : "Enter a query to search products."}
        </p>
        {results.length > 0 ? (
          <div className="collection-grid">
            {results.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        ) : q ? (
          <p className="py-16 text-center text-black/50">No products found.</p>
        ) : null}
      </div>
    </section>
  );
}

export default async function SearchPage({ searchParams }: Props) {
  const { q: rawQuery } = await searchParams;
  const q = (rawQuery ?? "").trim().slice(0, 100);

  return (
    <Suspense
      fallback={
        <div className="page-width py-20 text-center text-sm text-black/50">
          Loading…
        </div>
      }
    >
      <Results q={q} />
    </Suspense>
  );
}
