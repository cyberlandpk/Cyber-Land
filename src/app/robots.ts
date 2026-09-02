import type { MetadataRoute } from "next";
import { siteConfig } from "@/config/site";

export default function robots(): MetadataRoute.Robots {
  const base = siteConfig.url.replace(/\/$/, "");
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        // Utility/private routes that shouldn't be indexed. These routes
        // exist in the app; there is no /api/ route group to disallow.
        disallow: ["/cart", "/checkout", "/account", "/search"],
      },
    ],
    sitemap: `${base}/sitemap.xml`,
  };
}
