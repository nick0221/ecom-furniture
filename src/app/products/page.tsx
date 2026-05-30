"use client";

import { Suspense } from "react";
import ProductGrid from "@/components/products/ProductGrid";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: "Shop" }]} />
        <AnimatedSection className="mt-6 mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">
            Our Collection
          </h1>
          <p className="text-muted mt-2">
            Discover furniture crafted with care and designed for living
          </p>
        </AnimatedSection>
        <ProductGrid />
      </div>
    </div>
  );
}
