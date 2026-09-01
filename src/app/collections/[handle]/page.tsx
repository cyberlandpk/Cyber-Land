import type { Metadata } from "next";
import { productService } from "@/services/product.service";
import CollectionView from "@/features/collections/components/CollectionView";

export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 0;

type Props = { params: Promise<{ handle: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { handle } = await params;
  const meta = productService.getCollectionMeta(handle);
  return {
    title: meta.title,
    description: meta.description,
  };
}

export default async function CollectionPage({ params }: Props) {
  const { handle } = await params;
  const meta = productService.getCollectionMeta(handle);
  const items = await productService.getByCollection(handle);

  return (
    <CollectionView
      title={meta.title}
      description={meta.description}
      products={items}
      handle={handle}
    />
  );
}
