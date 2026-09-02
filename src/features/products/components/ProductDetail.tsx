"use client";

import { useMemo, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Star, Truck, RotateCcw, Shield } from "lucide-react";
import type { Product } from "@/types";
import { useCart } from "@/hooks/useCart";
import { calcDiscount, cn, formatPrice } from "@/utils";
import RichText from "@/components/common/RichText";

type Props = { product: Product };

export default function ProductDetail({ product }: Props) {
  const router = useRouter();
  const { addItem } = useCart();
  const [qty, setQty] = useState(1);
  const [activeImage, setActiveImage] = useState(0);
  const [variant, setVariant] = useState<string | undefined>(
    product.hasVariants ? "Default" : undefined
  );

  const images = useMemo(() => {
    const list = product.images?.length
      ? product.images
      : ([product.image, product.hoverImage].filter(Boolean) as string[]);
    return list.length ? list : [product.image];
  }, [product]);

  // Keep the selected index valid if the image list shrinks.
  const activeImageSafe = Math.min(activeImage, images.length - 1);

  const discount = calcDiscount(product.price, product.compareAtPrice);

  const handleAdd = () => {
    if (!product.available) return;
    addItem(product, qty, variant);
  };

  const handleBuyNow = () => {
    if (!product.available) return;
    addItem(product, qty, variant);
    router.push("/checkout");
  };

  return (
    <section
      className={cn(
        "section section--padding",
        // Reserve space for the fixed mobile sticky ATC bar so it never
        // covers the last content on small screens.
        product.available && "has-sticky-atc"
      )}
    >
      <div className="page-width">
        {/* Breadcrumb */}
        <nav className="mb-4 text-xs text-black/50 md:mb-6 md:text-sm" aria-label="Breadcrumb">
          <ol className="flex flex-wrap items-center gap-1">
            <li>
              <Link href="/" className="hover:text-black">
                Home
              </Link>
            </li>
            <li>/</li>
            {product.collection[0] && (
              <>
                <li>
                  <Link
                    href={`/collections/${product.collection[0]}`}
                    className="hover:text-black capitalize"
                  >
                    {product.collection[0].replace(/-/g, " ")}
                  </Link>
                </li>
                <li>/</li>
              </>
            )}
            <li className="line-clamp-1 text-black/80">{product.title}</li>
          </ol>
        </nav>

        <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
          {/* Gallery */}
          <div className="flex flex-col gap-3">
            <div className="product-gallery-main relative">
              {!product.available ? (
                <span className="badge-oos">Out of stock</span>
              ) : discount > 0 ? (
                <span className="badge-save">Save {discount}%</span>
              ) : null}
              <Image
                src={images[activeImageSafe]}
                alt={product.title}
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 50vw"
                priority
                unoptimized
              />
            </div>
            {images.length > 1 && (
              <div className="grid grid-cols-4 gap-2 sm:grid-cols-5">
                {images.map((img, i) => (
                  <button
                    key={`${img}-${i}`}
                    type="button"
                    className={cn("product-thumb relative", i === activeImageSafe && "active")}
                    onClick={() => setActiveImage(i)}
                  >
                    <Image
                      src={img}
                      alt=""
                      fill
                      className="object-cover"
                      sizes="80px"
                      unoptimized
                    />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Info */}
          <div className="flex flex-col">
            <h1 className="heading text-2xl leading-tight tracking-tight md:text-3xl lg:text-4xl">
              {product.title}
            </h1>

            {product.rating != null && (
              <div className="mt-3 flex items-center gap-2">
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star
                      key={i}
                      className={cn(
                        "h-4 w-4",
                        i < Math.round(product.rating!)
                          ? "fill-[#f59e0b] text-[#f59e0b]"
                          : "text-black/15"
                      )}
                    />
                  ))}
                </div>
                <span className="text-sm font-medium">
                  {product.rating.toFixed(1)}
                  {product.reviewCount != null && (
                    <span className="ml-1 text-black/50">
                      ({product.reviewCount} reviews)
                    </span>
                  )}
                </span>
              </div>
            )}

            <div className="mt-4 flex flex-wrap items-baseline gap-3">
              <span className="text-2xl font-semibold tracking-tight">
                {formatPrice(product.price)}
              </span>
              {product.compareAtPrice > product.price && (
                <>
                  <span className="text-lg text-black/40 line-through">
                    MRP {formatPrice(product.compareAtPrice)}
                  </span>
                  <span className="badge-sale">{discount}% OFF</span>
                </>
              )}
            </div>
            <p className="mt-1 text-xs text-black/50">
              Inclusive of all taxes. Free shipping on orders above Rs. 1,000.
            </p>

            {product.description && (
              <div className="mt-5 space-y-2 text-sm leading-relaxed text-black/75 md:text-base">
                <RichText html={product.description} />
              </div>
            )}

            {product.hasVariants && (
              <div className="mt-6">
                <p className="mb-2 text-sm font-medium">Options</p>
                <div className="flex flex-wrap gap-2">
                  {["Default", "Variant B"].map((v) => (
                    <button
                      key={v}
                      type="button"
                      className={cn(
                        "rounded-full border-2 px-4 py-2 text-sm font-medium transition-colors",
                        variant === v
                          ? "border-[#BC0000] bg-[#BC0000] text-white"
                          : "border-black/15 hover:border-black/40"
                      )}
                      onClick={() => setVariant(v)}
                    >
                      {v}
                    </button>
                  ))}
                </div>
              </div>
            )}

            {product.available && (
              <div className="mt-6 flex items-center gap-3">
                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => setQty((q) => Math.max(1, q - 1))}
                  >
                    −
                  </button>
                  <span className="min-w-[2rem] text-center text-sm font-medium">
                    {qty}
                  </span>
                  <button
                    type="button"
                    className="qty-btn"
                    onClick={() => setQty((q) => q + 1)}
                  >
                    +
                  </button>
                </div>
              </div>
            )}

            <div className="mt-6 flex flex-col gap-3 sm:flex-row">
              {product.available ? (
                <>
                  <button
                    type="button"
                    className="btn btn-primary flex-1"
                    onClick={handleAdd}
                  >
                    Add to cart
                  </button>
                  <button 
                    type="button" 
                    className="btn btn-secondary flex-1"
                    onClick={handleBuyNow}
                  >
                    Buy it now
                  </button>
                </>
              ) : (
                <a
                  href={`https://wa.me/923458006009?text=${encodeURIComponent(
                    `Hi Cyber Land, is "${product.title}" back in stock?`
                  )}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn-secondary flex-1"
                >
                  Ask about availability
                </a>
              )}
            </div>

            <ul className="mt-8 grid gap-3 border-t border-black/5 pt-6 text-sm">
              <li className="flex items-center gap-3">
                <Truck className="h-5 w-5 shrink-0 opacity-70" strokeWidth={1.5} />
                Free shipping on orders above Rs. 1,000
              </li>
              <li className="flex items-center gap-3">
                <RotateCcw className="h-5 w-5 shrink-0 opacity-70" strokeWidth={1.5} />
                7 Days Return and Replacement*
              </li>
              <li className="flex items-center gap-3">
                <Shield className="h-5 w-5 shrink-0 opacity-70" strokeWidth={1.5} />
                Manufacturer warranty included
              </li>
            </ul>
          </div>
        </div>
      </div>

      {/* Mobile sticky ATC */}
      {product.available && (
        <div className="sticky-atc">
          <div className="min-w-0 flex-1">
            <p className="truncate text-sm font-medium">{product.title}</p>
            <p className="text-sm font-semibold">{formatPrice(product.price)}</p>
          </div>
          <button type="button" className="btn btn-primary btn-sm" onClick={handleAdd}>
            Add to cart
          </button>
        </div>
      )}
    </section>
  );
}
