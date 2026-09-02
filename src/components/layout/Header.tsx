"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import Link from "next/link";
import BrandLogo from "@/components/common/BrandLogo";
import { mainNav, type NavItem } from "@/constants/navigation";
import { useCart } from "@/hooks/useCart";
import { useUI } from "@/hooks/useUI";
import { cn } from "@/utils";

/* —— Exact icon paths from live Concept theme —— */

function SearchIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        d="m21 21-3.636-3.636m0 0A9 9 0 1 0 4.636 4.636a9 9 0 0 0 12.728 12.728Z"
      />
    </svg>
  );
}

function HeartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="24"
      height="24"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path
        d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function AccountIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
      aria-hidden
    >
      <rect width="10.5" height="10.5" x="6.75" y="1.75" rx="5.25" />
      <path
        strokeLinecap="round"
        d="M12 15.5c1.5 0 4 .333 4.5.5.5.167 3.7.8 4.5 2 1 1.5 1 2 1 4m-10-6.5c-1.5 0-4 .333-4.5.5-.5.167-3.7.8-4.5 2-1 1.5-1 2-1 4"
      />
    </svg>
  );
}

function CartIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M1 1h.5v0c.226 0 .339 0 .44.007a3 3 0 0 1 2.62 1.976c.034.095.065.204.127.42l.17.597m0 0 1.817 6.358c.475 1.664.713 2.496 1.198 3.114a4 4 0 0 0 1.633 1.231c.727.297 1.592.297 3.322.297h2.285c1.75 0 2.626 0 3.359-.302a4 4 0 0 0 1.64-1.253c.484-.627.715-1.472 1.175-3.161l.06-.221c.563-2.061.844-3.092.605-3.906a3 3 0 0 0-1.308-1.713C19.92 4 18.853 4 16.716 4H4.857ZM12 20a2 2 0 1 1-4 0 2 2 0 0 1 4 0Zm8 0a2 2 0 1 1-4 0 2 2 0 0 1 4 0Z"
      />
    </svg>
  );
}

function HamburgerIcon({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      stroke="currentColor"
      fill="none"
      aria-hidden
    >
      <path strokeLinecap="round" d="M3 6H21M3 12H11M3 18H16" />
    </svg>
  );
}

function NavChevronLeft({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 15 14"
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M6.33333 2.91675L2.25 7.00004M2.25 7.00004L6.33333 11.0834M2.25 7.00004H12.75"
      />
    </svg>
  );
}

function NavChevronRight({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      viewBox="0 0 15 14"
      fill="none"
      stroke="currentColor"
      aria-hidden
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        d="M2.25 7.00004H12.75M12.75 7.00004L8.66667 2.91675M12.75 7.00004L8.66667 11.0834"
      />
    </svg>
  );
}

function ChevronDown({ className }: { className?: string }) {
  return (
    <svg
      className={className}
      width="12"
      height="12"
      viewBox="0 0 12 12"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      aria-hidden
    >
      <path strokeLinecap="round" strokeLinejoin="round" d="M2.5 4.5L6 8L9.5 4.5" />
    </svg>
  );
}

/** Pill menu link with duplicate slide-up hover (with-block) */
function MenuPill({
  label,
  href,
  asButton,
  open,
  onClick,
  onKeyDown,
}: {
  label: string;
  href?: string;
  asButton?: boolean;
  open?: boolean;
  onClick?: () => void;
  onKeyDown?: (event: React.KeyboardEvent<HTMLSpanElement>) => void;
}) {
  const inner = (
    <>
      <span className="menu-item__text" data-text>
        <span>{label}</span>
        {asButton && (
          <ChevronDown
            className={cn(
              "transition-transform duration-200",
              open && "rotate-180"
            )}
          />
        )}
      </span>
      <span className="menu-item__duplicate" aria-hidden>
        <span>{label}</span>
        {asButton && (
          <ChevronDown
            className={cn(
              "transition-transform duration-200 text-white",
              open && "rotate-180"
            )}
          />
        )}
      </span>
    </>
  );

  if (asButton) {
    return (
      <span
        className={cn("menu-item", open && "menu-item--open")}
        role="button"
        tabIndex={0}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={onClick}
        onKeyDown={onKeyDown}
      >
        {inner}
      </span>
    );
  }

  return (
    <Link href={href!} className="menu-item">
      {inner}
    </Link>
  );
}

