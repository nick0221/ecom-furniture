"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { getFeaturedProducts } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function FeaturedProducts() {
  const featured = getFeaturedProducts();

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <p className="text-accent font-medium tracking-wide uppercase text-sm mb-2">
            Our Collection
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">
            Featured Products
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {featured.map((product, i) => (
            <AnimatedSection key={product.id} delay={i * 0.1}>
              <Link href={`/products/${product.slug}`} className="group block">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-surface mb-4">
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                  />
                </div>
                <h3 className="font-semibold text-primary group-hover:text-accent-dark transition-colors mb-1">
                  {product.name}
                </h3>
                <p className="text-accent font-bold">{formatPrice(product.price)}</p>
              </Link>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-10">
          <Link
            href="/products"
            className="inline-flex items-center gap-2 text-primary font-medium hover:text-accent-dark transition-colors group"
          >
            View All Products
            <ArrowRight
              size={18}
              className="group-hover:translate-x-1 transition-transform"
            />
          </Link>
        </AnimatedSection>
      </div>
    </section>
  );
}
