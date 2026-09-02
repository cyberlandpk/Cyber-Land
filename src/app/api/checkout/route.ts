import { NextResponse } from "next/server";
import { woocommerceService } from "@/services/woocommerce.service";

/**
 * POST /api/checkout
 *
 * Creates a real order in WooCommerce. Runs server-side only so the
 * WooCommerce consumer credentials never reach the client. The client cart
 * is the source of the line items (id + quantity); prices are not trusted
 * from the request body — they are re-read from WooCommerce.
 */

interface CheckoutLineItem {
  product_id: number;
  quantity: number;
}

interface CheckoutRequestBody {
  shipping?: {
    fullName?: string;
    contactInfo?: string;
    address?: string;
    city?: string;
    provinceState?: string;
  };
  paymentMethod?: string;
  note?: string;
  items?: { productId: string; quantity: number; variant?: string }[];
}

const VALID_NAME = /^[\p{L}\p{N}\s.'-]{2,80}$/u;
const VALID_PHONE_OR_EMAIL =
  /^(\+?[\d\s-]{10,}|[^\s@]+@[^\s@]+\.[^\s@]+)$/;
const VALID_TEXT_200 = /^[\p{L}\p{N}\s.,'#\-/()&:;]{2,200}$/u;
const VALID_PROVINCE = /^[a-zA-Z\s]{2,60}$/;
const ALLOWED_PAYMENTS = new Set([
  "easypaisa",
  "jazzcash",
  "bank_transfer",
  "cod",
  "card",
]);

function badRequest(message: string) {
  return NextResponse.json({ error: message }, { status: 400 });
}

export async function POST(request: Request) {
  if (!woocommerceService.isConfigured()) {
    return NextResponse.json(
      { error: "Checkout is not configured. Please contact support." },
      { status: 503 }
    );
  }

  let body: CheckoutRequestBody;
  try {
    body = (await request.json()) as CheckoutRequestBody;
  } catch {
    return badRequest("Invalid request payload.");
  }

  // ---- Validate shipping details ----
  const s = body.shipping ?? {};
  if (!s.fullName || !VALID_NAME.test(s.fullName)) {
    return badRequest("A valid full name is required.");
  }
  if (!s.contactInfo || !VALID_PHONE_OR_EMAIL.test(s.contactInfo)) {
    return badRequest("A valid phone number or email is required.");
  }
  if (!s.address || !VALID_TEXT_200.test(s.address)) {
    return badRequest("A valid address is required.");
  }
  if (!s.city || !VALID_TEXT_200.test(s.city)) {
    return badRequest("A valid city is required.");
  }
  if (!s.provinceState || !VALID_PROVINCE.test(s.provinceState)) {
    return badRequest("A valid province/state is required.");
  }
  if (
    body.paymentMethod == null ||
    !ALLOWED_PAYMENTS.has(body.paymentMethod)
  ) {
    return badRequest("A valid payment method is required.");
  }

  // ---- Validate cart items ----
  const items = body.items ?? [];
  if (!Array.isArray(items) || items.length === 0) {
    return badRequest("Your cart is empty.");
  }
  for (const item of items) {
    if (
      !item ||
      !/^\d{1,12}$/.test(item.productId ?? "") ||
      !Number.isInteger(item.quantity) ||
      item.quantity < 1 ||
      item.quantity > 99
    ) {
      return badRequest("One or more cart items are invalid.");
    }
  }

  // ---- Re-read products server-side (do not trust client prices) ----
  let lineItems: CheckoutLineItem[] = [];
  try {
    const products = await Promise.all(
      items.map((item) =>
        woocommerceService.getProductById(item.productId).then((p) => ({
          product: p,
          quantity: item.quantity,
        }))
      )
    );

    // Ensure every product exists and is purchasable.
    for (const { product } of products) {
      if (!product || !product.available) {
        return NextResponse.json(
          { error: "One or more products are unavailable." },
          { status: 409 }
        );
      }
    }

    lineItems = products.map(({ product, quantity }) => ({
      product_id: Number(product.id),
      quantity,
    }));
  } catch {
    return NextResponse.json(
      { error: "We could not verify your cart items. Please try again." },
      { status: 502 }
    );
  }

  // ---- Create the order in WooCommerce ----
  const isEmail = s.contactInfo.includes("@");
  const [firstName, ...restName] = s.fullName.split(" ");
  const lastName = restName.join(" ") || "-";

  // WooCommerce rejects empty-string email/phone ("Invalid email address"),
  // so only include the fields we actually have.
  const billing: Record<string, string> = {
    first_name: firstName || s.fullName,
    last_name: lastName,
    address_1: s.address,
    city: s.city,
    state: s.provinceState,
    country: "PK",
  };
  if (isEmail) {
    billing.email = s.contactInfo;
  } else {
    billing.phone = s.contactInfo;
  }

  const orderPayload = {
    payment_method: body.paymentMethod,
    payment_method_title: body.paymentMethod.replace(/_/g, " ").toUpperCase(),
    set_paid: false,
    status: "processing",
    billing,
    shipping: {
      first_name: firstName || s.fullName,
      last_name: lastName,
      address_1: s.address,
      city: s.city,
      state: s.provinceState,
      country: "PK",
    },
    line_items: lineItems,
    ...(body.note && body.note.length <= 500 ? { customer_note: body.note } : {}),
  };

  try {
    const order = (await woocommerceService.createOrder(orderPayload)) as {
      id?: number;
      status?: string;
    };
    if (!order?.id) {
      throw new Error("Order ID missing in WooCommerce response");
    }
    return NextResponse.json({
      orderId: String(order.id),
      status: "confirmed",
    });
  } catch (err) {
    console.error("Order creation failed:", err instanceof Error ? err.message : err);
    return NextResponse.json(
      { error: "We could not place your order. Please try again or contact support." },
      { status: 502 }
    );
  }
}

// Guard against accidental exposure in dev overlays: never echo env values.
export async function GET() {
  return NextResponse.json(
    { error: "Method not allowed" },
    { status: 405 }
  );
}
