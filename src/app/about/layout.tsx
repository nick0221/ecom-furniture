import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us",
  description:
    "Learn about WoodCraft — our story, mission, values, and the team behind premium handcrafted furniture.",
  openGraph: {
    title: "About | WoodCraft Furniture",
    description:
      "Learn about WoodCraft — our story, mission, values, and the team behind premium handcrafted furniture.",
  },
};

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
