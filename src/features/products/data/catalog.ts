import type { Category, CollectionMeta, HeroSlide, Product } from "@/types";

const CDN = "https://cdn.shopify.com/s/files/1/0619/4325/1121";

export const products: Product[] = [
  {
    id: "1",
    handle: "hive75-v2-black-purple-wired-mechanical-gaming-keyboard",
    title: "Hive75 V2 Black Red Wired Mechanical Gaming Keyboard",
    price: 3199,
    compareAtPrice: 4600,
    image: "/images/hive75-red.png",
    rating: 4.7,
    reviewCount: 128,
    available: true,
    hasVariants: true,
    collection: ["mechanical-keyboards", "best-sellers", "new-launches"],
    description:
      "The Hive75 V2 brings premium tactile feedback, hot-swappable switches, and a striking black-red aesthetic built for competitive gaming.",
    tags: ["keyboard", "mechanical", "wired", "75%"],
  },
  {
    id: "7",
    handle: "anzu-v2-white-ultralight-ergonomic-wireless-gaming-mouse",
    title: "Anzu V2 White Crimson Ultralight Ergonomic Wireless Gaming Mouse",
    price: 2999,
    compareAtPrice: 4999,
    image: "/images/anzu-v2-white-crimson.png",
    available: true,
    hasVariants: false,
    collection: ["gaming-mouse-and-mousepad", "new-launches", "best-sellers"],
    description:
      "Anzu V2 Crimson — ultralight ergonomic wireless mouse engineered for precision and all-day comfort.",
    tags: ["mouse", "wireless", "ultralight"],
    badge: "NEW",
  },
  {
    id: "8",
    handle: "anzu-v2-black-ultralight-ergonomic-wireless-gaming-mouse",
    title: "Anzu V2 Black Crimson Ultralight Ergonomic Wireless Gaming Mouse",
    price: 2999,
    compareAtPrice: 4999,
    image: "/images/anzu-v2-black-crimson.png",
    available: true,
    hasVariants: false,
    collection: ["gaming-mouse-and-mousepad", "new-launches", "best-sellers"],
    description:
      "Anzu V2 Black Crimson — the same ultralight ergonomic performance in stealth black and crimson red.",
    tags: ["mouse", "wireless", "ultralight"],
    badge: "NEW",
  },
  {
    id: "12",
    handle: "altus-ergo-gaming-chair",
    title: "Altus Ergonomic Chair",
    price: 11899,
    compareAtPrice: 30000,
    image: `${CDN}/files/Frame_1000007208_1.png?v=1782288760&width=1080`,
    rating: 4.7,
    reviewCount: 156,
    available: true,
    hasVariants: true,
    collection: ["ergo-wfh-chairs", "best-sellers", "work-from-home-pro"],
    description:
      "Altus ergonomic WFH chair with lumbar support, adjustable armrests, and premium build for marathon sessions.",
    tags: ["chair", "ergonomic"],
  },
  {
    id: "13",
    handle: "obsidian-27-inch-gaming-monitor",
    title: 'Obsidian 27" 200Hz 2K 1440p QHD Gaming IPS Monitor',
    price: 15599,
    compareAtPrice: 30000,
    image: `${CDN}/files/hero_.bip.1726_1.png?v=1782291903&width=1200`,
    rating: 4.8,
    reviewCount: 48,
    available: true,
    hasVariants: false,
    collection: ["monitors", "best-sellers", "gamers-essentials"],
    description:
      "27-inch QHD IPS panel at 200Hz. Blistering refresh for competitive gaming and crisp content creation.",
    tags: ["monitor", "2k", "200hz"],
  },
];

/**
 * Homepage slideshow image metadata
 * Desktop + mobile variants as used by the live Shopify theme.
 * Local copies under /public/hero for reliable loading; CDN fallbacks too.
 */
export const heroSlides: HeroSlide[] = [
  {
    id: 1,
    image: "/hero/anzu-desktop.png",
    mobileImage: "/hero/anzu-mobile.png",
    href: "/products/anzu-v2-black-ultralight-ergonomic-wireless-gaming-mouse",
    alt: "Anzu V2 New Launch — Ultralight Wireless Performance Mouse",
  },
  {
    id: 2,
    image: "/hero/monitors-desktop.png",
    mobileImage: "/hero/monitors-mobile.png",
    href: "/collections/monitors",
    alt: "Cyber Land Monitors",
  },
  {
    id: 3,
    image: "/hero/arma-desktop.png",
    mobileImage: "/hero/arma-mobile.png",
    href: "/products/arma-black-ultralight-gaming-mouse",
    alt: "Arma Ultralight Mouse",
  },
  {
    id: 4,
    image: "/hero/hive75-desktop.png",
    mobileImage: "/hero/hive75-mobile.png",
    href: "/products/hive75-v2-black-purple-wired-mechanical-gaming-keyboard",
    alt: "Hive75 V2 Keyboard",
  },
];

