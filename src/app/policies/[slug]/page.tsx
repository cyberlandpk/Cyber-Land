import type { Metadata } from "next";
import { notFound } from "next/navigation";
import CmsPageView from "@/components/common/CmsPageView";
import { policyPages } from "@/constants/pages-content";

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(policyPages).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const page = policyPages[slug];
  return {
    title: page?.title ?? "Policy",
    alternates: page ? { canonical: `/policies/${slug}` } : undefined,
  };
}

export default async function PolicyPage({ params }: Props) {
  const { slug } = await params;
  const page = policyPages[slug];
  if (!page) notFound();
  return <CmsPageView page={page} />;
}
