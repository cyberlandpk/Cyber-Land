"use client";

import { useState, useEffect, type FormEvent } from "react";
import Link from "next/link";
import {
  Sparkles,
  MessageCircle,
  CheckCircle2,
  ShieldCheck,
  Zap,
  Clock,
  ArrowRight,
  Boxes,
  Mail,
  Check,
} from "lucide-react";

type Props = {
  title: string;
  description?: string;
  categoryHandle?: string;
};

export default function CategoryComingSoon({
  title,
  description,
  categoryHandle = "",
}: Props) {
  const [email, setEmail] = useState("");
  const [isSubscribed, setIsSubscribed] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);

  // Check if previously subscribed in localStorage
  useEffect(() => {
    if (typeof window !== "undefined" && categoryHandle) {
      const stored = localStorage.getItem(`cyberland_notify_${categoryHandle}`);
      if (stored) {
        setIsSubscribed(true);
      }
    }
  }, [categoryHandle]);

  const handleSubscribe = (e: FormEvent) => {
    e.preventDefault();
    if (!email || !email.includes("@")) return;

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubscribed(true);
      if (typeof window !== "undefined" && categoryHandle) {
        localStorage.setItem(`cyberland_notify_${categoryHandle}`, email);
      }
    }, 600);
  };

  const whatsappMessage = encodeURIComponent(
    `Hi Cyber Land! I am inquiring about upcoming products in the *${title}* category. When will stock arrive or can I pre-order?`
  );
  const whatsappUrl = `https://wa.me/923458006009?text=${whatsappMessage}`;

  const copyCategoryLink = () => {
    if (typeof window !== "undefined") {
      navigator.clipboard.writeText(window.location.href);
      setCopiedLink(true);
      setTimeout(() => setCopiedLink(false), 2000);
    }
  };

  return (
    <div className="relative my-6 overflow-hidden rounded-[28px] border border-red-200/80 bg-gradient-to-b from-white via-[#FFF8F8] to-[#FFF1F1] p-6 text-center shadow-[0_15px_45px_-12px_rgba(188,0,0,0.12)] md:my-10 md:p-14">
      {/* Background Decorative Red Ambient Glows */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -top-24 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-red-500/10 blur-3xl md:h-96 md:w-96"
      />
      <div
        aria-hidden="true"
        className="pointer-events-none absolute -bottom-20 -right-20 h-60 w-60 rounded-full bg-[#BC0000]/5 blur-2xl"
      />

      <div className="relative z-10 mx-auto max-w-2xl">
        {/* Glowing Beacon Pill */}
        <div className="inline-flex items-center gap-2 rounded-full border border-red-300/80 bg-white/90 px-4 py-1.5 text-xs font-bold uppercase tracking-wider text-[#BC0000] shadow-sm backdrop-blur-sm">
          <span className="relative flex h-2.5 w-2.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-red-400 opacity-75" />
            <span className="relative inline-flex h-2.5 w-2.5 rounded-full bg-[#BC0000]" />
          </span>
          <span>Stock In Procurement</span>
        </div>

        {/* Hero Cyber Icon */}
        <div className="mx-auto mt-6 flex h-20 w-20 items-center justify-center rounded-2xl bg-gradient-to-br from-[#BC0000] via-[#D31212] to-[#8C0000] text-white shadow-[0_12px_30px_rgba(188,0,0,0.35)] ring-8 ring-red-100/70 md:h-24 md:w-24">
          <Boxes className="h-10 w-10 md:h-12 md:w-12" />
        </div>

        {/* Title & Description */}
        <h2 className="mt-6 font-heading text-3xl font-extrabold tracking-tight text-[#171717] md:text-4xl lg:text-5xl">
          Coming Soon to <span className="text-[#BC0000]">{title}</span>
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-sm leading-relaxed text-black/70 md:text-base">
          {description ? (
            <span>
              {description} — Our team is currently curating and testing top-tier inventory for this lineup.
            </span>
          ) : (
            <span>
              We are actively sourcing and quality-testing authentic inventory for this category. Stay tuned for premium gear dropping shortly!
            </span>
          )}
        </p>

        {/* 3 Core Value Pills (Red Themed) */}
        <div className="mt-8 grid grid-cols-1 gap-3 sm:grid-cols-3">
          <div className="rounded-2xl border border-red-100 bg-white/80 p-3.5 text-left shadow-xs backdrop-blur-xs transition hover:border-red-200">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#BC0000]">
                <ShieldCheck className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-black/90">100% Authentic</p>
                <p className="text-[11px] text-black/55">Official warranty</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-red-100 bg-white/80 p-3.5 text-left shadow-xs backdrop-blur-xs transition hover:border-red-200">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#BC0000]">
                <Zap className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-black/90">Best Price Rate</p>
                <p className="text-[11px] text-black/55">Direct import PKR</p>
              </div>
            </div>
          </div>

          <div className="rounded-2xl border border-red-100 bg-white/80 p-3.5 text-left shadow-xs backdrop-blur-xs transition hover:border-red-200">
            <div className="flex items-center gap-2.5">
              <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl bg-red-50 text-[#BC0000]">
                <Clock className="h-4 w-4" />
              </div>
              <div>
                <p className="text-xs font-bold text-black/90">VIP Allocation</p>
                <p className="text-[11px] text-black/55">Priority reserved</p>
              </div>
            </div>
          </div>
        </div>

        {/* VIP Alert Notification Form */}
        <div className="mt-8 rounded-2xl border border-red-200 bg-white p-5 shadow-sm md:p-6">
          <div className="flex items-center justify-center gap-2 text-xs font-bold uppercase tracking-wider text-[#BC0000]">
            <Sparkles className="h-4 w-4" />
            <span>Get VIP Stock Drop Alert</span>
          </div>
          <p className="mt-1 text-xs text-black/60 md:text-sm">
            Enter your email to receive an instant alert with exclusive launch pricing when {title} arrives.
          </p>

          {isSubscribed ? (
            <div className="mt-4 flex items-center justify-center gap-2.5 rounded-xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-semibold text-emerald-800">
              <CheckCircle2 className="h-5 w-5 text-emerald-600" />
              <span>You are on the VIP priority list for {title}! We will alert you first.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="mt-4 flex flex-col gap-2 sm:flex-row">
              <div className="relative flex-1">
                <Mail className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-black/40" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email address..."
                  required
                  className="w-full rounded-full border border-red-200 bg-[#FFFDFD] py-2.5 pl-10 pr-4 text-sm text-black outline-none transition focus:border-[#BC0000] focus:ring-2 focus:ring-red-100"
                />
              </div>
              <button
                type="submit"
                disabled={isSubmitting}
                className="inline-flex items-center justify-center gap-2 rounded-full bg-[#BC0000] px-6 py-2.5 text-sm font-bold text-white shadow-md shadow-red-500/25 transition hover:bg-[#920000] disabled:opacity-60 cursor-pointer"
              >
                {isSubmitting ? (
                  <span>Saving...</span>
                ) : (
                  <>
                    <span>Notify Me</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>
            </form>
          )}
        </div>

        {/* Direct Action Buttons */}
        <div className="mt-8 flex flex-wrap items-center justify-center gap-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2.5 rounded-full bg-[#25D366] px-6 py-3 text-sm font-bold text-white shadow-sm transition hover:bg-[#1EBE5D] hover:shadow-md hover:shadow-[#25D366]/20"
          >
            <MessageCircle className="h-4 w-4" />
            <span>Inquire / Request on WhatsApp (+92 345 8006009)</span>
          </a>

          <Link
            href="/collections"
            className="inline-flex items-center gap-2 rounded-full border border-red-200 bg-white px-6 py-3 text-sm font-bold text-[#171717] shadow-xs transition hover:border-[#BC0000] hover:bg-red-50/50 hover:text-[#BC0000]"
          >
            <span>Explore All Categories</span>
            <ArrowRight className="h-4 w-4" />
          </Link>

          <button
            type="button"
            onClick={copyCategoryLink}
            className="inline-flex items-center gap-1.5 rounded-full border border-black/10 bg-white/70 px-4 py-3 text-xs font-semibold text-black/70 transition hover:bg-white hover:text-black cursor-pointer"
            title="Share this category page"
          >
            {copiedLink ? (
              <>
                <Check className="h-3.5 w-3.5 text-emerald-600" />
                <span>Link Copied!</span>
              </>
            ) : (
              <span>Share Link</span>
            )}
          </button>
        </div>
      </div>
    </div>
  );
}