/** CDN originals (same files as live site) — used if local hero assets missing */
export const heroSlidesCdn: HeroSlide[] = [
  {
    id: 1,
    image: `${CDN}/files/banner3.png?v=1780407525&width=2400`,
    mobileImage: `${CDN}/files/banner3mob.png?v=1780407526&width=1000`,
    href: "/products/anzu-v2-black-ultralight-ergonomic-wireless-gaming-mouse",
    alt: "Anzu V2 New Launch",
  },
  {
    id: 2,
    image: `${CDN}/files/Frame_1000007627.png?v=1775107034&width=2400`,
    mobileImage: `${CDN}/files/qpricedark1.1.png?v=1775107035&width=1000`,
    href: "/collections/monitors",
    alt: "Cyber Land Monitors",
  },
  {
    id: 3,
    image: `${CDN}/files/Frame_1000007021.png?v=1774432814&width=2400`,
    mobileImage: `${CDN}/files/desktop_banner_26.png?v=1774432814&width=1000`,
    href: "/products/arma-black-ultralight-gaming-mouse",
    alt: "Arma Ultralight Mouse",
  },
  {
    id: 4,
    image: `${CDN}/files/banner2_258c725b-501e-4498-9759-592ab720acef.png?v=1781176454&width=2400`,
    mobileImage: `${CDN}/files/banner2mob.png?v=1781176454&width=1000`,
    href: "/products/hive75-v2-black-purple-wired-mechanical-gaming-keyboard",
    alt: "Hive75 V2 Keyboard",
  },
];

export const categories: Category[] = [
  {
    title: "Laptops",
    href: "/collections/laptops",
    image: "/files/laptop_transparent.png",
  },
  {
    title: "Keyboards",
    href: "/collections/mechanical-keyboards",
    image: `${CDN}/collections/V2.png?v=1762756494&width=1200`,
  },
  {
    title: "Gaming Mouse",
    href: "/collections/gaming-mouse-and-mousepad",
    image: `${CDN}/collections/Untitled-4.png?v=1762756477&width=1200`,
  },
  {
    title: "Ergonomic WFH Chairs",
    href: "/collections/ergo-wfh-chairs",
    image: `${CDN}/files/d0d80cd6b35848f887490cb1dd8c5dc8.thumbnail.0000000000.jpg?v=1765198104&width=1080`,
  },
  {
    title: "Audio & Video Devices",
    href: "/collections/audio-video-and-lights",
    image: `${CDN}/collections/untitled.317_1_8b8ac6dd-aa76-4f9a-a0d9-aa6d6f437555.png?v=1762756614&width=1200`,
  },
  {
    title: "All products",
    subtitle: "Check out all our products",
    href: "/collections/shop-all",
    image: `${CDN}/files/all_products.png?v=1737708521&width=1200`,
  },
];

/** Live site Shop the Look scene + product handles (order matches hotspots 1–4) */
export const shopTheLookImage =
  "/shop-the-look/scene.png";

export const shopTheLookImageCdn = `${CDN}/files/Shopthelook2_8012997e-10aa-4148-97f2-fce2fce01b74.png?v=1771593801&width=1920`;

export const shopTheLookProducts = [
  "altus-ergo-gaming-chair",
  "anzu-v2-white-ultralight-ergonomic-wireless-gaming-mouse",
  "obsidian-27-inch-gaming-monitor",
  "swarm-white-purple-wireless-gaming-keyboard",
] as const;

export const instagramPosts = [
  {
    image: `${CDN}/files/ST.jpg?v=1771234439&width=600`,
    caption: "From a Bollywood Mom's favorite brand to next-gen keyboards",
  },
  {
    image: `${CDN}/files/Image-62.jpg?v=1771244720&width=600`,
    caption: "It's more than you think",
  },
  {
    image: `${CDN}/files/Image-993.jpg?v=1771245310&width=600`,
    caption: "Naruto x Cyber Land Gaming Keyboard Unboxing",
  },
  {
    image: `${CDN}/files/Image-906.jpg?v=1771245533&width=600`,
    caption: "COME LET's UNBOX MY TRIPOD!",
  },
  {
    image: `${CDN}/files/Image-749.jpg?v=1771245792&width=600`,
    caption: "CYBER LAND CHIMERA V2 Unboxing & Review",
  },
  {
    image: `${CDN}/files/Image-511.jpg?v=1771244884&width=600`,
    caption: "Meet the Cyber Land Swarm 65",
  },
];

export const logoUrl = "/brand/cyber-land-icon.png";
export const logoWhiteUrl = "/brand/cyber-land-icon.png";

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
}