function NavDropdown({
  item,
  open,
  onOpen,
  onClose,
}: {
  item: NavItem;
  open: boolean;
  onOpen: () => void;
  onClose: () => void;
}) {
  const closeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleEnter = () => {
    if (closeTimer.current) {
      clearTimeout(closeTimer.current);
      closeTimer.current = null;
    }
    onOpen();
  };

  const handleLeave = () => {
    if (closeTimer.current) clearTimeout(closeTimer.current);
    closeTimer.current = setTimeout(onClose, 250);
  };

  const toggleDropdown = () => {
    if (open) onClose();
    else onOpen();
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLSpanElement>) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      toggleDropdown();
    }
    if (event.key === "Escape") onClose();
  };

  return (
    <li
      className="nav-item nav-item--dropdown"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
    >
      <MenuPill
        label={item.label}
        asButton
        open={open}
        onClick={onOpen}
        onKeyDown={handleKeyDown}
      />
      <div
        className={cn("nav-dropdown", open && "nav-dropdown--open")}
        onMouseEnter={handleEnter}
        onMouseLeave={handleLeave}
        aria-hidden={!open}
        // Keep closed dropdowns out of the tab order and assistive tech.
        // React 19 supports the boolean inert attribute natively.
        {...(!open ? { inert: true } : {})}
      >
        <div className="nav-dropdown__container">
          <ul className="nav-dropdown__list" role="list">
            {item.children!.map((child, i) => (
              <li
                key={child.href}
                className="nav-dropdown__item"
                style={{ transitionDelay: open ? `${0.3 + i * 0.1}s` : "0s" }}
              >
                <Link
                  href={child.href}
                  className="nav-dropdown__link reversed-link"
                  onClick={onClose}
                >
                  {child.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </li>
  );
}

export default function Header() {
  const { itemCount, openCart } = useCart();
  const { openMobileMenu, openSearch, mobileMenuOpen, closeMobileMenu } =
    useUI();
  const [scrolled, setScrolled] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const menuRef = useRef<HTMLUListElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(false);

  const updateNavScroll = useCallback(() => {
    const el = menuRef.current;
    if (!el) return;
    const maxScroll = el.scrollWidth - el.clientWidth;
    setCanScrollLeft(el.scrollLeft > 2);
    setCanScrollRight(maxScroll > 2 && el.scrollLeft < maxScroll - 2);
  }, []);

  const scrollNav = (dir: "left" | "right") => {
    const el = menuRef.current;
    if (!el) return;
    const amount = Math.max(160, Math.floor(el.clientWidth * 0.45));
    el.scrollBy({
      left: dir === "left" ? -amount : amount,
      behavior: "smooth",
    });
  };

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const el = menuRef.current;
    if (!el) return;
    updateNavScroll();
    el.addEventListener("scroll", updateNavScroll, { passive: true });
    window.addEventListener("resize", updateNavScroll);
    const ro = new ResizeObserver(updateNavScroll);
    ro.observe(el);
    return () => {
      el.removeEventListener("scroll", updateNavScroll);
      window.removeEventListener("resize", updateNavScroll);
      ro.disconnect();
    };
  }, [updateNavScroll]);

  useEffect(() => {
    if (!openDropdown) return;

    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") setOpenDropdown(null);
    };

    const closeOnOutsideClick = (event: MouseEvent) => {
      const target = event.target;
      if (target instanceof Node && !menuRef.current?.contains(target)) {
        setOpenDropdown(null);
      }
    };

    document.addEventListener("keydown", closeOnEscape);
    document.addEventListener("mousedown", closeOnOutsideClick);
    return () => {
      document.removeEventListener("keydown", closeOnEscape);
      document.removeEventListener("mousedown", closeOnOutsideClick);
    };
  }, [openDropdown]);

  return (
    <header
      className={cn(
        "site-header header-left-center",
        scrolled && "is-scrolled"
      )}
    >
      <div className="site-header-inner">
        {/* —— Start tools (mobile: hamburger) —— */}
        <div className="header-icons header-icons--start">
          <button
            type="button"
            className="header-icon-btn menu-drawer-btn"
            onClick={mobileMenuOpen ? closeMobileMenu : openMobileMenu}
            aria-label="Site navigation"
            aria-expanded={mobileMenuOpen}
          >
            <HamburgerIcon className="header-icon" />
          </button>
        </div>

        {/* —— Logo —— */}
        <div className="header-logo">
          <BrandLogo />
        </div>

        {/* —— Desktop category navigation (horizontal slider) —— */}
        <nav
          className="header-navigation"
          role="navigation"
          aria-label="Primary"
        >
          <button
            type="button"
            className={cn(
              "nav-scroll-btn nav-scroll-btn--left",
              canScrollLeft && "nav-scroll-btn--visible"
            )}
            onClick={() => scrollNav("left")}
            aria-label="Scroll categories left"
            tabIndex={canScrollLeft ? 0 : -1}
          >
            <NavChevronLeft className="nav-scroll-btn__icon" />
          </button>

          <ul
            ref={menuRef}
            className="header-menu list-menu with-block"
          >
            {mainNav.map((item) =>
              item.children?.length ? (
                <NavDropdown
                  key={item.label}
                  item={item}
                  open={openDropdown === item.label}
                  onOpen={() => setOpenDropdown(item.label)}
                  onClose={() =>
                    setOpenDropdown((current) =>
                      current === item.label ? null : current
                    )
                  }
                />
              ) : (
                <li key={item.label} className="nav-item">
                  <MenuPill label={item.label} href={item.href} />
                </li>
              )
            )}
          </ul>

          <button
            type="button"
            className={cn(
              "nav-scroll-btn nav-scroll-btn--right",
              canScrollRight && "nav-scroll-btn--visible"
            )}
            onClick={() => scrollNav("right")}
            aria-label="Scroll categories right"
            tabIndex={canScrollRight ? 0 : -1}
          >
            <NavChevronRight className="nav-scroll-btn__icon" />
          </button>
        </nav>

        {/* —— End icons —— */}
        <div className="header-icons header-icons--end">
          <button
            type="button"
            className="header-icon-btn"
            onClick={openSearch}
            aria-label="Search"
          >
            <SearchIcon className="header-icon" />
          </button>

          <Link
            href="/pages/wishlist"
            className="header-icon-btn header-icon-btn--desktop"
            aria-label="Wishlist"
          >
            <HeartIcon className="header-icon" />
          </Link>

          <Link
            href="/account"
            className="header-icon-btn header-icon-btn--desktop"
            aria-label="Login"
          >
            <AccountIcon className="header-icon" />
          </Link>

          <button
            type="button"
            className="header-icon-btn cart-btn relative"
            onClick={openCart}
            aria-label={`Cart ${itemCount} items`}
          >
            <CartIcon className="header-icon" />
            {itemCount > 0 && (
              <span className="cart-count" aria-hidden>
                {itemCount > 99 ? "99+" : itemCount}
              </span>
            )}
          </button>
        </div>
      </div>

      {/* Full-width dim overlay when dropdown open */}
      <div
        className={cn(
          "header-overlay",
          openDropdown && "header-overlay--visible"
        )}
        onClick={() => setOpenDropdown(null)}
        aria-hidden
      />
    </header>
  );
}
