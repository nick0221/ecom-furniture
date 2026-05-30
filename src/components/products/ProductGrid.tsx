"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { SlidersHorizontal, X, Grid3X3, List } from "lucide-react";
import type { FilterState, SortOption } from "@/types";
import { MATERIALS, COLORS, SORT_OPTIONS } from "@/lib/constants";
import { products } from "@/data/products";
import ProductCard from "./ProductCard";
import { cn } from "@/lib/utils";

export default function ProductGrid({ initialSearch = "" }: { initialSearch?: string }) {

  const [filters, setFilters] = useState<FilterState>({
    category: [],
    material: [],
    color: [],
    priceRange: [0, 10000],
    search: initialSearch,
    sort: "newest",
  });
  const [showFilters, setShowFilters] = useState(false);
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid");

  const filteredProducts = products
    .filter((p) => {
      if (
        filters.category.length > 0 &&
        !filters.category.includes(p.category)
      )
        return false;
      if (
        filters.material.length > 0 &&
        !filters.material.includes(p.material)
      )
        return false;
      if (filters.color.length > 0 && !filters.color.includes(p.color))
        return false;
      if (
        p.price < filters.priceRange[0] ||
        p.price > filters.priceRange[1]
      )
        return false;
      if (
        filters.search &&
        !p.name.toLowerCase().includes(filters.search.toLowerCase())
      )
        return false;
      return true;
    })
    .sort((a, b) => {
      switch (filters.sort) {
        case "price-asc":
          return a.price - b.price;
        case "price-desc":
          return b.price - a.price;
        case "rating":
          return b.rating - a.rating;
        default:
          return 0;
      }
    });

  const categories = [...new Set(products.map((p) => p.category))];
  const priceRanges = [
    { label: "Under $500", min: 0, max: 500 },
    { label: "$500 - $1000", min: 500, max: 1000 },
    { label: "$1000 - $2000", min: 1000, max: 2000 },
    { label: "Over $2000", min: 2000, max: 10000 },
  ];

  const toggleFilter = (
    key: "category" | "material" | "color",
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [key]: prev[key].includes(value)
        ? prev[key].filter((v) => v !== value)
        : [...prev[key], value],
    }));
  };

  return (
    <div className="flex flex-col lg:flex-row gap-8">
      {/* Filter Toggle (Mobile) */}
      <button
        onClick={() => setShowFilters(!showFilters)}
        className="lg:hidden flex items-center gap-2 px-4 py-2 bg-white border border-surface-dark rounded-lg text-sm font-medium"
      >
        <SlidersHorizontal size={16} />
        Filters
        {filters.category.length + filters.material.length + filters.color.length >
          0 && (
          <span className="w-5 h-5 bg-accent text-white text-xs rounded-full flex items-center justify-center">
            {filters.category.length +
              filters.material.length +
              filters.color.length}
          </span>
        )}
      </button>

      {/* Filters Sidebar */}
      <div
        className={cn(
          "lg:w-64 shrink-0",
          showFilters
            ? "fixed inset-0 z-50 bg-white p-6 overflow-y-auto lg:static lg:bg-transparent lg:p-0"
            : "hidden lg:block"
        )}
      >
        {showFilters && (
          <div className="flex items-center justify-between mb-6 lg:hidden">
            <h2 className="text-lg font-semibold">Filters</h2>
            <button onClick={() => setShowFilters(false)}>
              <X size={20} />
            </button>
          </div>
        )}

        <div className="space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-primary mb-2">
              Search
            </label>
            <input
              type="text"
              placeholder="Search products..."
              value={filters.search}
              onChange={(e) =>
                setFilters((prev) => ({ ...prev, search: e.target.value }))
              }
              className="w-full px-3 py-2 border border-surface-dark rounded-lg text-sm focus:border-accent focus:ring-1 focus:ring-accent/20"
            />
          </div>

          {/* Category */}
          <div>
            <h3 className="text-sm font-medium text-primary mb-3">Category</h3>
            <div className="space-y-2">
              {categories.map((cat) => (
                <label
                  key={cat}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.category.includes(cat)}
                    onChange={() => toggleFilter("category", cat)}
                    className="w-4 h-4 rounded border-surface-dark text-accent focus:ring-accent/20"
                  />
                  <span className="text-sm text-primary/70">{cat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Price */}
          <div>
            <h3 className="text-sm font-medium text-primary mb-3">Price</h3>
            <div className="space-y-2">
              {priceRanges.map((range) => (
                <label
                  key={range.label}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="radio"
                    name="price"
                    checked={
                      filters.priceRange[0] === range.min &&
                      filters.priceRange[1] === range.max
                    }
                    onChange={() =>
                      setFilters((prev) => ({
                        ...prev,
                        priceRange: [range.min, range.max],
                      }))
                    }
                    className="w-4 h-4 border-surface-dark text-accent focus:ring-accent/20"
                  />
                  <span className="text-sm text-primary/70">{range.label}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Material */}
          <div>
            <h3 className="text-sm font-medium text-primary mb-3">Material</h3>
            <div className="space-y-2">
              {MATERIALS.map((mat) => (
                <label
                  key={mat}
                  className="flex items-center gap-2 cursor-pointer"
                >
                  <input
                    type="checkbox"
                    checked={filters.material.includes(mat)}
                    onChange={() => toggleFilter("material", mat)}
                    className="w-4 h-4 rounded border-surface-dark text-accent focus:ring-accent/20"
                  />
                  <span className="text-sm text-primary/70">{mat}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Color */}
          <div>
            <h3 className="text-sm font-medium text-primary mb-3">Color</h3>
            <div className="flex flex-wrap gap-2">
              {COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => toggleFilter("color", color.name)}
                  className={cn(
                    "w-8 h-8 rounded-full border-2 transition-all",
                    filters.color.includes(color.name)
                      ? "border-accent scale-110"
                      : "border-surface-dark hover:border-muted"
                  )}
                  style={{ backgroundColor: color.hex }}
                  title={color.name}
                />
              ))}
            </div>
          </div>

          {/* Clear Filters */}
          {(filters.category.length > 0 ||
            filters.material.length > 0 ||
            filters.color.length > 0) && (
            <button
              onClick={() =>
                setFilters({
                  category: [],
                  material: [],
                  color: [],
                  priceRange: [0, 10000],
                  search: "",
                  sort: "newest",
                })
              }
              className="text-sm text-accent hover:text-accent-dark transition-colors"
            >
              Clear all filters
            </button>
          )}
        </div>
      </div>

      {/* Product Grid */}
      <div className="flex-1">
        {/* Sort & View */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-sm text-muted">
            {filteredProducts.length} product
            {filteredProducts.length !== 1 ? "s" : ""} found
          </p>
          <div className="flex items-center gap-4">
            <select
              value={filters.sort}
              onChange={(e) =>
                setFilters((prev) => ({
                  ...prev,
                  sort: e.target.value as SortOption,
                }))
              }
              className="px-3 py-2 border border-surface-dark rounded-lg text-sm bg-white focus:border-accent"
            >
              {SORT_OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value}>
                  {opt.label}
                </option>
              ))}
            </select>
            <div className="hidden sm:flex items-center gap-1 border border-surface-dark rounded-lg p-1">
              <button
                onClick={() => setViewMode("grid")}
                className={cn(
                  "p-1.5 rounded",
                  viewMode === "grid" ? "bg-surface" : ""
                )}
              >
                <Grid3X3 size={16} />
              </button>
              <button
                onClick={() => setViewMode("list")}
                className={cn(
                  "p-1.5 rounded",
                  viewMode === "list" ? "bg-surface" : ""
                )}
              >
                <List size={16} />
              </button>
            </div>
          </div>
        </div>

        {/* Products */}
        {filteredProducts.length === 0 ? (
          <div className="text-center py-20">
            <p className="text-lg text-muted">No products match your filters</p>
            <button
              onClick={() =>
                setFilters({
                  category: [],
                  material: [],
                  color: [],
                  priceRange: [0, 10000],
                  search: "",
                  sort: "newest",
                })
              }
              className="mt-4 text-accent hover:text-accent-dark transition-colors"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <motion.div
            layout
            className={cn(
              viewMode === "grid"
                ? "grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6"
                : "flex flex-col gap-4"
            )}
          >
            {filteredProducts.map((product, i) => (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
              >
                <ProductCard product={product} viewMode={viewMode} />
              </motion.div>
            ))}
          </motion.div>
        )}
      </div>
    </div>
  );
}
