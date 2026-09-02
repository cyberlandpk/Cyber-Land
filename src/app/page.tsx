import HeroSlider from "@/components/sections/HeroSlider";
import CategoryGrid from "@/components/sections/CategoryGrid";
import ShopTheLook from "@/components/sections/ShopTheLook";
import ProductSection from "@/components/sections/ProductSection";
import { woocommerceService } from "@/services/woocommerce.service";
import type { Metadata } from "next";
import type { Product } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export const metadata: Metadata = {
  alternates: {
    canonical: "/",
  },
};

export default async function HomePage() {
  let liveProducts: Product[] = [];
  if (woocommerceService.isConfigured()) {
    try {
      liveProducts = await woocommerceService.getProducts();
    } catch (err) {
      console.warn("WooCommerce live fetch error:", err);
    }
  }

  return (
    <>
      <HeroSlider />
      <CategoryGrid />
      {liveProducts.length > 0 && (
        <ProductSection
          title="Featured Products"
          products={liveProducts}
          id="featured-products"
        />
      )}
      <ShopTheLook />
    </>
  );
}
