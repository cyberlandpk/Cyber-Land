"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Star } from "lucide-react";
import { getProductByHandle } from "@/features/products/data/catalog";
import { calcDiscount, cn, formatPrice } from "@/utils";
import type { Product } from "@/types";

/**
 * Shop the Look — two-column scene + product panel
 * Desktop: scene image LEFT with Crimson Ambient Glow + product card RIGHT
 * Hotspots:
 *  28%/80% chair · 75%/50% mouse · 71%/29% monitor · 50%/45% keyboard
 */

const SCENE = "/shop-the-look/scene.png";
const SCENE_CDN =
  "https://cdn.shopify.com/s/files/1/0619/4325/1121/files/Shopthelook2_8012997e-10aa-4148-97f2-fce2fce01b74.png?v=1771593801&width=1920";

const HOTSPOTS = [
  {
    handle: "anzu-v2-black-ultralight-ergonomic-wireless-gaming-mouse",
    fallbackHandle: "anzu-v2-white-ultralight-ergonomic-wireless-gaming-mouse",
    x: "75%",
    y: "50%",
    label: "Anzu V2 Crimson Mouse",
  },
  {
    handle: "obsidian-27-inch-gaming-monitor",
    fallbackHandle: "obsidian-27-inch-gaming-monitor",
    x: "71%",
    y: "29%",
    label: "Obsidian 27\" Gaming Monitor",
  },
  {
    handle: "hive75-v2-black-purple-wired-mechanical-gaming-keyboard",
    fallbackHandle: "swarm-white-purple-wireless-gaming-keyboard",
    x: "50%",
    y: "45%",
    label: "Hive75 Mechanical Keyboard",
  },
  {
    handle: "altus-ergo-gaming-chair",
    fallbackHandle: "altus-ergo-gaming-chair",
    x: "28%",
    y: "80%",
    label: "Altus Gaming Chair",
  },
] as const;

function LookProductPanel({ product }: { product: Product }) {
  const discount = calcDiscount(product.price, product.compareAtPrice);

  return (
    <article className="stl-panel-card mx-auto w-full max-w-[360px] overflow-hidden rounded-3xl border border-neutral-200/90 bg-white p-4 shadow-lg shadow-neutral-900/5 transition-all">
      <div className="relative aspect-square overflow-hidden rounded-2xl bg-gradient-to-br from-[#FFF5F5] via-[#FFF1F1] to-[#FFEBEB]">
        {discount > 0 && (
          <span className="absolute left-3 top-3 z-[2] rounded-full bg-[#BC0000] px-3 py-1 text-[11px] font-extrabold uppercase tracking-wide text-white shadow-sm shadow-[#BC0000]/30">
            Save {discount}%
          </span>
        )}
        {product.rating != null && (
          <span className="absolute bottom-3 right-3 z-[2] flex items-center gap-1 rounded-full bg-white/95 px-2.5 py-0.5 text-xs font-bold text-neutral-800 shadow-sm backdrop-blur-sm">
            <Star className="h-3.5 w-3.5 fill-[#f59e0b] text-[#f59e0b]" />
            {product.rating.toFixed(1)}
          </span>
        )}
        <Image
          src={product.image}
          alt={product.title}
          fill
          className="object-contain p-5 transition-transform duration-300 hover:scale-105"
          sizes="360px"
          unoptimized
        />
      </div>

      <div className="mt-4 space-y-2.5 px-1">
        <span className="inline-block text-[11px] font-extrabold uppercase tracking-wider text-[#BC0000]">
          Verified BattleStation Gear
        </span>
        <Link href={`/products/${product.handle}`}>
          <h3 className="line-clamp-2 text-base font-bold leading-snug text-neutral-900 transition-colors hover:text-[#BC0000]">
            {product.title}
          </h3>
        </Link>
        <div className="flex flex-wrap items-baseline gap-2 pt-1 text-sm">
          <span className="text-lg font-extrabold text-neutral-950">
            {formatPrice(product.price)}
          </span>
          {product.compareAtPrice > product.price && (
            <span className="text-xs font-medium text-neutral-400 line-through">
              MRP {formatPrice(product.compareAtPrice)}
            </span>
          )}
        </div>
        <Link
          href={`/products/${product.handle}`}
          className="mt-3 flex w-full items-center justify-center rounded-2xl bg-neutral-950 px-4 py-3 text-sm font-bold text-white shadow-sm transition-all hover:bg-[#BC0000] hover:shadow-md hover:shadow-[#BC0000]/20"
        >
          {product.hasVariants ? "Choose Options" : "Add to Cart"}
        </Link>
      </div>
    </article>
  );
}

