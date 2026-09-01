import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { productService } from "@/services/product.service";
import ProductDetail from "@/features/products/components/ProductDetail";
import ProductSection from "@/components/sections/ProductSection";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const product = await productService.getByHandle(handle);
  if (!product) return { title: "Product not found" };
  return {
    title: product.title,
    description: product.description,
    openGraph: {
      title: product.title,
      description: product.description,
      images: [product.image],
    },
  };
}

export default async function ProductPage({ params }: Props) {
  const { handle } = await params;
  const product = await productService.getByHandle(handle);
  if (!product) notFound();

  const related = await productService.getRelated(product, 5);

  return (
    <>
      <ProductDetail product={product} />
      {related.length > 0 && (
        <ProductSection title="You may also like" products={related} />
      )}
    </>
  );
}
