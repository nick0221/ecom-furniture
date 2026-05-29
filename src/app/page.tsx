import type { Metadata } from "next";
import Hero from "@/components/home/Hero";
import WhyChooseUs from "@/components/home/WhyChooseUs";
import Categories from "@/components/home/Categories";
import FeaturedProducts from "@/components/products/FeaturedProducts";
import BrandsTicker from "@/components/home/BrandsTicker";
import TestimonialCarousel from "@/components/home/TestimonialCarousel";
import InstagramGallery from "@/components/home/InstagramGallery";
import Newsletter from "@/components/home/Newsletter";

export const metadata: Metadata = {
  title: "WoodCraft | Premium Handcrafted Furniture",
  description:
    "Discover handcrafted furniture for modern living. Sofas, tables, chairs, beds, and storage — built to last with sustainable materials.",
};

export default function HomePage() {
  return (
    <>
      <Hero />
      <WhyChooseUs />
      <Categories />
      <FeaturedProducts />
      <BrandsTicker />
      <TestimonialCarousel />
      <InstagramGallery />
      <Newsletter />
    </>
  );
}