export default function ShopTheLook() {
  const [activeIndex, setActiveIndex] = useState(0);
  const [sceneSrc, setSceneSrc] = useState(SCENE);

  const products = useMemo(
    () =>
      HOTSPOTS.map((h) => {
        const primary = getProductByHandle(h.handle);
        if (primary) return primary;
        return getProductByHandle(h.fallbackHandle);
      }).filter((p): p is Product => Boolean(p)),
    []
  );

  const activeProduct = products[activeIndex] ?? products[0];

  if (!products.length || !activeProduct) return null;

  const selectByHandle = (handle: string, fallbackHandle: string) => {
    const idx = HOTSPOTS.findIndex(
      (h) => h.handle === handle || h.fallbackHandle === fallbackHandle
    );
    if (idx >= 0) setActiveIndex(idx);
  };

  return (
    <section className="w-full bg-white py-12 md:py-16">
      <div className="page-width">
        <div className="grid items-center gap-8 lg:grid-cols-12 lg:gap-12">
          {/* LEFT — Scene with Crimson Ambient Lighting Overlay + Hotspots */}
          <div className="relative w-full overflow-hidden rounded-[24px] bg-neutral-950 shadow-xl md:rounded-[32px] lg:col-span-7">
            <div className="relative w-full pb-[92%]">
              {/* Scene image */}
              <Image
                src={sceneSrc}
                alt="Shop the Look gaming setup"
                fill
                className="object-cover object-center"
                sizes="(max-width: 1024px) 100vw, 60vw"
                unoptimized
                onError={() => setSceneSrc(SCENE_CDN)}
              />

              {/* Crimson Red Ambient Overlay Effect */}
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-tr from-[#BC0000]/30 via-transparent to-black/25 mix-blend-color-burn" />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />

              {/* Hotspots */}
              {HOTSPOTS.map((hs, i) => {
                const isActive = activeIndex === i;
                return (
                  <button
                    key={hs.handle}
                    type="button"
                    className={cn(
                      "stl-hotspot absolute z-[5]",
                      isActive && "stl-hotspot--active"
                    )}
                    style={{
                      left: hs.x,
                      top: hs.y,
                      transform: "translate(-50%, -50%)",
                    }}
                    onClick={() => selectByHandle(hs.handle, hs.fallbackHandle)}
                    onMouseEnter={() => {
                      if (
                        typeof window !== "undefined" &&
                        window.matchMedia("(min-width: 1024px)").matches
                      ) {
                        selectByHandle(hs.handle, hs.fallbackHandle);
                      }
                    }}
                    aria-label={hs.label}
                    aria-current={isActive}
                  >
                    <span className="stl-hotspot__dot" />
                  </button>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Title + Interactive Product Card */}
          <div className="flex flex-col items-center lg:col-span-5 lg:items-start">
            <div className="mb-4 text-center lg:text-left">
              <span className="mb-2 inline-flex items-center gap-1.5 rounded-full bg-[#FFF1F1] px-3.5 py-1 text-xs font-bold uppercase tracking-wider text-[#BC0000]">
                <span>🔥</span>
                <span>Interactive Desk Setup</span>
              </span>
              <h2 className="text-2xl font-extrabold tracking-tight text-neutral-900 sm:text-3xl md:text-4xl">
                Shop the Look
              </h2>
              <p className="mt-1 text-xs text-neutral-500 sm:text-sm">
                Click any glowing hotspot on the battle station to view and customize that gear.
              </p>
            </div>

            {activeProduct && <LookProductPanel product={activeProduct} />}

            {/* Selector dots under card */}
            <div className="mt-5 flex items-center justify-center gap-2.5 lg:w-full lg:max-w-[360px]">
              {products.map((p, i) => (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => setActiveIndex(i)}
                  className={cn(
                    "h-2.5 w-2.5 rounded-full transition-all duration-200",
                    i === activeIndex
                      ? "w-7 bg-[#BC0000]"
                      : "bg-neutral-300 hover:bg-neutral-400"
                  )}
                  aria-label={`Show ${p.title}`}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
