import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact Us",
  description:
    "Get in touch with WoodCraft. Send us a message, visit our showroom, or check our FAQ for common questions.",
  openGraph: {
    title: "Contact | WoodCraft Furniture",
    description:
      "Get in touch with WoodCraft. Send us a message, visit our showroom, or check our FAQ.",
  },
};

export default function ContactLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
