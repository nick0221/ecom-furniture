"use client";

import Image from "next/image";
import { Camera } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

const galleryImages = [
  {
    src: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=400",
    alt: "Living room setup",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=400",
    alt: "Industrial table",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=400",
    alt: "Bedroom design",
    span: "col-span-1 row-span-2",
  },
  {
    src: "https://images.unsplash.com/photo-1580480055273-228ff5388ef8?w=400",
    alt: "Accent chair",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1493663284031-b7e3aefcae8e?w=400",
    alt: "Cozy corner",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=400",
    alt: "Wood detail",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1540574163026-643ea20ade25?w=400",
    alt: "Sofa styling",
    span: "col-span-1 row-span-1",
  },
  {
    src: "https://images.unsplash.com/photo-1588046130717-0eb0c9a3ba15?w=400",
    alt: "Nightstand decor",
    span: "col-span-1 row-span-1",
  },
];

export default function InstagramGallery() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-10">
          <div className="inline-flex items-center gap-2 mb-3">
            <Camera size={20} className="text-accent" />
            <span className="text-accent font-medium tracking-wide uppercase text-sm">
              @woodcraft
            </span>
          </div>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">
            Follow Our Journey
          </h2>
          <p className="text-muted mt-2">
            Tag us in your space for a chance to be featured
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
          {galleryImages.map((img, i) => (
            <AnimatedSection
              key={i}
              delay={i * 0.06}
              className={`relative group overflow-hidden rounded-xl ${img.span} ${
                img.span.includes("row-span-2") ? "row-span-2" : ""
              }`}
            >
              <div className="relative w-full h-full min-h-[180px] sm:min-h-[220px]">
                <Image
                  src={img.src}
                  alt={img.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                />
                <div className="absolute inset-0 bg-primary/0 group-hover:bg-primary/50 transition-all duration-300 flex items-center justify-center">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    <Camera size={24} className="text-white" />
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
