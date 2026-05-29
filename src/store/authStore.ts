"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User, Order } from "@/types";

interface AuthStore {
  user: User | null;
  orders: Order[];
  login: (email: string, password: string) => boolean;
  register: (name: string, email: string, password: string) => boolean;
  logout: () => void;
  addOrder: (order: Order) => void;
  isAuthenticated: () => boolean;
}

const DEMO_USERS = [
  { id: "1", name: "John Doe", email: "john@example.com", password: "password123" },
  { id: "2", name: "Jane Smith", email: "jane@example.com", password: "password123" },
];

export const useAuthStore = create<AuthStore>()(
  persist(
    (set, get) => ({
      user: null,
      orders: [],

      login: (email, password) => {
        const found = DEMO_USERS.find(
          (u) => u.email === email && u.password === password
        );
        if (found) {
          set({ user: { id: found.id, name: found.name, email: found.email } });
          return true;
        }
        return false;
      },

      register: (name, email, password) => {
        const exists = DEMO_USERS.some((u) => u.email === email);
        if (exists) return false;

        const newUser: User = {
          id: String(Date.now()),
          name,
          email,
        };
        DEMO_USERS.push({ ...newUser, password });
        set({ user: newUser });
        return true;
      },

      logout: () => set({ user: null }),

      addOrder: (order) =>
        set((state) => ({ orders: [order, ...state.orders] })),

      isAuthenticated: () => get().user !== null,
    }),
    { name: "woodcraft-auth" }
  )
);
