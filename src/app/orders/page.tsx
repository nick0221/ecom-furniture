"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { Package, ArrowRight, ShoppingBag } from "lucide-react";
import { useAuthStore } from "@/store/authStore";
import { formatPrice } from "@/lib/utils";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Button from "@/components/ui/Button";
import Badge from "@/components/ui/Badge";
import AnimatedSection from "@/components/ui/AnimatedSection";

const statusColors: Record<string, "default" | "success" | "warning" | "accent"> = {
  pending: "warning",
  processing: "accent",
  shipped: "accent",
  delivered: "success",
};

export default function OrdersPage() {
  const { user, orders } = useAuthStore();

  if (!user) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <Package size={64} className="mx-auto text-surface-dark mb-4" />
          <h1 className="text-2xl font-bold text-primary mb-2">
            Sign In to View Orders
          </h1>
          <p className="text-muted mb-6">
            Access your order history by signing in to your account
          </p>
          <Link href="/auth/login">
            <Button>Sign In</Button>
          </Link>
        </div>
      </div>
    );
  }

  if (orders.length === 0) {
    return (
      <div className="min-h-screen bg-surface">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Breadcrumb items={[{ label: "Orders" }]} />
          <div className="flex flex-col items-center justify-center py-20">
            <ShoppingBag size={64} className="text-surface-dark mb-4" />
            <h1 className="text-2xl font-bold text-primary mb-2">
              No Orders Yet
            </h1>
            <p className="text-muted mb-6">
              Start shopping to see your orders here
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
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: "Orders" }]} />
        <AnimatedSection className="mt-6 mb-8">
          <h1 className="text-3xl font-bold text-primary">Your Orders</h1>
          <p className="text-muted mt-1">
            {orders.length} order{orders.length !== 1 ? "s" : ""} total
          </p>
        </AnimatedSection>

        <div className="space-y-4">
          {orders.map((order, i) => (
            <AnimatedSection key={order.id} delay={i * 0.1}>
              <div className="bg-white rounded-xl border border-surface-dark p-6">
                <div className="flex flex-wrap items-center justify-between gap-3 mb-4">
                  <div>
                    <p className="text-sm text-muted">Order {order.id}</p>
                    <p className="text-sm text-muted">
                      {new Date(order.date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </p>
                  </div>
                  <Badge variant={statusColors[order.status]} size="md">
                    {order.status.charAt(0).toUpperCase() + order.status.slice(1)}
                  </Badge>
                </div>

                <div className="space-y-2 mb-4">
                  {order.items.map((item) => (
                    <div
                      key={item.product.id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-primary/70">
                        {item.product.name} x{item.quantity}
                      </span>
                      <span className="font-medium">
                        {formatPrice(item.product.price * item.quantity)}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="flex items-center justify-between pt-4 border-t border-surface-dark">
                  <span className="font-bold text-primary">
                    Total: {formatPrice(order.total)}
                  </span>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </div>
  );
}
