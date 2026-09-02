export type ContentBlock =
  | { type: "p"; text: string }
  | { type: "h2"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "cta"; label: string; href: string };

export type CmsPage = {
  title: string;
  subtitle?: string;
  blocks: ContentBlock[];
};

export const supportPages: Record<string, CmsPage> = {
  contact: {
    title: "Contact Us",
    subtitle: "Mon – Sat · 10am – 7pm PKT",
    blocks: [
      {
        type: "p",
        text: "Need help with an order, product setup, or warranty claim? Our support team is here for you.",
      },
      { type: "h2", text: "Reach out" },
      {
        type: "ul",
        items: [
          "Email: help@cyberland.com",
          "Phone / WhatsApp: +92 345 8006009",
          "Hours: Monday – Saturday, 10:00 AM – 7:00 PM PKT",
        ],
      },
      {
        type: "cta",
        label: "Chat on WhatsApp",
        href: "https://wa.me/923458006009",
      },
      {
        type: "cta",
        label: "Track your order",
        href: "/pages/track-order",
      },
    ],
  },
  faq: {
    title: "FAQs",
    subtitle: "Answers to common questions",
    blocks: [
      {
        type: "h2",
        text: "Shipping",
      },
      {
        type: "ul",
        items: [
          "Free shipping on orders above Rs. 1,000 within Pakistan.",
          "Most orders ship within 1–2 business days.",
          "Delivery timelines vary by postal code — track via Track Order.",
        ],
      },
      { type: "h2", text: "Returns & replacements" },
      {
        type: "ul",
        items: [
          "7 days return and replacement on eligible products*",
          "Items must be unused and in original packaging with all accessories.",
          "Initiate returns through our returns portal or contact support.",
        ],
      },
      { type: "h2", text: "Warranty" },
      {
        type: "ul",
        items: [
          "Cyber Land products include manufacturer warranty as listed on the product page.",
          "Keep your invoice for warranty claims.",
          "See Warranty Guidelines for claim steps.",
        ],
      },
      { type: "h2", text: "Payments" },
      {
        type: "ul",
        items: [
          "We accept Easypaisa, JazzCash, Bank Transfer, Cash on Delivery, and cards at checkout.",
          "All prices on the site are inclusive of applicable taxes unless stated otherwise.",
        ],
      },
      {
        type: "cta",
        label: "Contact support",
        href: "/pages/contact",
      },
    ],
  },
  downloads: {
    title: "Software downloads",
    subtitle: "Drivers & Kontrol software",
    blocks: [
      {
        type: "p",
        text: "Download official software and drivers for Cyber Land keyboards, mice, and devices. Use Kontrol to customize RGB, macros, DPI, and performance profiles.",
      },
      { type: "h2", text: "Available tools" },
      {
        type: "ul",
        items: [
          "Kontrol Web Software — cloud-based configuration for supported devices",
          "Device drivers — install for Windows as recommended on product pages",
          "Firmware updates — check Kontrol or product documentation",
        ],
      },
      {
        type: "cta",
        label: "Open Kontrol Web Software",
        href: "/pages/kontrol",
      },
      {
        type: "cta",
        label: "Contact for install help",
        href: "/pages/contact",
      },
    ],
  },
  "downloads-1": {
    title: "Software downloads",
    subtitle: "Drivers & Kontrol software",
    blocks: [
      {
        type: "p",
        text: "Download official software and drivers for Cyber Land keyboards, mice, and devices.",
      },
      {
        type: "cta",
        label: "Go to downloads",
        href: "/pages/downloads",
      },
      {
        type: "cta",
        label: "Kontrol Web Software",
        href: "/pages/kontrol",
      },
    ],
  },
  kontrol: {
    title: "Kontrol Web Software",
    subtitle: "Customize your Cyber Land gear",
    blocks: [
      {
        type: "p",
        text: "Kontrol is Cyber Land’s configuration platform for supported keyboards and mice. Map macros, tune DPI and polling, and design RGB lighting profiles that sync across sessions.",
      },
      { type: "h2", text: "What you can do" },
      {
        type: "ul",
        items: [
          "Remap keys and create multi-layer macros",
          "Adjust DPI stages, lift-off distance, and polling rate",
          "Build and save RGB lighting effects",
          "Import / export profiles for easy setup on a new PC",
        ],
      },
      {
        type: "cta",
        label: "Software downloads",
        href: "/pages/downloads",
      },
      {
        type: "cta",
        label: "Shop keyboards",
        href: "/collections/mechanical-keyboards",
      },
    ],
  },
  "warranty-guidelines": {
    title: "Warranty Guidelines",
    subtitle: "Manufacturer warranty support",
    blocks: [
      {
        type: "p",
        text: "Cyber Land products are covered by manufacturer warranty as specified on each product page. Warranty covers manufacturing defects under normal use.",
      },
      { type: "h2", text: "What’s typically covered" },
      {
        type: "ul",
        items: [
          "Manufacturing defects in materials and workmanship",
          "Failure of electronic components under normal use",
        ],
      },
      { type: "h2", text: "What’s not covered" },
      {
        type: "ul",
        items: [
          "Physical damage, liquid damage, or unauthorized modifications",
          "Normal wear and tear (e.g. keycap shine, cable fray from misuse)",
          "Products purchased from unauthorized sellers",
        ],
      },
      { type: "h2", text: "How to claim" },
      {
        type: "ul",
        items: [
          "Email help@cyberland.com with order ID, product name, and issue description",
          "Attach clear photos/videos and your invoice",
          "Our team will guide you through RMA / replacement steps",
        ],
      },
      {
        type: "cta",
        label: "Start a warranty request",
        href: "/pages/contact",
      },
    ],
  },
  "b2b-queries": {
    title: "B2B Orders",
    subtitle: "Bulk & corporate enquiries",
    blocks: [
      {
        type: "p",
        text: "Cyber Land partners with studios, esports teams, campuses, and enterprises for bulk hardware supply and custom requirements.",
      },
      { type: "h2", text: "What we offer" },
      {
        type: "ul",
        items: [
          "Volume pricing on keyboards, mice, chairs, monitors, and audio",
          "Dedicated account support for large orders",
          "Invoicing and delivery coordination across Pakistan",
        ],
      },
      {
        type: "p",
        text: "Email help@cyberland.com with subject line “B2B Enquiry” including quantity, product interest, and delivery city.",
      },
      {
        type: "cta",
        label: "Email B2B team",
        href: "mailto:help@cyberland.com?subject=B2B%20Enquiry",
      },
    ],
  },
  "creators-program": {
    title: "Creators Program",
    subtitle: "Partner with Cyber Land as a creator",
    blocks: [
      {
        type: "p",
        text: "The Creators Program connects content creators and influencers with Cyber Land gear, early access, and collab opportunities.",
      },
      { type: "h2", text: "Who should apply" },
      {
        type: "ul",
        items: [
          "Gaming, tech, and productivity creators",
          "Streamers and reviewers with engaged audiences",
          "Campus and community creators building setups content",
        ],
      },
      {
        type: "cta",
        label: "Contact us to apply",
        href: "/pages/contact",
      },
      {
        type: "cta",
        label: "Follow @cyberland",
        href: "https://www.instagram.com/cyberland/",
      },
    ],
  },
  "campus-ambassador-program": {
    title: "Campus Ambassador Program",
    subtitle: "Represent Cyber Land on your campus",
    blocks: [
      {
        type: "p",
        text: "Become a Cyber Land Campus Ambassador. Host demos, grow the community, and unlock ambassador-only perks.",
      },
      { type: "h2", text: "Perks" },
      {
        type: "ul",
        items: [
          "Product access and exclusive campus deals",
          "Brand merch and recognition",
          "Direct line to the Cyber Land community team",
        ],
      },
      {
        type: "cta",
        label: "Apply via Contact Us",
        href: "/pages/contact",
      },
    ],
  },
  wishlist: {
    title: "Wishlist",
    subtitle: "Save products you love",
    blocks: [
      {
        type: "p",
        text: "Your wishlist helps you save Cyber Land products for later. Browse collections and add items from product pages.",
      },
      {
        type: "cta",
        label: "Continue shopping",
        href: "/collections/shop-all",
      },
      {
        type: "cta",
        label: "View bestsellers",
        href: "/collections/best-sellers",
      },
    ],
  },
  "track-order": {
    title: "Track Order",
    subtitle: "Follow your shipment",
    blocks: [
      {
        type: "p",
        text: "Track Cyber Land orders in real time through our shipping partners. You’ll need your order number and phone / email used at checkout.",
      },
      {
        type: "p",
        text: "For delivery issues, contact help@cyberland.com or WhatsApp +92 345 8006009 with your order ID.",
      },
      {
        type: "cta",
        label: "Contact support",
        href: "/pages/contact",
      },
    ],
  },
  "returns-exchanges": {
    title: "Returns & Exchanges",
    subtitle: "7 days return and replacement*",
    blocks: [
      {
        type: "p",
        text: "Eligible products can be returned or replaced within 7 days of delivery. Products must be unused, with original packaging and accessories.",
      },
      { type: "h2", text: "How to initiate" },
      {
        type: "ul",
        items: [
          "Email help@cyberland.com with order ID and reason",
          "Or WhatsApp +92 345 8006009",
          "Our team will share pickup / replacement instructions",
        ],
      },
      {
        type: "cta",
        label: "Read refund policy",
        href: "/policies/refund-policy",
      },
    ],
  },
  support: {
    title: "Support",
    subtitle: "We’re here to help",
    blocks: [
      {
        type: "p",
        text: "Find answers, track orders, claim warranty, or talk to a human — all from one place.",
      },
      {
        type: "ul",
        items: [
          "FAQs — shipping, returns, payments",
          "Track Order — live shipment status",
          "Warranty — claim manufacturing defects",
          "Downloads — software and drivers",
          "Contact Us — email, phone, WhatsApp",
        ],
      },
      { type: "cta", label: "FAQs", href: "/pages/faq" },
      { type: "cta", label: "Track Order", href: "/pages/track-order" },
      { type: "cta", label: "Contact Us", href: "/pages/contact" },
      { type: "cta", label: "Downloads", href: "/pages/downloads" },
    ],
  },
};

