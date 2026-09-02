"use client";

import { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { cn } from "@/utils";

/**
 * Homepage hero slideshow.
 *
 * Live order:
 * 1) Anzu V2   — banner3.png / banner3mob.png
 * 2) Obsidian  — Frame_1000007627.png / qpricedark1.1.png
 * 3) Arma      — Frame_1000007021.png / desktop_banner_26.png
 */
const SLIDES = [
  {
    id: 1,
    href: "/collections/gaming-mouse-and-mousepad",
    alt: "Anzu V2 New Launch",
    desktop: "/hero/1-anzu-crimson.png",
    mobile: "/hero/1-anzu-m-crimson.png",
    desktopAlt: "/hero/anzu-desktop.png",
    mobileAlt: "/hero/anzu-mobile.png",
    desktopCdn:
      "https://cdn.shopify.com/s/files/1/0619/4325/1121/files/banner3.png?v=1780407525&width=2400",
    mobileCdn:
      "https://cdn.shopify.com/s/files/1/0619/4325/1121/files/banner3mob.png?v=1780407526&width=1000",
  },
  {
    id: 2,
    href: "/collections/monitors",
    alt: "Obsidian 27 Gaming Monitor",
    desktop: "/hero/2-obsidian-crimson.png",
    mobile: "/hero/2-obsidian-m-crimson.png",
    desktopAlt: "/hero/monitors-desktop.png",
    mobileAlt: "/hero/monitors-mobile.png",
    desktopCdn:
      "https://cdn.shopify.com/s/files/1/0619/4325/1121/files/Frame_1000007627.png?v=1775107034&width=2400",
    mobileCdn:
      "https://cdn.shopify.com/s/files/1/0619/4325/1121/files/qpricedark1.1.png?v=1775107035&width=1000",
  },
  {
    id: 3,
    href: "/collections/gaming-mouse-and-mousepad",
    alt: "Ultralight Gaming Mice",
    desktop: "/hero/3-arma-crimson.png",
    mobile: "/hero/3-arma-m-crimson.png",
    desktopAlt: "/hero/arma-desktop.png",
    mobileAlt: "/hero/arma-mobile.png",
    desktopCdn:
      "https://cdn.shopify.com/s/files/1/0619/4325/1121/files/Frame_1000007021.png?v=1774432814&width=2400",
    mobileCdn:
      "https://cdn.shopify.com/s/files/1/0619/4325/1121/files/desktop_banner_26.png?v=1774432814&width=1000",
  },
] as const;

type SrcMode = "primary" | "alt" | "cdn";

export default function HeroSlider() {
  const [index, setIndex] = useState(0);
  const [srcMode, setSrcMode] = useState<SrcMode>("primary");

  const next = useCallback(() => {
    setIndex((i) => (i + 1) % SLIDES.length);
  }, []);

  const prev = useCallback(() => {
    setIndex((i) => (i - 1 + SLIDES.length) % SLIDES.length);
  }, []);

  useEffect(() => {
    const t = window.setInterval(next, 5000);
    return () => window.clearInterval(t);
  }, [next]);

  const slide = SLIDES[index];

  const desktopSrc =
    srcMode === "cdn"
      ? slide.desktopCdn
      : srcMode === "alt"
        ? slide.desktopAlt
        : slide.desktop;

  const mobileSrc =
    srcMode === "cdn"
      ? slide.mobileCdn
      : srcMode === "alt"
        ? slide.mobileAlt
        : slide.mobile;

  const onImgError = () => {
    setSrcMode((m) => (m === "primary" ? "alt" : m === "alt" ? "cdn" : "cdn"));
  };

  return (
    <section className="hero-section w-full bg-white" aria-label="Hero">
      <div className="page-width">
        <div className="hero-frame relative w-full overflow-hidden rounded-[20px] bg-[#0a0a0a] md:rounded-[28px]">
          <Link
            href={slide.href}
            className="relative block w-full leading-[0]"
            aria-label={slide.alt}
          >
            {/* Desktop banner — full art, no crop */}
            <img
              key={`d-${slide.id}-${srcMode}`}
              src={desktopSrc}
              alt={slide.alt}
              width={2400}
              height={639}
              className="hero-img hero-img--desktop"
              decoding="async"
              fetchPriority={index === 0 ? "high" : "auto"}
              onError={onImgError}
            />
            {/* Mobile portrait banner */}
            <img
              key={`m-${slide.id}-${srcMode}`}
              src={mobileSrc}
              alt={slide.alt}
              width={900}
              height={1200}
              className="hero-img hero-img--mobile"
              decoding="async"
              fetchPriority={index === 0 ? "high" : "auto"}
              onError={onImgError}
            />
          </Link>

          <button
            type="button"
            onClick={prev}
            className="hero-nav hero-nav--prev"
            aria-label="Previous slide"
          >
            <ChevronLeft className="h-7 w-7 md:h-8 md:w-8" strokeWidth={1.5} />
          </button>
          <button
            type="button"
            onClick={next}
            className="hero-nav hero-nav--next"
            aria-label="Next slide"
          >
            <ChevronRight className="h-7 w-7 md:h-8 md:w-8" strokeWidth={1.5} />
          </button>

          <div className="hero-dots">
            {SLIDES.map((s, i) => (
              <button
                key={s.id}
                type="button"
                onClick={() => setIndex(i)}
                className={cn("hero-dot", i === index && "hero-dot--on")}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
