"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { useProductSearch } from "@/features/products/hooks/useProducts";
import type { Product } from "@/types";
import { useUI } from "@/hooks/useUI";
import { formatPrice, calcDiscount } from "@/utils";

const EASE_DRAWER: [number, number, number, number] = [0.7, 0, 0.2, 1];

export default function SearchDrawer() {
  const { searchOpen, closeSearch } = useUI();
  const [query, setQuery] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const inputRef = useRef<HTMLInputElement>(null);

  // Debounce the query so we hit the search service at most twice a second.
  useEffect(() => {
    const t = window.setTimeout(() => {
      setDebouncedQuery(query.trim());
    }, 300);
    return () => window.clearTimeout(t);
  }, [query]);

  // Searches the real shop data source (WooCommerce with catalog fallback).
  const { data, isFetching } = useProductSearch(debouncedQuery);
  const results: Product[] = data ?? [];

  useEffect(() => {
    if (searchOpen) {
      setTimeout(() => inputRef.current?.focus(), 120);
    } else {
      setQuery("");
      setDebouncedQuery("");
    }
  }, [searchOpen]);

  useEffect(() => {
    if (!searchOpen) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = prev;
    };
  }, [searchOpen]);

  return (
    <AnimatePresence>
      {searchOpen && (
        <>
          <motion.div
            className="drawer-overlay drawer-overlay--end"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.8, ease: EASE_DRAWER }}
            onClick={closeSearch}
          />
          <motion.aside
            className="search-drawer drawer-panel drawer-panel--end"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ duration: 0.6, ease: EASE_DRAWER }}
            role="dialog"
            aria-modal="true"
            aria-label="Search"
          >
            <div className="search-drawer__header">
              <h2 className="search-drawer__title heading">Search</h2>
              <button
                type="button"
                className="menu-drawer__close"
                onClick={closeSearch}
                aria-label="Close search"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 20 20"
                  stroke="currentColor"
                  fill="none"
                  aria-hidden
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M5 15L15 5M5 5L15 15"
                  />
                </svg>
              </button>
            </div>

            <div className="search-drawer__body">
              <div className="search-field">
                <input
                  ref={inputRef}
                  type="search"
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  placeholder="Search for ..."
                  className="search-field__input"
                  aria-label="Search"
                  autoComplete="off"
                  autoCorrect="off"
                  autoCapitalize="off"
                  spellCheck={false}
                />
                {query ? (
                  <button
                    type="button"
                    className="search-field__clear"
                    onClick={() => setQuery("")}
                  >
                    Clear
                  </button>
                ) : null}
              </div>

              {query ? (
                <div className="search-results">
                  {isFetching && results.length === 0 ? (
                    <p className="search-results__hint" aria-live="polite">
                      Searching…
                    </p>
                  ) : results.length === 0 ? (
                    <p className="search-results__empty">
                      No products found for &ldquo;{query}&rdquo;
                    </p>
                  ) : (
                    <ul className="search-results__list">
                      {results.map((p) => {
                        const discount = calcDiscount(p.price, p.compareAtPrice);
                        return (
                          <li key={p.id}>
                            <Link
                              href={`/products/${p.handle}`}
                              className="search-results__item"
                              onClick={closeSearch}
                            >
                              <div className="search-results__thumb">
                                <Image
                                  src={p.image}
                                  alt={p.title}
                                  fill
                                  className="object-cover"
                                  sizes="72px"
                                  unoptimized
                                />
                              </div>
                              <div className="search-results__meta">
                                <p className="search-results__name">{p.title}</p>
                                <div className="search-results__price">
                                  <span>{formatPrice(p.price)}</span>
                                  {p.compareAtPrice > p.price && (
                                    <span className="search-results__compare">
                                      {formatPrice(p.compareAtPrice)}
                                    </span>
                                  )}
                                  {discount > 0 && (
                                    <span className="search-results__off">
                                      {discount}% OFF
                                    </span>
                                  )}
                                </div>
                              </div>
                            </Link>
                          </li>
                        );
                      })}
                    </ul>
                  )}
                  {results.length > 0 && (
                    <div className="search-results__all">
                      <Link
                        href={`/search?q=${encodeURIComponent(query)}`}
                        onClick={closeSearch}
                      >
                        View all results
                      </Link>
                    </div>
                  )}
                </div>
              ) : (
                <p className="search-results__hint">
                  Start typing to search products
                </p>
              )}
            </div>
          </motion.aside>
        </>
      )}
    </AnimatePresence>
  );
}
