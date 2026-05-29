"use client";

import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Trash2, Minus, Plus, ShoppingBag, ArrowLeft } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotal, clearCart } =
    useCartStore();
  const total = getTotal();
  const shipping = total > 500 ? 0 : 49.99;

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Cart" }]} />
          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingBag size={64} className="text-surface-dark mb-4" />
            <h1 className="text-2xl font-bold text-primary mb-2">
              Your Cart is Empty
            </h1>
            <p className="text-muted mb-6">
              Add some beautiful furniture to get started
            </p>
            <Link href="/products">
              <Button>Continue Shopping</Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: "Cart" }]} />
        <AnimatedSection className="mt-6 mb-8">
          <h1 className="text-3xl font-bold text-primary">Shopping Cart</h1>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2 space-y-4">
            <AnimatePresence>
              {items.map((item) => (
                <motion.div
                  key={item.product.id}
                  layout
                  exit={{ opacity: 0, x: -100 }}
                  className="bg-white rounded-xl p-4 sm:p-6 border border-surface-dark flex gap-4"
                >
                  <div className="relative w-24 h-24 sm:w-32 sm:h-32 rounded-lg overflow-hidden shrink-0 bg-surface">
                    <Image
                      src={item.product.images[0]}
                      alt={item.product.name}
                      fill
                      className="object-cover"
                      sizes="128px"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <div>
                        <p className="text-xs text-muted uppercase tracking-wide">
                          {item.product.category}
                        </p>
                        <h3 className="font-semibold text-primary truncate">
                          {item.product.name}
                        </h3>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-1.5 text-muted hover:text-danger transition-colors shrink-0"
                      >
                        <Trash2 size={16} />
                      </button>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <div className="flex items-center border border-surface-dark rounded-lg">
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity - 1
                            )
                          }
                          className="p-2 hover:bg-surface transition-colors"
                        >
                          <Minus size={14} />
                        </button>
                        <span className="w-10 text-center text-sm font-medium">
                          {item.quantity}
                        </span>
                        <button
                          onClick={() =>
                            updateQuantity(
                              item.product.id,
                              item.quantity + 1
                            )
                          }
                          className="p-2 hover:bg-surface transition-colors"
                        >
                          <Plus size={14} />
                        </button>
                      </div>
                      <p className="font-bold text-primary">
                        {formatPrice(item.product.price * item.quantity)}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            <Link
              href="/products"
              className="inline-flex items-center gap-2 text-sm text-accent hover:text-accent-dark transition-colors mt-4"
            >
              <ArrowLeft size={16} />
              Continue Shopping
            </Link>
          </div>

          {/* Order Summary */}
          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-xl p-6 border border-surface-dark sticky top-28">
              <h2 className="text-lg font-semibold text-primary mb-4">
                Order Summary
              </h2>
              <div className="space-y-3 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span className="font-medium">{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Shipping</span>
                  <span className="font-medium">
                    {shipping === 0 ? (
                      <span className="text-success">Free</span>
                    ) : (
                      formatPrice(shipping)
                    )}
                  </span>
                </div>
                {shipping > 0 && (
                  <p className="text-xs text-success">
                    Free shipping on orders over $500
                  </p>
                )}
                <div className="border-t border-surface-dark pt-3 flex justify-between">
                  <span className="font-semibold text-primary">Total</span>
                  <span className="font-bold text-lg text-primary">
                    {formatPrice(total + shipping)}
                  </span>
                </div>
              </div>
              <Link href="/checkout" className="block mt-6">
                <Button size="lg" className="w-full">
                  Proceed to Checkout
                </Button>
              </Link>
              <button
                onClick={clearCart}
                className="w-full mt-3 text-sm text-muted hover:text-danger transition-colors"
              >
                Clear Cart
              </button>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
