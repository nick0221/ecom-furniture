import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/cart", "/checkout", "/orders", "/auth"],
      },
    ],
    sitemap: "https://woodcraft.vercel.app/sitemap.xml",
  };
}
