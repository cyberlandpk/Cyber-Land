import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productService } from "@/services/product.service";
import ProductDetail from "@/features/products/components/ProductDetail";
import ProductSection from "@/components/sections/ProductSection";
import { stripHtml } from "@/utils/html";
import { siteConfig } from "@/config/site";
import type { Product } from "@/types";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await productService.getByHandle(handle);
  if (!product) return { title: "Product not found" };
  const cleanDescription = stripHtml(product.description || "");
  return {
    title: product.title,
    description: cleanDescription,
    alternates: {
      canonical: `/products/${product.handle}`,
    },
    openGraph: {
      title: product.title,
      description: cleanDescription,
      url: `${siteConfig.url}/products/${product.handle}`,
      images: [product.image],
    },
  };
}

/** Truthful Product JSON-LD — no fabricated ratings/reviews. */
function productJsonLd(product: Product) {
  const cleanDescription = stripHtml(product.description || "");
  const priceValid =
    typeof product.price === "number" && Number.isFinite(product.price);
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: product.title,
    description: cleanDescription || undefined,
    image: product.image,
    ...(product.rating != null && product.reviewCount
      ? {
          aggregateRating: {
            "@type": "AggregateRating",
            ratingValue: product.rating,
            reviewCount: product.reviewCount,
          },
        }
      : {}),
    ...(priceValid
      ? {
          offers: {
            "@type": "Offer",
            priceCurrency: siteConfig.currency,
            price: product.price,
            availability: product.available
              ? "https://schema.org/InStock"
              : "https://schema.org/OutOfStock",
            url: `${siteConfig.url}/products/${product.handle}`,
          },
        }
      : {}),
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await productService.getByHandle(handle);
  if (!product) notFound();

  const related = await productService.getRelated(product, 5);

  return (
    <>
      <script
        type="application/ld+json"
        // Content is JSON.stringify output of plain data — no user-controlled markup.
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd(product)).replace(/</g, "\\u003c"),
        }}
      />
      <ProductDetail product={product} />
      {related.length > 0 && (
        <ProductSection title="You may also like" products={related} />
      )}
    </>
  );
}
