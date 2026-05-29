"use client";

import Image from "next/image";
import Link from "next/link";
import { categories } from "@/data/categories";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Categories() {
  return (
    <section className="py-20 bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <p className="text-accent font-medium tracking-wide uppercase text-sm mb-2">
            Browse by Category
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">
            Find Your Perfect Piece
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
          {categories.map((category, i) => (
            <AnimatedSection key={category.id} delay={i * 0.1}>
              <Link
                href={`/products?category=${category.slug}`}
                className="group relative aspect-square rounded-xl overflow-hidden block"
              >
                <Image
                  src={category.image}
                  alt={category.name}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 640px) 50vw, 20vw"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4">
                  <h3 className="text-white font-semibold text-lg">
                    {category.name}
                  </h3>
                  <p className="text-white/60 text-sm">
                    {category.productCount} products
                  </p>
                </div>
              </Link>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
