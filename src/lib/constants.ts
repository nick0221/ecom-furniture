export const SITE_NAME = "WoodCraft";
export const SITE_DESCRIPTION = "Premium handcrafted furniture for modern living";
export const SITE_URL = "http://localhost:3000";

export const NAV_LINKS = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop" },
  { href: "/about", label: "About" },
  { href: "/contact", label: "Contact" },
] as const;

export const PRICE_RANGES = [
  { label: "Under $500", min: 0, max: 500 },
  { label: "$500 - $1000", min: 500, max: 1000 },
  { label: "$1000 - $2000", min: 1000, max: 2000 },
  { label: "Over $2000", min: 2000, max: Infinity },
] as const;

export const SORT_OPTIONS = [
  { value: "newest", label: "Newest" },
  { value: "price-asc", label: "Price: Low to High" },
  { value: "price-desc", label: "Price: High to Low" },
  { value: "rating", label: "Highest Rated" },
] as const;

export const MATERIALS = [
  "Solid Oak",
  "Walnut",
  "Pine",
  "Teak",
  "Metal",
  "Upholstered",
] as const;

export const COLORS = [
  { name: "Natural", hex: "#C4A77D" },
  { name: "Dark Walnut", hex: "#5C4033" },
  { name: "White", hex: "#F5F5F5" },
  { name: "Black", hex: "#1A1A1A" },
  { name: "Grey", hex: "#8B8B8B" },
  { name: "Navy", hex: "#1B2A4A" },
] as const;
