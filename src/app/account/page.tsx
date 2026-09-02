"use client";

import Link from "next/link";
import { useAuthStore } from "@/store/auth.store";

export default function AccountPage() {
  // Auth backend is not connected yet — no fake sessions are created.
  // isAuthent isAuthenticated will only ever be true if a real backend sets it.
  const { user, isAuthenticated, logout } = useAuthStore();

  if (!isAuthenticated || !user) {
    return (
      <section className="section section--padding">
        <div className="page-width max-w-md py-12 text-center">
          <h1 className="section-title mb-3">Account</h1>
          <p className="mb-6 text-sm text-black/60">
            Accounts are coming soon. You can shop and check out as a guest —
            your cart is saved on this device.
          </p>
          <div className="flex flex-col gap-3 sm:flex-row sm:justify-center">
            <Link href="/collections/shop-all" className="btn btn-primary">
              Continue shopping
            </Link>
            <Link href="/pages/track-order" className="btn btn-secondary">
              Track an order
            </Link>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="section section--padding">
      <div className="page-width max-w-lg py-10">
        <h1 className="section-title mb-2">My account</h1>
        <p className="mb-8 text-sm text-black/55">
          Signed in as {user.email}
        </p>
        <ul className="mb-8 flex flex-col gap-3 text-sm font-medium">
          <li>
            <Link href="/cart" className="reversed-link">
              Cart
            </Link>
          </li>
          <li>
            <Link href="/collections/shop-all" className="reversed-link">
              Continue shopping
            </Link>
          </li>
        </ul>
        <button type="button" className="btn btn-secondary" onClick={logout}>
          Log out
        </button>
      </div>
    </section>
  );
}
