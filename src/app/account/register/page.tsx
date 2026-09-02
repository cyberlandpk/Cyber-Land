"use client";

import Link from "next/link";

export default function RegisterPage() {
  return (
    <section className="section section--padding">
      <div className="page-width max-w-md py-10">
        <h1 className="section-title mb-2">Create account</h1>
        <p className="mb-6 text-sm text-black/55">
          Accounts are coming soon. You can shop and check out as a guest —
          your cart is saved on this device.
        </p>
        <Link href="/collections/shop-all" className="btn btn-primary">
          Continue shopping
        </Link>
        <p className="mt-6 text-center text-sm text-black/55">
          Need help with an order?{" "}
          <Link
            href="/pages/contact"
            className="font-semibold text-[#171717] underline-offset-2 hover:underline"
          >
            Contact support
          </Link>
        </p>
      </div>
    </section>
  );
}
