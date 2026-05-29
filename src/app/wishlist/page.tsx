"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, ShoppingBag, Trash2 } from "lucide-react";
import { useWishlistStore } from "@/store/wishlistStore";
import { useCartStore } from "@/store/cartStore";
import { useToastStore } from "@/components/ui/Toast";
import { formatPrice } from "@/lib/utils";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function WishlistPage() {
  const { items, removeItem, clearWishlist } = useWishlistStore();
  const addItem = useCartStore((s) => s.addItem);
  const addToast = useToastStore((s) => s.addToast);

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Wishlist" }]} />
          <div className="flex flex-col items-center justify-center py-20">
            <Heart size={64} className="text-surface-dark mb-4" />
            <h1 className="text-2xl font-bold text-primary mb-2">
              Your Wishlist is Empty
            </h1>
            <p className="text-muted mb-6">
              Save items you love for later
            </p>
            <Link href="/products">
              <Button>Browse Collection</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: "Wishlist" }]} />
        <div className="flex items-center justify-between mt-6 mb-8">
          <h1 className="text-3xl font-bold text-primary">
            Wishlist ({items.length})
          </h1>
          <button
            onClick={clearWishlist}
            className="text-sm text-muted hover:text-danger transition-colors"
          >
            Clear All
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <AnimatePresence>
            {items.map((product) => (
              <motion.div
                key={product.id}
                layout
                exit={{ opacity: 0, scale: 0.9 }}
                className="bg-white rounded-xl border border-surface-dark overflow-hidden group"
              >
                <Link
                  href={`/products/${product.slug}`}
                  className="relative aspect-square block overflow-hidden bg-surface"
                >
                  <Image
                    src={product.images[0]}
                    alt={product.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-500"
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
                </Link>
                <div className="p-4">
                  <p className="text-xs text-muted uppercase tracking-wide mb-1">
                    {product.category}
                  </p>
                  <Link
                    href={`/products/${product.slug}`}
                    className="font-semibold text-primary hover:text-accent-dark transition-colors line-clamp-1"
                  >
                    {product.name}
                  </Link>
                  <p className="text-accent font-bold mt-2">
                    {formatPrice(product.price)}
                  </p>
                  <div className="flex gap-2 mt-4">
                    <Button
                      size="sm"
                      className="flex-1"
                      onClick={() => {
                        addItem(product);
                        addToast(`${product.name} added to cart`, "cart");
                      }}
                    >
                      <ShoppingBag size={14} className="mr-1.5" />
                      Add to Cart
                    </Button>
                    <button
                      onClick={() => {
                        removeItem(product.id);
                        addToast("Removed from wishlist", "wishlist");
                      }}
                      className="p-2.5 rounded-lg border border-surface-dark hover:border-danger hover:bg-red-50 text-muted hover:text-danger transition-all"
                    >
                      <Trash2 size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