export const policyPages: Record<string, CmsPage> = {
  "refund-policy": {
    title: "Refund policy",
    blocks: [
      {
        type: "p",
        text: "Cyber Land offers 7 days return and replacement on eligible products from the date of delivery, subject to the conditions below.",
      },
      { type: "h2", text: "Eligibility" },
      {
        type: "ul",
        items: [
          "Product is unused and in original condition",
          "Original packaging, tags, and freebies included",
          "Request raised within 7 days of delivery",
          "Proof of purchase (order ID / invoice) available",
        ],
      },
      { type: "h2", text: "Non-returnable" },
      {
        type: "ul",
        items: [
          "Products damaged by misuse, liquid, or unauthorized repair",
          "Missing accessories or freebies",
          "Orders beyond the return window",
        ],
      },
      { type: "h2", text: "Refunds" },
      {
        type: "p",
        text: "Once the returned product is inspected and approved, refunds are processed to the original payment method. Timelines depend on your bank or payment provider.",
      },
      {
        type: "cta",
        label: "Start a return",
        href: "/pages/returns-exchanges",
      },
    ],
  },
  "privacy-policy": {
    title: "Privacy policy",
    blocks: [
      {
        type: "p",
        text: "We respect your privacy. This policy describes how Cyber Land collects, uses, and protects personal information when you shop on our website.",
      },
      { type: "h2", text: "Information we collect" },
      {
        type: "ul",
        items: [
          "Account and contact details (name, email, phone, address)",
          "Order and payment metadata (processed via secure gateways)",
          "Device and usage data (cookies, analytics) to improve the site",
        ],
      },
      { type: "h2", text: "How we use it" },
      {
        type: "ul",
        items: [
          "Fulfill orders, shipping, and customer support",
          "Send order updates and service communications",
          "Improve products, website performance, and security",
        ],
      },
      {
        type: "p",
        text: "We do not sell your personal data. Contact help@cyberland.com for privacy requests.",
      },
    ],
  },
  "terms-of-service": {
    title: "Terms of service",
    blocks: [
      {
        type: "p",
        text: "By accessing this website you agree to these terms. If you do not agree, please do not use the site.",
      },
      { type: "h2", text: "Products & pricing" },
      {
        type: "ul",
        items: [
          "Products are subject to availability",
          "Prices and promotions may change without notice",
          "Images are illustrative; packaging may vary",
        ],
      },
      { type: "h2", text: "Accounts" },
      {
        type: "p",
        text: "You are responsible for maintaining the confidentiality of your account credentials and for activity under your account.",
      },
      { type: "h2", text: "Limitation of liability" },
      {
        type: "p",
        text: "To the maximum extent permitted by law, Cyber Land is not liable for indirect or consequential damages arising from use of the site or products, except as required under applicable consumer law.",
      },
    ],
  },
  "shipping-policy": {
    title: "Shipping policy",
    blocks: [
      {
        type: "p",
        text: "We ship across Pakistan. Free shipping applies on orders above Rs. 1,000 (or as stated in current promotions).",
      },
      { type: "h2", text: "Processing" },
      {
        type: "ul",
        items: [
          "Orders typically process within 1–2 business days",
          "You will receive tracking once the shipment is handed to the courier",
        ],
      },
      { type: "h2", text: "Delivery" },
      {
        type: "ul",
        items: [
          "Delivery time depends on city and courier partner across Pakistan",
          "Track shipments anytime via Track Order",
        ],
      },
      {
        type: "cta",
        label: "Track Order",
        href: "/pages/track-order",
      },
    ],
  },
  "contact-information": {
    title: "Contact information",
    blocks: [
      {
        type: "p",
        text: "Cyber Land",
      },
      {
        type: "ul",
        items: [
          "Email: help@cyberland.com",
          "Phone: +92 345 8006009",
          "Hours: Mon – Sat, 10am – 7pm PKT",
          "Support: WhatsApp available during business hours",
        ],
      },
      {
        type: "cta",
        label: "Contact form page",
        href: "/pages/contact",
      },
    ],
  },
};
