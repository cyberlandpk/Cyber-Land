import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Cyber Land Blog",
  description: "News, launches, setup guides, and creator stories from Cyber Land.",
  alternates: {
    canonical: "/blogs/tech-blog",
  },
};

const posts = [
  {
    slug: "anzu-v2-launch",
    title: "Anzu V2 is here — ultralight ergonomic wireless mouse",
    excerpt:
      "Meet Anzu V2: precision, comfort, and wireless freedom built for long sessions.",
    date: "2026",
  },
  {
    slug: "hive75-v2-guide",
    title: "Hive75 V2: why 75% is the sweet spot",
    excerpt:
      "Desk space without compromise — gasket mount feel, hot-swap, and black-purple style.",
    date: "2026",
  },
  {
    slug: "level-up-your-setup",
    title: "Level Up Your Setup — build your setup with Cyber Land",
    excerpt:
      "Keyboards, mice, chairs, monitors, and audio — curated for creators and gamers.",
    date: "2026",
  },
  {
    slug: "streaming-essentials",
    title: "Streamers essential kit checklist",
    excerpt:
      "Mic, webcam, and lighting picks for cleaner streams without the fluff.",
    date: "2025",
  },
];

export default function BlogIndexPage() {
  return (
    <section className="section section--padding">
      <div className="page-width max-w-3xl">
        <h1 className="section-title mb-2">Cyber Land Blog</h1>
        <p className="mb-10 text-sm text-black/50 md:text-base">
          News, launches, and setup guides.
        </p>
        <ul className="flex flex-col divide-y divide-black/8 border-y border-black/8">
          {posts.map((post) => (
            <li key={post.slug} className="py-6">
              <p className="mb-1 text-xs font-medium uppercase tracking-wide text-black/40">
                {post.date}
              </p>
              <h2 className="heading text-xl tracking-tight md:text-2xl">
                <Link
                  href={`/blogs/tech-blog/${post.slug}`}
                  className="hover:opacity-70"
                >
                  {post.title}
                </Link>
              </h2>
              <p className="mt-2 text-sm leading-relaxed text-black/60">
                {post.excerpt}
              </p>
              <Link
                href={`/blogs/tech-blog/${post.slug}`}
                className="mt-3 inline-block text-sm font-semibold text-[#BC0000] hover:text-[#920000]"
              >
                Read more →
              </Link>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
