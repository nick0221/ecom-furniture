import { Suspense } from "react";
import ProductsContent from "./ProductsContent";

export default function ProductsPage() {
  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <nav className="flex items-center gap-1.5 text-sm text-muted mb-6">
          <a href="/" className="hover:text-primary transition-colors">Home</a>
          <span>/</span>
          <span className="text-primary font-medium">Shop</span>
        </nav>
        <div className="mb-8">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">
            Our Collection
          </h1>
          <p className="text-muted mt-2">
            Discover furniture crafted with care and designed for living
          </p>
        </div>
        <ProductsContent />
      </div>
    </div>
  );
}
