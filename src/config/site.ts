export const siteConfig = {
  name: "Cyber Land",
  legalName: "Cyber Land",
  description:
    "Shop laptops, gaming PCs, computer hardware, keyboards, mice, monitors, and gaming accessories. Level Up Your Setup with Cyber Land.",
  url:
    process.env.NEXT_PUBLIC_SITE_URL ??
    (process.env.VERCEL_URL
      ? `https://${process.env.VERCEL_URL}`
      : "http://localhost:3000"),
  support: {
    email: "help@cyberland.pk",
    phone: "+92 345 8006009",
    phoneHref: "tel:+923458006009",
    whatsapp: "https://wa.me/923458006009",
    hours: "Mon - Sat : 10am - 7pm",
  },
  social: {
    facebook: "https://www.facebook.com/cyberlandpakistan",
    instagram: "https://www.instagram.com/cyberlandcomputers/",
    whatsapp: "https://wa.me/923458006009",
    x: "https://x.com/cyberland",
    youtube: "https://www.youtube.com/@CyberLand",
    discord: "https://discord.gg/uBn22bYTNB",
  },
  currency: "PKR" as const,
  locale: "en-PK" as const,
  freeShippingThreshold: 1000,
  trackOrderUrl: "/pages/track-order",
  defaultCountry: "Pakistan",
  paymentMethods: [
    "easypaisa",
    "jazzcash",
    "bank_transfer",
    "cod",
  ] as const,
} as const;
