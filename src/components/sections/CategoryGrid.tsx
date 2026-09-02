"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import SafeImage from "@/components/common/SafeImage";
import { DEPARTMENT_GROUPS } from "@/constants/categories-data";

export default function CategoryGrid() {
  const featuredCategories = DEPARTMENT_GROUPS.slice(0, 8);

  return (
    <section className="w-full bg-white pb-14 pt-10 md:pb-20 md:pt-14">
      <div className="page-width">
        <div className="mb-6 flex flex-col justify-between gap-3 sm:flex-row sm:items-end md:mb-8">
          <div>
            <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#FFF1F1] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#BC0000]">
              <span>🏷️</span>
              <span>Shop By Department</span>
            </span>
            <h2 className="section-title">
              Level Up Your{" "}
              <em className="relative inline-block not-italic">
                <span className="italic">Setup</span>
                <svg
                  className="pointer-events-none absolute -bottom-1 left-0 w-[108%] text-[#BC0000]"
                  viewBox="0 0 140 14"
                  fill="none"
                  aria-hidden
                  preserveAspectRatio="none"
                  style={{ height: 11 }}
                >
                  <path
                    d="M2 9C20 3 45 2 70 5.5C95 9 115 11 138 4"
                    stroke="currentColor"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                  />
                </svg>
              </em>
            </h2>
          </div>
          <Link
            href="/collections"
            className="group inline-flex items-center gap-1.5 text-sm font-semibold text-[#BC0000] hover:text-[#920000]"
          >
            <span>Explore All 99 Categories</span>
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-1"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M3 10a.75.75 0 01.75-.75h10.638L10.23 5.29a.75.75 0 111.04-1.08l5.5 5.25a.75.75 0 010 1.08l-5.5 5.25a.75.75 0 11-1.04-1.08l4.158-3.96H3.75A.75.75 0 013 10z"
                clipRule="evenodd"
              />
            </svg>
          </Link>
        </div>

        <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:gap-4 lg:grid-cols-4">
          {featuredCategories.map((cat, i) => (
            <motion.div
              key={cat.slug}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-40px" }}
              transition={{ duration: 0.35, delay: i * 0.04 }}
            >
              <Link
                href={`/collections/${cat.slug}`}
                className="group relative block overflow-hidden rounded-[22px] transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                style={{ aspectRatio: "4 / 3" }}
              >
                <SafeImage
                  src={cat.image}
                  alt={cat.name}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-[1.08]"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <div className="flex items-center gap-1.5 text-xs font-semibold text-white/75">
                    <span>{cat.icon}</span>
                    <span>{cat.subcategories.length} Categories</span>
                  </div>
                  <h3 className="mt-0.5 text-base font-extrabold leading-tight text-white transition-colors group-hover:text-[#FFC5C5]">
                    {cat.name}
                  </h3>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
