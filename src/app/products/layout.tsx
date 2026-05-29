import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Shop Our Collection",
  description:
    "Browse our full collection of handcrafted furniture. Filter by category, material, color, and price to find your perfect piece.",
  openGraph: {
    title: "Shop | WoodCraft Furniture",
    description:
      "Browse our full collection of handcrafted furniture. Sofas, tables, chairs, beds, and more.",
  },
};

export default function ProductsLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
