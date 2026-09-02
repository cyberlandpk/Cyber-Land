import type { Product, CollectionMeta } from "@/types";

export const products: Product[] = [];

export function getProductByHandle(handle: string): Product | undefined {
  return products.find((p) => p.handle === handle);
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
