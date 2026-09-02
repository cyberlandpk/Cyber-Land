import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CmsPageView from "@/components/common/CmsPageView";
import { supportPages } from "@/constants/pages-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(supportPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = supportPages[slug];
  const firstPara = page?.blocks.find((b) => b.type === "p");
  return {
    title: page?.title ?? "Page",
    description:
      page?.subtitle ??
      (firstPara && firstPara.type === "p" ? firstPara.text : undefined),
    alternates: page ? { canonical: `/pages/${slug}` } : undefined,
  };
}

export default async function StaticPage({ params }: Props) {
  const { slug } = await params;
  const page = supportPages[slug];
  if (!page) notFound();
  return <CmsPageView page={page} />;
}
