"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import ProductGrid from "@/components/products/ProductGrid";

function ProductsSearch() {
  const searchParams = useSearchParams();
  const initialSearch = searchParams.get("search") || "";
  return <ProductGrid initialSearch={initialSearch} />;
}

export default function ProductsContent() {
  return (
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
      <ProductsSearch />
    </Suspense>
  );
}
