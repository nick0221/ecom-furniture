import type { Category } from "@/types";

export const categories: Category[] = [
  {
    id: "1",
    name: "Sofas",
    slug: "sofas",
    image: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600",
    description: "Comfortable seating for your living room",
    productCount: 2,
  },
  {
    id: "2",
    name: "Tables",
    slug: "tables",
    image: "https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=600",
    description: "Dining, coffee, and side tables",
    productCount: 4,
  },
  {
    id: "3",
    name: "Chairs",
    slug: "chairs",
    image: "https://images.unsplash.com/photo-1503602642458-232111445657?w=600",
    description: "Dining chairs, accent chairs, and more",
    productCount: 3,
  },
  {
    id: "4",
    name: "Beds",
    slug: "beds",
    image: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=600",
    description: "Bed frames and headboards",
    productCount: 1,
  },
  {
    id: "5",
    name: "Storage",
    slug: "storage",
    image: "https://images.unsplash.com/photo-1594620302200-9a762244a156?w=600",
    description: "Bookshelves, wardrobes, and nightstands",
    productCount: 4,
  },
];

export const getCategoryBySlug = (slug: string) =>
  categories.find((c) => c.slug === slug);
