import type { Metadata } from "next";
import Link from "next/link";
import { collectionMeta } from "@/features/products";
import { productService } from "@/services/product.service";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Collections",
  description: "Browse all Cyber Land collections — gaming, streaming, office, and more.",
  alternates: {
    canonical: "/collections",
  },
};

export default async function CollectionsIndexPage() {
  // Real counts from the merged shop catalog (WooCommerce + local).
  const counts = await productService.getCollectionCounts();

  const collections = Object.entries(collectionMeta)
    .filter(([handle]) => handle !== "all")
    .map(([handle, meta]) => ({
      handle,
      ...meta,
      count: counts[handle] ?? 0,
    }))
    .sort((a, b) => a.title.localeCompare(b.title));

  return (
    <section className="section section--padding">
      <div className="page-width">
        <h1 className="section-title mb-2">Collections</h1>
        <p className="mb-8 text-sm text-black/50 md:text-base">
          {collections.length} collections
        </p>
        <div className="grid grid-cols-1 gap-3 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {collections.map((c) => (
            <Link
              key={c.handle}
              href={`/collections/${c.handle}`}
              className="group rounded-[var(--rounded-card)] border border-[#E2E6E9] bg-white p-5 transition-all hover:-translate-y-0.5 hover:border-[#BC0000]/30 hover:shadow-md"
            >
              <h2 className="heading text-lg font-medium tracking-tight group-hover:opacity-70 md:text-xl">
                {c.title}
              </h2>
              {c.description && (
                <p className="mt-2 line-clamp-2 text-sm text-black/55">
                  {c.description}
                </p>
              )}
              {c.count === 0 ? (
                <div className="mt-3 inline-flex items-center gap-1.5 rounded-full border border-red-200 bg-[#FFF1F1] px-2.5 py-0.5 text-xs font-bold text-[#BC0000]">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-[#BC0000]" />
                  </span>
                  <span>Coming Soon</span>
                </div>
              ) : (
                <p className="mt-3 text-xs font-semibold text-[#BC0000]">
                  {c.count} product{c.count !== 1 ? "s" : ""}
                </p>
              )}
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
