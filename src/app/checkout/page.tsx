"use client";

import { useState } from "react";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  checkoutSchema,
  type CheckoutFormValues,
} from "@/features/checkout/schemas/checkout.schema";
import { checkoutService } from "@/services/checkout.service";
import { useCart } from "@/hooks/useCart";
import { siteConfig } from "@/config/site";
import { formatPrice } from "@/utils";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const SHIPPING_FLAT_RATE = 200;

export default function CheckoutPage() {
  const { items, subtotal, clearCart } = useCart();
  const [orderId, setOrderId] = useState<string | null>(null);
  const [serverError, setServerError] = useState<string | null>(null);
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<CheckoutFormValues>({
    resolver: zodResolver(checkoutSchema),
    defaultValues: {
      paymentMethod: "cod",
      shipping: {
        provinceState: "Punjab",
      },
    },
  });

  // Free shipping threshold matches the cart drawer and product pages.
  const freeShippingEligible =
    subtotal >= siteConfig.freeShippingThreshold && subtotal > 0;
  const shipping = freeShippingEligible ? 0 : SHIPPING_FLAT_RATE;
  const total = subtotal + shipping;

  if (items.length === 0 && !orderId) {
    return (
      <section className="section section--padding">
        <div className="page-width max-w-md py-16 text-center">
          <h1 className="section-title mb-3">Checkout</h1>
          <p className="mb-6 text-sm text-black/60">Your cart is empty.</p>
          <Link href="/collections/shop-all" className="btn btn-primary">
            Continue shopping
          </Link>
        </div>
      </section>
    );
  }

  if (orderId) {
    return (
      <section className="section section--padding">
        <div className="page-width max-w-md py-16 text-center">
          <h1 className="section-title mb-3">Order confirmed</h1>
          <p className="mb-2 text-sm text-black/60">
            Thank you. Your order ID is:
          </p>
          <p className="mb-6 font-semibold tracking-wide">#{orderId}</p>
          <p className="mb-6 text-xs text-black/50">
            You will receive an update once your order ships. For any questions,
            contact support and mention your order ID.
          </p>
          <div className="flex flex-col justify-center gap-3 sm:flex-row">
            <Link href="/" className="btn btn-primary">
              Back to home
            </Link>
            <a
              href={checkoutService.buildWhatsAppFollowUp(orderId)}
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-secondary"
            >
              Contact support
            </a>
          </div>
        </div>
      </section>
    );
  }

  const onSubmit = async (values: CheckoutFormValues) => {
    setServerError(null);
    try {
      const result = await checkoutService.placeOrder(values, items, {
        subtotal,
        shipping,
      });
      // Only show success after the backend confirmed the order was created.
      clearCart();
      setOrderId(result.orderId);
    } catch (e) {
      setServerError(
        e instanceof Error ? e.message : "Checkout failed. Please try again."
      );
    }
  };

  return (
    <section className="section section--padding">
      <div className="page-width">
        <h1 className="section-title mb-8">Checkout</h1>
        <div className="grid gap-10 lg:grid-cols-[1fr_340px]">
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col gap-4"
            noValidate
          >
            <h2 className="heading text-lg font-medium">Shipping</h2>
            <Input
              placeholder="Full name"
              autoComplete="name"
              {...register("shipping.fullName")}
            />
            {errors.shipping?.fullName && (
              <p className="-mt-2 text-xs text-red-600">
                {errors.shipping.fullName.message}
              </p>
            )}
            <Input
              placeholder="Phone Number (Preferred) or Email Address"
              autoComplete="tel"
              {...register("shipping.contactInfo")}
            />
            {errors.shipping?.contactInfo && (
              <p className="-mt-2 text-xs text-red-600">
                {errors.shipping.contactInfo.message}
              </p>
            )}
            <Input
              placeholder="Address"
              autoComplete="street-address"
              {...register("shipping.address")}
            />
            {errors.shipping?.address && (
              <p className="-mt-2 text-xs text-red-600">
                {errors.shipping.address.message}
              </p>
            )}
            <div className="grid gap-3 sm:grid-cols-2">
              <div>
                <Input placeholder="City" autoComplete="address-level2" {...register("shipping.city")} />
                {errors.shipping?.city && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.shipping.city.message}
                  </p>
                )}
              </div>
              <div>
                <Input
                  placeholder="Province / State"
                  autoComplete="address-level1"
                  {...register("shipping.provinceState")}
                />
                {errors.shipping?.provinceState && (
                  <p className="mt-1 text-xs text-red-600">
                    {errors.shipping.provinceState.message}
                  </p>
                )}
              </div>
            </div>
            <Input placeholder="Order notes (optional)" {...register("note")} />

            <div className="mt-6">
              <h2 className="text-lg font-medium">Shipping method</h2>
              <div className="mt-3 flex items-center justify-between rounded-md border border-black/10 bg-[#fafafa] px-4 py-4 text-sm">
                <span>Delivery Charges</span>
                <span className="font-medium">
                  {freeShippingEligible ? "FREE" : formatPrice(SHIPPING_FLAT_RATE)}
                </span>
              </div>
              {freeShippingEligible ? (
                <p className="mt-2 text-xs text-green-700">
                  Free shipping unlocked — your order is above Rs.{" "}
                  {siteConfig.freeShippingThreshold.toLocaleString("en-PK")}.
                </p>
              ) : (
                <p className="mt-2 text-xs text-black/50">
                  Spend {formatPrice(siteConfig.freeShippingThreshold - subtotal)}{" "}
                  more to get free shipping.
                </p>
              )}
            </div>

            <div className="mt-6">
              <h2 className="text-lg font-medium">Payment</h2>
              <p className="mt-1 text-sm text-black/60">
                All transactions are secure and encrypted.
              </p>
              <div className="mt-3 overflow-hidden rounded-md border border-black/10">
                <div className="border-b border-black/10 bg-[#fafafa] px-4 py-4 text-sm font-medium">
                  Cash on Delivery (COD)
                </div>
                <div className="bg-[#f5f5f5] px-4 py-5 text-center text-sm text-black/80">
                  Delivery takes 4-7 Working Days
                </div>
              </div>
            </div>

            {serverError && (
              <p
                role="alert"
                className="mt-4 rounded-md border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {serverError}
              </p>
            )}

            <Button
              type="submit"
              disabled={isSubmitting}
              className="mt-6 h-14 w-full text-base"
            >
              {isSubmitting ? "Placing order…" : "Complete order"}
            </Button>
          </form>

          <aside className="h-fit rounded-2xl border border-black/8 bg-[#fafafa] p-6">
            <h2 className="heading mb-4 text-base font-medium">Order summary</h2>
            <ul className="mb-4 flex flex-col gap-3 text-sm">
              {items.map((item) => (
                <li
                  key={`${item.product.id}-${item.variant ?? ""}`}
                  className="flex justify-between gap-2"
                >
                  <span className="line-clamp-2">
                    {item.product.title} × {item.quantity}
                  </span>
                  <span className="shrink-0 font-medium">
                    {formatPrice(item.product.price * item.quantity)}
                  </span>
                </li>
              ))}
            </ul>
            <div className="flex justify-between pt-3 text-sm">
              <span>Subtotal</span>
              <span>{formatPrice(subtotal)}</span>
            </div>
            <div className="flex justify-between py-2 text-sm">
              <span>Shipping</span>
              <span>{shipping === 0 ? "FREE" : formatPrice(shipping)}</span>
            </div>
            <div className="flex justify-between border-t border-black/10 pt-3 text-base font-semibold">
              <span>Total</span>
              <span>{formatPrice(total)}</span>
            </div>
            <p className="mt-2 text-xs text-black/45">Tax included.</p>
          </aside>
        </div>
      </div>
    </section>
  );
}
