export type NavChild = {
  label: string;
  href: string;
};

export type NavItem = {
  label: string;
  href: string;
  children?: NavChild[];
};

/**
 * Primary desktop/mobile menu — exact order from live header.
 * Dropdowns: Shop by Setup, Software & Support only.
 */
export const mainNav: NavItem[] = [
  {
    label: "Laptops",
    href: "/collections/laptops",
    children: [
      { label: "New Laptops", href: "/collections/new-laptops" },
      { label: "Used Laptops", href: "/collections/used-laptops" },
      { label: "Gaming Laptops", href: "/collections/gaming-laptops" },
      {
        label: "Business Laptops & Ultrabooks",
        href: "/collections/business-laptops-ultrabooks",
      },
      {
        label: "Student & Budget Laptops",
        href: "/collections/student-budget-laptops",
      },
      { label: "Laptop Bags & Sleeves", href: "/collections/laptop-bags" },
      { label: "Laptop Cooling Pads", href: "/collections/laptop-coolers" },
      {
        label: "Laptop Chargers & GaN Adapters",
        href: "/collections/laptop-chargers-adapters",
      },
    ],
  },
  {
    label: "PC Components",
    href: "/collections/processors-cpu",
    children: [
      { label: "Processors (CPU)", href: "/collections/processors-cpu" },
      { label: "Intel Processors", href: "/collections/intel" },
      { label: "AMD Ryzen Processors", href: "/collections/amd" },
      { label: "Used / Tray CPUs", href: "/collections/used-tray-cpus" },
      { label: "Graphics Cards (GPU)", href: "/collections/graphics-cards-gpu" },
      { label: "New Graphics Cards", href: "/collections/new-graphics-cards" },
      { label: "Used Graphics Cards", href: "/collections/used-graphics-cards" },
      { label: "Motherboards", href: "/collections/motherboards" },
      { label: "Memory (RAM)", href: "/collections/memory-ram" },
      { label: "Storage (NVMe / SSD / HDD)", href: "/collections/storage" },
      { label: "Cooling Solutions & Fans", href: "/collections/cooling-solutions" },
      { label: "Power Supplies (PSU)", href: "/collections/power-supplies-psu" },
      { label: "Casing / Chassis", href: "/collections/casing-chassis" },
    ],
  },
  {
    label: "Desktop PCs",
    href: "/collections/desktop-pcs",
    children: [
      {
        label: "Prebuilt Gaming Desktops",
        href: "/collections/prebuilt-gaming-desktops",
      },
      { label: "Custom PC Build", href: "/collections/custom-pc-build" },
      { label: "Mini PCs", href: "/collections/mini-pcs" },
      { label: "All-in-One PCs", href: "/collections/all-in-one-pcs" },
      { label: "Workstations", href: "/collections/workstations" },
    ],
  },
  {
    label: "Apple Store",
    href: "/collections/apple-products",
    children: [
      { label: "MacBook Air & Pro", href: "/collections/macbook" },
      { label: "iMac 24-inch", href: "/collections/imac" },
      { label: "Mac Mini & Studio", href: "/collections/mac-mini" },
      { label: "iPad & iPad Pro", href: "/collections/ipad" },
      { label: "Apple Watch & Ultra", href: "/collections/apple-watch" },
      { label: "AirPods & Max", href: "/collections/airpods" },
      { label: "Apple Accessories", href: "/collections/apple-accessories" },
    ],
  },
  {
    label: "Gaming & VR",
    href: "/collections/gaming",
    children: [
      { label: "Gaming Consoles (PS5 / Xbox)", href: "/collections/gaming-consoles" },
      { label: "VR Headsets", href: "/collections/vr-headsets" },
      {
        label: "Controllers & Racing Wheels",
        href: "/collections/controllers-racing-wheels",
      },
      { label: "Gaming Chairs", href: "/collections/gaming-chairs" },
      { label: "Gaming Desks", href: "/collections/gaming-desks" },
    ],
  },
  {
    label: "Monitors & Peripherals",
    href: "/collections/monitors",
    children: [
      { label: "Gaming Monitors", href: "/collections/gaming-monitors" },
      { label: "Office & Business Monitors", href: "/collections/office-business-monitors" },
      { label: "Professional 4K Monitors", href: "/collections/professional-color-accurate-monitors" },
      { label: "Monitor Arms & Mounts", href: "/collections/monitor-arms-stands" },
      { label: "Mechanical Keyboards", href: "/collections/mechanical" },
      { label: "Gaming Mouse & Pads", href: "/collections/gaming-mouse-and-mousepad" },
      { label: "Webcams", href: "/collections/webcams" },
    ],
  },
  {
    label: "Audio & Networking",
    href: "/collections/audio",
    children: [
      { label: "Headphones & Headsets", href: "/collections/headphones-headsets" },
      { label: "Wireless Earbuds", href: "/collections/earbuds" },
      { label: "Streaming Microphones", href: "/collections/microphones" },
      { label: "PC & Bluetooth Speakers", href: "/collections/speakers" },
      { label: "Wi-Fi 6 Routers", href: "/collections/routers" },
      { label: "Mesh WiFi Systems", href: "/collections/mesh-wifi-systems" },
      { label: "Network Switches", href: "/collections/switches" },
    ],
  },
  {
    label: "Office & Power",
    href: "/collections/office-printing",
    children: [
      { label: "Printers (Inkjet & Laser)", href: "/collections/printers" },
      { label: "Scanners", href: "/collections/scanners" },
      { label: "Toners & Ink Refills", href: "/collections/toners-cartridges" },
      { label: "Projectors", href: "/collections/projectors" },
      { label: "UPS & Power Backup", href: "/collections/ups-power-backup" },
      { label: "Cables, Docks & Power Banks", href: "/collections/cables-adapters" },
    ],
  },
  { label: "Used / Open Box", href: "/collections/used-open-box" },
];

