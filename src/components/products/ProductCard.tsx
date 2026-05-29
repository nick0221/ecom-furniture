"use client";

import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";
import { Heart, ShoppingBag, Star } from "lucide-react";
import type { Product } from "@/types";
import { formatPrice, getDiscount } from "@/lib/utils";
import Badge from "@/components/ui/Badge";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useToastStore } from "@/components/ui/Toast";

interface ProductCardProps {
  product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
  const addItem = useCartStore((s) => s.addItem);
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } =
    useWishlistStore();
  const wishlisted = isInWishlist(product.id);
  const addToast = useToastStore((s) => s.addToast);

  return (
    <motion.div
      whileHover={{ y: -4 }}
      transition={{ duration: 0.2 }}
      className="group bg-white rounded-xl border border-surface-dark overflow-hidden shadow-sm hover:shadow-lg transition-shadow duration-300"
    >
      {/* Image */}
      <div className="relative aspect-square overflow-hidden bg-surface">
        <Image
          src={product.images[0]}
          alt={product.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
        />
        {product.originalPrice && (
          <div className="absolute top-3 left-3">
            <Badge variant="danger" size="sm">
              -{getDiscount(product.originalPrice, product.price)}%
            </Badge>
          </div>
        )}
        <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
          <button
            onClick={(e) => {
              e.preventDefault();
              if (wishlisted) {
                removeWishlist(product.id);
                addToast("Removed from wishlist", "wishlist");
              } else {
                addWishlist(product);
                addToast("Added to wishlist", "wishlist");
              }
            }}
            className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-surface transition-colors"
          >
            <Heart
              size={16}
              className={wishlisted ? "fill-danger text-danger" : "text-muted"}
            />
          </button>
          <button
            onClick={(e) => {
              e.preventDefault();
              addItem(product);
              addToast(`${product.name} added to cart`, "cart");
            }}
            className="w-9 h-9 bg-white rounded-full shadow-md flex items-center justify-center hover:bg-surface transition-colors"
          >
            <ShoppingBag size={16} className="text-muted" />
          </button>
        </div>
      </div>

      {/* Info */}
      <Link href={`/products/${product.slug}`} className="block p-4">
        <p className="text-xs text-muted uppercase tracking-wide mb-1">
          {product.category}
        </p>
        <h3 className="font-semibold text-primary mb-2 line-clamp-1 group-hover:text-accent-dark transition-colors">
          {product.name}
        </h3>
        <div className="flex items-center gap-1 mb-2">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              size={12}
              className={
                i < Math.floor(product.rating)
                  ? "fill-amber-400 text-amber-400"
                  : "text-surface-dark"
              }
            />
          ))}
          <span className="text-xs text-muted ml-1">
            ({product.reviewCount})
          </span>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-lg font-bold text-primary">
            {formatPrice(product.price)}
          </span>
          {product.originalPrice && (
            <span className="text-sm text-muted line-through">
              {formatPrice(product.originalPrice)}
            </span>
          )}
        </div>
      </Link>
    </motion.div>
  );
}
