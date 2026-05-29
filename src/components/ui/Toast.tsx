"use client";

import { create } from "zustand";
import { useEffect, useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Check, Heart, ShoppingBag, X } from "lucide-react";

interface Toast {
  id: string;
  message: string;
  type: "cart" | "wishlist" | "success";
}

interface ToastStore {
  toasts: Toast[];
  addToast: (message: string, type?: Toast["type"]) => void;
  removeToast: (id: string) => void;
}

export const useToastStore = create<ToastStore>()((set) => ({
  toasts: [],
  addToast: (message, type = "success") => {
    const id = crypto.randomUUID();
    set((state) => ({ toasts: [...state.toasts, { id, message, type }] }));
    setTimeout(() => {
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id),
      }));
    }, 3000);
  },
  removeToast: (id) =>
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) })),
}));

const iconMap = {
  cart: <ShoppingBag size={16} />,
  wishlist: <Heart size={16} />,
  success: <Check size={16} />,
};

const colorMap = {
  cart: "bg-primary text-white",
  wishlist: "bg-danger text-white",
  success: "bg-success text-white",
};

export function ToastContainer() {
  const { toasts, removeToast } = useToastStore();

  return (
    <div className="fixed bottom-6 right-6 z-[200] flex flex-col gap-3 pointer-events-none">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 100, scale: 0.95 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl shadow-lg pointer-events-auto ${colorMap[toast.type]}`}
          >
            {iconMap[toast.type]}
            <span className="text-sm font-medium whitespace-nowrap">
              {toast.message}
            </span>
            <button
              onClick={() => removeToast(toast.id)}
              className="ml-1 p-0.5 hover:opacity-70 transition-opacity"
            >
              <X size={14} />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
