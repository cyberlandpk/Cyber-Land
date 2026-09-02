import type {
  CheckoutPayload,
  CheckoutResult,
} from "@/types";
import type { CartItem } from "@/types";

/**
 * Checkout service — creates real orders through the server API route
 * (/api/checkout), which talks to WooCommerce with server-only credentials.
 *
 * WhatsApp is used purely as an optional follow-up notification for the store
 * owner — it is never the order database.
 */
export const checkoutService = {
  async placeOrder(
    payload: CheckoutPayload,
    items: CartItem[],
    totals: { subtotal: number; shipping: number }
  ): Promise<CheckoutResult> {
    const response = await fetch("/api/checkout", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        shipping: payload.shipping,
        paymentMethod: payload.paymentMethod,
        note: payload.note,
        items: items.map((item) => ({
          productId: item.product.id,
          quantity: item.quantity,
          variant: item.variant,
        })),
      }),
    });

    let data: { orderId?: string; status?: string; error?: string } = {};
    try {
      data = (await response.json()) as typeof data;
    } catch {
      data = {};
    }

    if (!response.ok || !data.orderId) {
      throw new Error(
        data.error ?? "We could not place your order. Please try again."
      );
    }

    return {
      orderId: data.orderId,
      status: "confirmed",
      total: totals.subtotal + totals.shipping,
    };
  },

  /** Optional WhatsApp follow-up link the customer can use to reach support. */
  buildWhatsAppFollowUp(orderId: string): string {
    const message = `Hi Cyber Land, I placed order #${orderId} on your website and have a question about it.`;
    return `https://wa.me/923458006009?text=${encodeURIComponent(message)}`;
  },
};
