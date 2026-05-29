"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Check, CreditCard, Truck, Package } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { formatPrice } from "@/lib/utils";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import type { ShippingAddress, Order } from "@/types";

const shippingSchema = z.object({
  firstName: z.string().min(2),
  lastName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(10),
  address: z.string().min(5),
  city: z.string().min(2),
  state: z.string().min(2),
  zipCode: z.string().min(5),
});

type ShippingForm = z.infer<typeof shippingSchema>;

const steps = [
  { id: 1, label: "Shipping", icon: Truck },
  { id: 2, label: "Payment", icon: CreditCard },
  { id: 3, label: "Review", icon: Package },
];

export default function CheckoutPage() {
  const router = useRouter();
  const { items, getTotal, clearCart } = useCartStore();
  const addOrder = useAuthStore((s) => s.addOrder);
  const [currentStep, setCurrentStep] = useState(1);
  const [shippingData, setShippingData] = useState<ShippingForm | null>(null);
  const [processing, setProcessing] = useState(false);

  const total = getTotal();
  const shipping = total > 500 ? 0 : 49.99;
  const tax = total * 0.08;
  const grandTotal = total + shipping + tax;

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ShippingForm>({
    resolver: zodResolver(shippingSchema),
  });

  const onShippingSubmit = (data: ShippingForm) => {
    setShippingData(data);
    setCurrentStep(2);
  };

  const handlePayment = async () => {
    setCurrentStep(3);
  };

  const handleConfirmOrder = async () => {
    setProcessing(true);
    await new Promise((r) => setTimeout(r, 2000));

    const order: Order = {
      id: `ORD-${Date.now()}`,
      items: [...items],
      total: grandTotal,
      status: "processing",
      date: new Date().toISOString(),
      shippingAddress: shippingData!,
    };

    addOrder(order);
    clearCart();
    router.push("/orders");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen bg-surface flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            Your cart is empty
          </h1>
          <Button onClick={() => router.push("/products")}>
            Continue Shopping
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: "Cart", href: "/cart" }, { label: "Checkout" }]} />

        {/* Progress Steps */}
        <div className="flex items-center justify-center gap-4 mt-8 mb-12">
          {steps.map((step, i) => (
            <div key={step.id} className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <div
                  className={`w-10 h-10 rounded-full flex items-center justify-center font-medium text-sm transition-all ${
                    currentStep > step.id
                      ? "bg-success text-white"
                      : currentStep === step.id
                        ? "bg-accent text-white"
                        : "bg-surface-dark text-muted"
                  }`}
                >
                  {currentStep > step.id ? (
                    <Check size={16} />
                  ) : (
                    step.id
                  )}
                </div>
                <span
                  className={`text-sm font-medium hidden sm:inline ${
                    currentStep >= step.id ? "text-primary" : "text-muted"
                  }`}
                >
                  {step.label}
                </span>
              </div>
              {i < steps.length - 1 && (
                <div
                  className={`w-12 h-0.5 ${
                    currentStep > step.id ? "bg-success" : "bg-surface-dark"
                  }`}
                />
              )}
            </div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2">
            <AnimatePresence mode="wait">
              {currentStep === 1 && (
                <motion.div
                  key="shipping"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h2 className="text-xl font-semibold text-primary mb-6">
                    Shipping Information
                  </h2>
                  <form
                    onSubmit={handleSubmit(onShippingSubmit)}
                    className="bg-white rounded-xl p-6 border border-surface-dark space-y-4"
                  >
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="First Name"
                        error={errors.firstName?.message}
                        {...register("firstName")}
                      />
                      <Input
                        label="Last Name"
                        error={errors.lastName?.message}
                        {...register("lastName")}
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <Input
                        label="Email"
                        type="email"
                        error={errors.email?.message}
                        {...register("email")}
                      />
                      <Input
                        label="Phone"
                        type="tel"
                        error={errors.phone?.message}
                        {...register("phone")}
                      />
                    </div>
                    <Input
                      label="Address"
                      error={errors.address?.message}
                      {...register("address")}
                    />
                    <div className="grid grid-cols-3 gap-4">
                      <Input
                        label="City"
                        error={errors.city?.message}
                        {...register("city")}
                      />
                      <Input
                        label="State"
                        error={errors.state?.message}
                        {...register("state")}
                      />
                      <Input
                        label="ZIP Code"
                        error={errors.zipCode?.message}
                        {...register("zipCode")}
                      />
                    </div>
                    <Button type="submit" size="lg" className="w-full mt-4">
                      Continue to Payment
                    </Button>
                  </form>
                </motion.div>
              )}

              {currentStep === 2 && (
                <motion.div
                  key="payment"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h2 className="text-xl font-semibold text-primary mb-6">
                    Payment Method
                  </h2>
                  <div className="bg-white rounded-xl p-6 border border-surface-dark">
                    <div className="bg-surface rounded-xl p-8 text-center">
                      <CreditCard
                        size={48}
                        className="mx-auto text-accent mb-4"
                      />
                      <h3 className="text-lg font-semibold text-primary mb-2">
                        Simulated Payment
                      </h3>
                      <p className="text-sm text-muted mb-6">
                        This is a demo checkout. No real payment will be
                        processed.
                      </p>
                      <div className="bg-white rounded-lg p-4 border border-surface-dark max-w-sm mx-auto">
                        <div className="space-y-3">
                          <Input label="Card Number" placeholder="4242 4242 4242 4242" />
                          <div className="grid grid-cols-2 gap-3">
                            <Input label="Expiry" placeholder="12/28" />
                            <Input label="CVC" placeholder="123" />
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="flex gap-4 mt-6">
                      <Button
                        variant="ghost"
                        onClick={() => setCurrentStep(1)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        size="lg"
                        className="flex-1"
                        onClick={handlePayment}
                      >
                        Review Order
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}

              {currentStep === 3 && (
                <motion.div
                  key="review"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <h2 className="text-xl font-semibold text-primary mb-6">
                    Review Order
                  </h2>
                  <div className="bg-white rounded-xl p-6 border border-surface-dark space-y-6">
                    {/* Shipping */}
                    <div>
                      <h3 className="text-sm font-medium text-muted mb-2">
                        Shipping To
                      </h3>
                      <p className="text-sm text-primary">
                        {shippingData?.firstName} {shippingData?.lastName}
                        <br />
                        {shippingData?.address}
                        <br />
                        {shippingData?.city}, {shippingData?.state}{" "}
                        {shippingData?.zipCode}
                      </p>
                    </div>

                    {/* Items */}
                    <div>
                      <h3 className="text-sm font-medium text-muted mb-2">
                        Items ({items.length})
                      </h3>
                      {items.map((item) => (
                        <div
                          key={item.product.id}
                          className="flex justify-between py-2 border-b border-surface-dark last:border-0"
                        >
                          <span className="text-sm text-primary">
                            {item.product.name} x {item.quantity}
                          </span>
                          <span className="text-sm font-medium">
                            {formatPrice(item.product.price * item.quantity)}
                          </span>
                        </div>
                      ))}
                    </div>

                    <div className="flex gap-4">
                      <Button
                        variant="ghost"
                        onClick={() => setCurrentStep(2)}
                        className="flex-1"
                      >
                        Back
                      </Button>
                      <Button
                        size="lg"
                        className="flex-1"
                        onClick={handleConfirmOrder}
                        loading={processing}
                      >
                        {processing ? "Processing..." : "Place Order"}
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Summary Sidebar */}
          <AnimatedSection delay={0.1}>
            <div className="bg-white rounded-xl p-6 border border-surface-dark sticky top-28">
              <h2 className="text-lg font-semibold text-primary mb-4">
                Order Summary
              </h2>
              <div className="space-y-3">
                {items.map((item) => (
                  <div
                    key={item.product.id}
                    className="flex justify-between text-sm"
                  >
                    <span className="text-muted truncate mr-2">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="font-medium shrink-0">
                      {formatPrice(item.product.price * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-surface-dark mt-4 pt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-muted">Subtotal</span>
                  <span>{formatPrice(total)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Shipping</span>
                  <span>{shipping === 0 ? "Free" : formatPrice(shipping)}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-muted">Tax (8%)</span>
                  <span>{formatPrice(tax)}</span>
                </div>
                <div className="border-t border-surface-dark pt-2 flex justify-between font-bold text-primary">
                  <span>Total</span>
                  <span>{formatPrice(grandTotal)}</span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
