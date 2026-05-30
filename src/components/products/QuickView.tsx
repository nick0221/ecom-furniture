"use client";

import { useState } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { X, Star, Minus, Plus, ShoppingBag, Heart } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import type { Product } from "@/types";
import { formatPrice, getDiscount } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useToastStore } from "@/components/ui/Toast";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";

interface QuickViewProps {
  product: Product;
  isOpen: boolean;
  onClose: () => void;
}

export default function QuickView({ product, isOpen, onClose }: QuickViewProps) {
  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const addItem = useCartStore((s) => s.addItem);
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } =
    useWishlistStore();
  const addToast = useToastStore((s) => s.addToast);
  const wishlisted = isInWishlist(product.id);

  if (typeof window === "undefined") return null;

  return createPortal(
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute inset-0 bg-black/50"
            onClick={onClose}
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative bg-white rounded-2xl shadow-xl w-full max-w-3xl max-h-[90vh] overflow-y-auto"
          >
            <button
              onClick={onClose}
              className="absolute top-4 right-4 z-10 p-1 bg-white/80 backdrop-blur rounded-full hover:bg-surface transition-colors"
            >
              <X size={18} />
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2">
              {/* Images */}
              <div className="relative aspect-square bg-surface">
                <Image
                  src={product.images[selectedImage]}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                {product.originalPrice && (
                  <div className="absolute top-3 left-3">
                    <Badge variant="danger">
                      -{getDiscount(product.originalPrice, product.price)}%
                    </Badge>
                  </div>
                )}
              </div>

              {/* Info */}
              <div className="p-6 flex flex-col">
                <div className="w-fit mb-3">
                  <Badge variant="accent">
                    {product.category}
                  </Badge>
                </div>
                <h2 className="text-xl font-bold text-primary mb-2">
                  {product.name}
                </h2>

                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={14}
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

                <div className="flex items-baseline gap-2 mb-4">
                  <span className="text-2xl font-bold text-primary">
                    {formatPrice(product.price)}
                  </span>
                  {product.originalPrice && (
                    <span className="text-sm text-muted line-through">
                      {formatPrice(product.originalPrice)}
                    </span>
                  )}
                </div>

                <p className="text-sm text-primary/60 leading-relaxed mb-6 line-clamp-3">
                  {product.description}
                </p>

                {/* Thumbnails */}
                <div className="flex gap-2 mb-6">
                  {product.images.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setSelectedImage(i)}
                      className={`relative w-14 h-14 rounded-lg overflow-hidden border-2 transition-all ${
                        selectedImage === i
                          ? "border-accent"
                          : "border-transparent hover:border-surface-dark"
                      }`}
                    >
                      <Image
                        src={img}
                        alt=""
                        fill
                        className="object-cover"
                        sizes="56px"
                      />
                    </button>
                  ))}
                </div>

                <div className="mt-auto flex items-center gap-3">
                  <div className="flex items-center border border-surface-dark rounded-lg">
                    <button
                      onClick={() => setQuantity(Math.max(1, quantity - 1))}
                      className="p-2 hover:bg-surface transition-colors"
                    >
                      <Minus size={14} />
                    </button>
                    <span className="w-10 text-center text-sm font-medium">
                      {quantity}
                    </span>
                    <button
                      onClick={() => setQuantity(quantity + 1)}
                      className="p-2 hover:bg-surface transition-colors"
                    >
                      <Plus size={14} />
                    </button>
                  </div>
                  <Button
                    className="flex-1"
                    onClick={() => {
                      addItem(product, quantity);
                      addToast(`${product.name} added to cart`, "cart");
                      onClose();
                    }}
                  >
                    <ShoppingBag size={16} className="mr-2" />
                    Add to Cart
                  </Button>
                  <button
                    onClick={() =>
                      wishlisted
                        ? removeWishlist(product.id)
                        : addWishlist(product)
                    }
                    className={`p-3 rounded-lg border-2 transition-all ${
                      wishlisted
                        ? "border-danger bg-red-50 text-danger"
                        : "border-surface-dark hover:border-muted"
                    }`}
                  >
                    <Heart
                      size={16}
                      className={wishlisted ? "fill-current" : ""}
                    />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>,
    document.body
  );
}