/** Mobile drawer extras after main nav (live: Wishlist only) */
export const mobileNavExtras: NavItem[] = [
  { label: "Wishlist", href: "/pages/wishlist" },
];

export const announcements = [
  {
    text: "ANZU V2 NEW LAUNCH",
    textMobile: "ANZU V2 NEW LAUNCH",
    href: "/products/anzu-v2-black-ultralight-ergonomic-wireless-gaming-mouse",
  },
  {
    text: "Freebies on orders above Rs.5000",
    textMobile: "Freebies on orders above 5000",
    href: null as string | null,
  },
  {
    text: "7 Days Returns and Replacement*",
    textMobile: "7 Days Return and Replacement*",
    href: "/pages/returns-exchanges",
  },
];

export const footerQuickLinks = [
  { label: "Downloads", href: "/pages/downloads" },
  { label: "FAQs", href: "/pages/faq" },
  { label: "Track Order", href: "/pages/track-order" },
  { label: "Returns & Exchanges", href: "/pages/returns-exchanges" },
  { label: "Warranty", href: "/pages/warranty-guidelines" },
  { label: "Contact Us", href: "/pages/contact" },
  { label: "Support", href: "/pages/support" },
  { label: "B2B Orders", href: "/pages/b2b-queries" },
  { label: "Creators Program", href: "/pages/creators-program" },
  {
    label: "Campus Ambassador Program",
    href: "/pages/campus-ambassador-program",
  },
  { label: "Blog", href: "/blogs/tech-blog" },
  { label: "All Collections", href: "/collections" },
];

export const footerSocials = [
  { label: "Facebook", href: "https://www.facebook.com/cyberlandpakistan" },
  { label: "Instagram", href: "https://www.instagram.com/cyberlandcomputers/" },
  { label: "WhatsApp", href: "https://wa.me/923458006009" },
];

export const footerPolicies = [
  { label: "Refund policy", href: "/policies/refund-policy" },
  { label: "Privacy policy", href: "/policies/privacy-policy" },
  { label: "Terms of service", href: "/policies/terms-of-service" },
  { label: "Shipping policy", href: "/policies/shipping-policy" },
  { label: "Contact information", href: "/policies/contact-information" },
];
