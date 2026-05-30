"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import {
  ShoppingBag,
  Menu,
  X,
  User,
  Search,
  ArrowRight,
  Star,
  Heart,
} from "lucide-react";
import { NAV_LINKS, SITE_NAME } from "@/lib/constants";
import { useCartStore } from "@/store/cartStore";
import { useAuthStore } from "@/store/authStore";
import { products } from "@/data/products";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [mounted, setMounted] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const itemCount = useCartStore((s) => s.getItemCount());
  const user = useAuthStore((s) => s.user);

  useEffect(() => setMounted(true), []);

  const results =
    query.trim().length >= 2
      ? products
          .filter(
            (p) =>
              p.name.toLowerCase().includes(query.toLowerCase()) ||
              p.category.toLowerCase().includes(query.toLowerCase()) ||
              p.material.toLowerCase().includes(query.toLowerCase()) ||
              p.tags.some((t) =>
                t.toLowerCase().includes(query.toLowerCase())
              )
          )
          .slice(0, 6)
      : [];

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (searchOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [searchOpen]);

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        searchRef.current &&
        !searchRef.current.contains(e.target as Node)
      ) {
        setSearchOpen(false);
        setQuery("");
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-surface-dark"
          : "bg-transparent"
      )}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 lg:h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 shrink-0">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg">W</span>
            </div>
            <span className="text-xl font-bold text-primary">{SITE_NAME}</span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="text-primary/70 hover:text-primary transition-colors duration-200 font-medium"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Search */}
            <div ref={searchRef} className="relative">
              <button
                onClick={() => setSearchOpen(!searchOpen)}
                className="p-2 text-primary/70 hover:text-primary transition-colors"
              >
                <Search size={20} />
              </button>

              <AnimatePresence>
                {searchOpen && (
                  <motion.div
                    initial={{ opacity: 0, y: -10, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: -10, scale: 0.95 }}
                    transition={{ duration: 0.2 }}
                    className="absolute right-0 top-full mt-2 w-[90vw] sm:w-[420px] bg-white rounded-xl shadow-xl border border-surface-dark overflow-hidden"
                  >
                    {/* Search Input */}
                    <div className="flex items-center gap-3 px-4 py-3 border-b border-surface-dark">
                      <Search size={18} className="text-muted shrink-0" />
                      <input
                        ref={inputRef}
                        type="text"
                        placeholder="Search furniture..."
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        className="flex-1 text-sm text-primary placeholder:text-muted outline-none"
                      />
                      {query && (
                        <button
                          onClick={() => setQuery("")}
                          className="text-muted hover:text-primary"
                        >
                          <X size={16} />
                        </button>
                      )}
                    </div>

                    {/* Results */}
                    <div className="max-h-[400px] overflow-y-auto">
                      {query.trim().length < 2 ? (
                        <div className="px-4 py-8 text-center text-sm text-muted">
                          Type at least 2 characters to search...
                        </div>
                      ) : results.length === 0 ? (
                        <div className="px-4 py-8 text-center text-sm text-muted">
                          No products found for &ldquo;{query}&rdquo;
                        </div>
                      ) : (
                        <div className="py-2">
                          {results.map((product) => (
                            <Link
                              key={product.id}
                              href={`/products/${product.slug}`}
                              onClick={() => {
                                setSearchOpen(false);
                                setQuery("");
                              }}
                              className="flex items-center gap-3 px-4 py-2.5 hover:bg-surface transition-colors"
                            >
                              <div className="relative w-12 h-12 rounded-lg overflow-hidden bg-surface shrink-0">
                                <Image
                                  src={product.images[0]}
                                  alt={product.name}
                                  fill
                                  className="object-cover"
                                  sizes="48px"
                                />
                              </div>
                              <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-primary truncate">
                                  {product.name}
                                </p>
                                <p className="text-xs text-muted mb-0.5">
                                  {product.category}
                                </p>
                                <div className="flex items-center gap-1">
                                  {[...Array(5)].map((_, i) => (
                                    <Star
                                      key={i}
                                      size={10}
                                      className={
                                        i < Math.floor(product.rating)
                                          ? "fill-amber-400 text-amber-400"
                                          : "text-surface-dark"
                                      }
                                    />
                                  ))}
                                  <span className="text-[10px] text-muted ml-0.5">
                                    ({product.reviewCount})
                                  </span>
                                </div>
                              </div>
                              <div className="text-right shrink-0">
                                <p className="text-sm font-semibold text-primary">
                                  {formatPrice(product.price)}
                                </p>
                                {product.originalPrice && (
                                  <p className="text-[11px] text-muted line-through">
                                    {formatPrice(product.originalPrice)}
                                  </p>
                                )}
                              </div>
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* View All */}
                    {results.length > 0 && (
                      <Link
                        href={`/products?search=${encodeURIComponent(query)}`}
                        onClick={() => {
                          setSearchOpen(false);
                          setQuery("");
                        }}
                        className="flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-accent hover:text-accent-dark border-t border-surface-dark transition-colors"
                      >
                        View all results
                        <ArrowRight size={14} />
                      </Link>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link
              href="/wishlist"
              className="hidden sm:flex p-2 text-primary/70 hover:text-primary transition-colors"
            >
              <Heart size={20} />
            </Link>

            <Link
              href="/cart"
              className="relative p-2 text-primary/70 hover:text-primary transition-colors"
            >
              <ShoppingBag size={20} />
              {itemCount > 0 && mounted && (
                <motion.span
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  className="absolute -top-0.5 -right-0.5 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium"
                >
                  {itemCount}
                </motion.span>
              )}
              {itemCount > 0 && !mounted && (
                <span className="absolute -top-0.5 -right-0.5 bg-accent text-white text-xs w-5 h-5 rounded-full flex items-center justify-center font-medium">
                  {itemCount}
                </span>
              )}
            </Link>

            <Link
              href="/auth/login"
              className="hidden sm:flex p-2 text-primary/70 hover:text-primary transition-colors"
            >
              <User size={20} />
            </Link>

            {/* Mobile Menu Toggle */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="lg:hidden p-2 text-primary/70 hover:text-primary"
            >
              {isOpen ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-white border-t border-surface-dark"
          >
            <nav className="max-w-7xl mx-auto px-4 py-4 flex flex-col gap-2">
              {NAV_LINKS.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  onClick={() => setIsOpen(false)}
                  className="px-4 py-2.5 text-primary/70 hover:text-primary hover:bg-surface rounded-lg transition-colors font-medium"
                >
                  {link.label}
                </Link>
              ))}
              <Link
                href="/auth/login"
                onClick={() => setIsOpen(false)}
                className="px-4 py-2.5 text-primary/70 hover:text-primary hover:bg-surface rounded-lg transition-colors font-medium"
              >
                {user ? "My Account" : "Login"}
              </Link>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
