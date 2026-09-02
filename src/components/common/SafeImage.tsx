"use client";

import { useEffect, useState } from "react";
import Image, { type ImageProps } from "next/image";
import { cn } from "@/utils";

const FALLBACK_SRC = "/images/product-fallback.svg";

type SafeImageProps = Omit<ImageProps, "onError" | "src"> & {
  src: string;
  fallbackSrc?: string;
};

/**
 * next/image wrapper with automatic fallback when remote/local src fails.
 * Reacts to `src` prop changes: a new src resets the failure state.
 */
export default function SafeImage({
  src,
  fallbackSrc = FALLBACK_SRC,
  alt,
  className,
  ...props
}: SafeImageProps) {
  const [failed, setFailed] = useState(false);

  // If the caller passes a different image, drop the stale failure state.
  useEffect(() => {
    setFailed(false);
  }, [src]);

  const currentSrc = failed ? fallbackSrc : src || fallbackSrc;

  const isRemote =
    typeof currentSrc === "string" &&
    (currentSrc.startsWith("http://") || currentSrc.startsWith("https://"));

  return (
    <Image
      {...props}
      src={currentSrc}
      alt={alt}
      className={cn(className)}
      // Shopify CDN + remote assets load more reliably without optimizer
      unoptimized={isRemote || props.unoptimized}
      onError={() => {
        if (!failed) {
          setFailed(true);
        }
      }}
    />
  );
}
