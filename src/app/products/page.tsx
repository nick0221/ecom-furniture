"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
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
        <Suspense
          fallback={
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="bg-white rounded-xl overflow-hidden">
                  <div className="aspect-square animate-shimmer" />
                  <div className="p-4 space-y-3">
                    <div className="h-4 w-3/4 animate-shimmer rounded" />
                    <div className="h-3 w-1/2 animate-shimmer rounded" />
                  </div>
                </div>
              ))}
            </div>
          }
        >
          <ProductGridWrapper />
        </Suspense>
      </div>
    </div>
  );
}

function ProductGridWrapper() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  return <ProductGrid initialSearch={initialSearch} />;
}
