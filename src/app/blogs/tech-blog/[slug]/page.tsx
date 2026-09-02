import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

const posts: Record<
  string,
  { title: string; body: string[]; date: string }
> = {
  "anzu-v2-launch": {
    title: "Anzu V2 is here — ultralight ergonomic wireless mouse",
    date: "2026",
    body: [
      "Anzu V2 brings ultralight ergonomic design to wireless gaming. Built for long sessions, it balances comfort with competitive tracking.",
      "Available in black and white — shop the launch and pair it with Swarm or Hive keyboards for a complete desk.",
    ],
  },
  "hive75-v2-guide": {
    title: "Hive75 V2: why 75% is the sweet spot",
    date: "2026",
    body: [
      "The 75% layout keeps arrows and essential keys without the bulk of full-size boards. Hive75 V2 adds gasket-mount feel and hot-swappable switches.",
      "The Black Purple finish coordinates across matching mice and accessories.",
    ],
  },
  "level-up-your-setup": {
    title: "Level Up Your Setup — build your setup with Cyber Land",
    date: "2026",
    body: [
      "From mechanical keyboards to ergo chairs and 2K monitors, Cyber Land designs gear for creators and gamers who refuse to settle.",
      "Explore collections by setup — gaming, streaming, or work-from-home — and build a desk that keeps up.",
    ],
  },
  "streaming-essentials": {
    title: "Streamers essential kit checklist",
    date: "2025",
    body: [
      "A clean stream starts with audio and video: Sonik or Kast mics, Owl webcams, and reliable lighting.",
      "Add a quiet mechanical keyboard and ultralight mouse so gameplay stays smooth on camera.",
    ],
  },
};

type Props = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(posts).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = posts[slug];
  return {
    title: post?.title ?? "Blog",
    description: post ? post.body[0] : undefined,
    alternates: post ? { canonical: `/blogs/tech-blog/${slug}` } : undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { slug } = await params;
  const post = posts[slug];
  if (!post) notFound();

  return (
    <article className="section section--padding">
      <div className="page-width max-w-2xl">
        <Link
          href="/blogs/tech-blog"
          className="mb-6 inline-block text-sm font-medium text-black/50 hover:text-black"
        >
          ← Cyber Land Blog
        </Link>
        <p className="mb-2 text-xs font-medium uppercase tracking-wide text-black/40">
          {post.date}
        </p>
        <h1 className="section-title mb-6">{post.title}</h1>
        <div className="flex flex-col gap-4 text-base leading-relaxed text-black/75">
          {post.body.map((p) => (
            <p key={p.slice(0, 24)}>{p}</p>
          ))}
        </div>
        <div className="mt-10 flex flex-wrap gap-3">
          <Link href="/collections/shop-all" className="btn btn-primary btn-sm">
            Shop all
          </Link>
          <Link href="/collections/new-launches" className="btn btn-secondary btn-sm">
            New launches
          </Link>
        </div>
      </div>
    </article>
  );
}