export function getRelatedProducts(product: Product, limit = 4): Product[] {
  return products
    .filter(
      (p) =>
        p.id !== product.id &&
        p.collection.some((c) => product.collection.includes(c))
    )
    .slice(0, limit);
}




export const collectionMeta: Record<string, CollectionMeta> = {
  "best-sellers": {
    title: "Bestsellers",
    description: "Our most loved gear, trusted by creators and gamers.",
  },
  "mechanical-keyboards": {
    title: "Keyboards",
    description: "Mechanical keyboards engineered for performance and style.",
  },
  "gaming-mouse-and-mousepad": {
    title: "Mouse and Mousepads",
    description: "Ultralight and precision wireless gaming mice and pads.",
  },
  "mouse-and-mousepads": {
    title: "Mouse",
    description: "Performance gaming mice for every playstyle.",
  },
  "ergo-wfh-chairs": {
    title: "Ergonomic Chairs",
    description: "Chairs built for long sessions and better posture.",
  },
  "audio-video-and-lights": {
    title: "Audio Video and Lights",
    description: "Mics, webcams, and audio gear for creators.",
  },
  monitors: {
    title: "Monitors",
    description: "High-refresh gaming and creator monitors.",
  },
  laptops: {
    title: "Laptops",
    description:
      "Gaming, creator, and everyday laptops engineered for performance.",
  },
  "new-laptops": {
    title: "New Laptops",
    description: "Brand new gaming, creator, and performance laptops.",
  },
  "used-laptops": {
    title: "Used Laptops",
    description:
      "Certified pre-owned and refurbished laptops tested for peak performance.",
  },
  cpu: {
    title: "CPU & Processors",
    description: "High-performance gaming and desktop processors.",
  },
  "new-cpu": {
    title: "New CPU",
    description: "Brand new boxed processors for gaming and workstations.",
  },
  "used-cpu": {
    title: "Used CPU",
    description: "Tested and certified pre-owned processors.",
  },
  "new-launches": {
    title: "New Launches",
    description: "The latest from Cyber Land.",
  },
  controllers: {
    title: "Controllers",
    description: "Gaming controllers for every setup.",
  },
  "gaming-controller": {
    title: "Gaming Controller",
    description: "Precision controllers built for competitive play.",
  },
  "shop-all": {
    title: "Shop All",
    description: "Check out all our products.",
  },
  all: {
    title: "All products",
    description: "Browse the complete Cyber Land catalog.",
  },
  "pc-builder-starter-kit": {
    title: "PC Builder Starter Kit",
    description: "Everything you need to start your PC build.",
  },
  "work-from-home-pro": {
    title: "Office Essentials",
    description: "Gear for productive WFH and office setups.",
  },
  "streamers-essential": {
    title: "Streamers Essential",
    description: "Must-have gear for streamers.",
  },
  streaming: {
    title: "Streaming",
    description: "Cameras, mics, and tools for live streaming.",
  },
  "gamers-essentials": {
    title: "Gamers Essentials",
    description: "Core gaming gear curated for performance.",
  },
  "gaming-gear": {
    title: "Gaming",
    description: "Keyboards, mice, and controllers for gamers.",
  },
  accessories: {
    title: "Accessories",
    description: "Essential accessories to complete your setup.",
  },
  "back-in-stock": {
    title: "Back In Stock",
    description: "Popular Cyber Land products that are available again.",
  },
  "best-deals-under-1999": {
    title: "Best Deals under Rs.1999",
    description: "Top picks under Rs. 1,999.",
  },
  "end-of-season-sale": {
    title: "EOSS All Deals",
    description: "End of season sale — biggest discounts on Cyber Land gear.",
  },
  "freebie-eligible": {
    title: "Freebie Eligible",
    description: "Products eligible for freebies on qualifying orders.",
  },
  "naruto-collab": {
    title: "Cyber Land X Naruto",
    description: "Limited collab gear inspired by Naruto.",
  },
  "payday-sale": {
    title: "PAYDAY SALE",
    description: "Payday specials on gaming and creator gear.",
  },
  products: {
    title: "Products",
    description: "Featured Cyber Land products.",
  },
  "shark-sale": {
    title: "Shark Sale",
    description: "Shark Sale deals across the catalog.",
  },
  "shop-best-sale-deals": {
    title: "Shop Best Sale Deals",
    description: "Hand-picked best sale deals right now.",
  },
  "summer-sale": {
    title: "Summer Sale",
    description: "Summer Sale savings on Cyber Land gear.",
  },
};

/** Resolve products for any collection handle (tag match + smart filters). */
export function getProductsByCollection(_handle: string): Product[] {
  // Empty array for collection pages until WooCommerce is connected
  return [];
}
