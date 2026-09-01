import HeroSlider from "@/components/sections/HeroSlider";
import ShopTheLook from "@/components/sections/ShopTheLook";
import ProductSection from "@/components/sections/ProductSection";
import { woocommerceService } from "@/services/woocommerce.service";
import type { Product } from "@/types";

export const dynamic = "force-dynamic";
export const revalidate = 0;

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
