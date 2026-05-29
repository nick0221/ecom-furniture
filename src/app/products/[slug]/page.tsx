"use client";

import { use, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Star,
  ShoppingBag,
  Heart,
  Truck,
  Shield,
  RotateCcw,
  Minus,
  Plus,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { getProductBySlug, getRelatedProducts } from "@/data/products";
import { getReviewsByProduct } from "@/data/reviews";
import { formatPrice, getDiscount } from "@/lib/utils";
import { useCartStore } from "@/store/cartStore";
import { useWishlistStore } from "@/store/wishlistStore";
import { useToastStore } from "@/components/ui/Toast";
import Breadcrumb from "@/components/layout/Breadcrumb";
import Badge from "@/components/ui/Badge";
import Button from "@/components/ui/Button";
import AnimatedSection from "@/components/ui/AnimatedSection";
import ImageZoom from "@/components/ui/ImageZoom";
import ProductCard from "@/components/products/ProductCard";
import { animate } from "animejs";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = use(params);
  const product = getProductBySlug(slug);
  const reviews = product ? getReviewsByProduct(product.id) : [];
  const related = product ? getRelatedProducts(product) : [];
  const addItem = useCartStore((s) => s.addItem);
  const { addItem: addWishlist, removeItem: removeWishlist, isInWishlist } =
    useWishlistStore();

  const [selectedImage, setSelectedImage] = useState(0);
  const [quantity, setQuantity] = useState(1);
  const [activeTab, setActiveTab] = useState<"description" | "specs" | "reviews">("description");
  const [added, setAdded] = useState(false);
  const addToast = useToastStore((s) => s.addToast);

  if (!product) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-primary mb-4">
            Product Not Found
          </h1>
          <Link href="/products" className="text-accent hover:text-accent-dark">
            Back to Shop
          </Link>
        </div>
      </div>
    );
  }

  const wishlisted = isInWishlist(product.id);

  const handleAddToCart = () => {
    addItem(product, quantity);
    setAdded(true);
    addToast(`${product.name} added to cart`, "cart");

    // Anime.js cart animation
    animate(".cart-pulse", {
      scale: [1, 1.2, 1],
      duration: 400,
      ease: "outQuad",
    });

    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb
          items={[
            { label: "Shop", href: "/products" },
            { label: product.category },
            { label: product.name },
          ]}
        />

        <div className="mt-8 grid grid-cols-1 lg:grid-cols-2 gap-10">
          {/* Images */}
          <AnimatedSection>
            <div className="relative aspect-square rounded-2xl overflow-hidden bg-white mb-4">
              <AnimatePresence mode="wait">
                <motion.div
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="relative w-full h-full"
                >
                  <ImageZoom
                    src={product.images[selectedImage]}
                    alt={product.name}
                    sizes="(max-width: 1024px) 100vw, 50vw"
                  />
                </motion.div>
              </AnimatePresence>

              {/* Nav arrows */}
              {product.images.length > 1 && (
                <>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === 0 ? product.images.length - 1 : prev - 1
                      )
                    }
                    className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                  >
                    <ChevronLeft size={18} />
                  </button>
                  <button
                    onClick={() =>
                      setSelectedImage((prev) =>
                        prev === product.images.length - 1 ? 0 : prev + 1
                      )
                    }
                    className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-white/80 backdrop-blur rounded-full flex items-center justify-center shadow-md hover:bg-white transition-colors"
                  >
                    <ChevronRight size={18} />
                  </button>
                </>
              )}
            </div>

            {/* Thumbnails */}
            <div className="flex gap-3">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setSelectedImage(i)}
                  className={`relative w-20 h-20 rounded-lg overflow-hidden border-2 transition-all ${
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
                    sizes="80px"
                  />
                </button>
              ))}
            </div>
          </AnimatedSection>

          {/* Product Info */}
          <AnimatedSection delay={0.1}>
            <div className="lg:sticky lg:top-28">
              <div className="flex items-center gap-2 mb-2">
                <Badge variant="accent">{product.category}</Badge>
                {product.originalPrice && (
                  <Badge variant="danger">
                    Save {formatPrice(product.originalPrice - product.price)}
                  </Badge>
                )}
              </div>

              <h1 className="text-3xl lg:text-4xl font-bold text-primary mb-3">
                {product.name}
              </h1>

              <div className="flex items-center gap-3 mb-4">
                <div className="flex items-center gap-1">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < Math.floor(product.rating)
                          ? "fill-amber-400 text-amber-400"
                          : "text-surface-dark"
                      }
                    />
                  ))}
                </div>
                <span className="text-sm text-muted">
                  {product.rating} ({product.reviewCount} reviews)
                </span>
              </div>

              <div className="flex items-baseline gap-3 mb-6">
                <span className="text-3xl font-bold text-primary">
                  {formatPrice(product.price)}
                </span>
                {product.originalPrice && (
                  <span className="text-xl text-muted line-through">
                    {formatPrice(product.originalPrice)}
                  </span>
                )}
              </div>

              <p className="text-primary/70 leading-relaxed mb-8">
                {product.description}
              </p>

              {/* Quantity & Add to Cart */}
              <div className="flex items-center gap-4 mb-6">
                <div className="flex items-center border border-surface-dark rounded-lg">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="p-3 hover:bg-surface transition-colors"
                  >
                    <Minus size={16} />
                  </button>
                  <span className="w-12 text-center font-medium">{quantity}</span>
                  <button
                    onClick={() => setQuantity(quantity + 1)}
                    className="p-3 hover:bg-surface transition-colors"
                  >
                    <Plus size={16} />
                  </button>
                </div>
                <Button
                  size="lg"
                  onClick={handleAddToCart}
                  className="flex-1 cart-pulse"
                >
                  <ShoppingBag size={18} className="mr-2" />
                  {added ? "Added to Cart!" : "Add to Cart"}
                </Button>
                <button
                  onClick={() => {
                    if (wishlisted) {
                      removeWishlist(product.id);
                      addToast("Removed from wishlist", "wishlist");
                    } else {
                      addWishlist(product);
                      addToast("Added to wishlist", "wishlist");
                    }
                  }}
                  className={`p-3.5 rounded-lg border-2 transition-all ${
                    wishlisted
                      ? "border-danger bg-red-50 text-danger"
                      : "border-surface-dark hover:border-muted"
                  }`}
                >
                  <Heart
                    size={20}
                    className={wishlisted ? "fill-current" : ""}
                  />
                </button>
              </div>

              {/* Features */}
              <div className="grid grid-cols-3 gap-4 pt-6 border-t border-surface-dark">
                {[
                  { icon: Truck, label: "Free Shipping" },
                  { icon: Shield, label: "2 Year Warranty" },
                  { icon: RotateCcw, label: "30 Day Returns" },
                ].map((feature) => (
                  <div key={feature.label} className="text-center">
                    <feature.icon
                      size={20}
                      className="mx-auto mb-1 text-accent"
                    />
                    <p className="text-xs text-muted">{feature.label}</p>
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>

        {/* Tabs */}
        <AnimatedSection className="mt-16">
          <div className="border-b border-surface-dark">
            <div className="flex gap-8">
              {(["description", "specs", "reviews"] as const).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`pb-3 text-sm font-medium capitalize transition-colors border-b-2 ${
                    activeTab === tab
                      ? "border-accent text-accent"
                      : "border-transparent text-muted hover:text-primary"
                  }`}
                >
                  {tab}
                  {tab === "reviews" && ` (${reviews.length})`}
                </button>
              ))}
            </div>
          </div>

          <div className="py-8">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
              >
                {activeTab === "description" && (
                  <p className="text-primary/70 leading-relaxed max-w-3xl">
                    {product.description}
                  </p>
                )}

                {activeTab === "specs" && (
                  <div className="max-w-3xl space-y-3">
                    {[
                      { label: "Material", value: product.material },
                      { label: "Color", value: product.color },
                      {
                        label: "Dimensions",
                        value: `${product.dimensions.width}W x ${product.dimensions.height}H x ${product.dimensions.depth}D cm`,
                      },
                      { label: "Weight", value: `${product.weight} kg` },
                      { label: "Stock", value: product.inStock ? "In Stock" : "Out of Stock" },
                    ].map((spec) => (
                      <div
                        key={spec.label}
                        className="flex py-3 border-b border-surface-dark"
                      >
                        <span className="w-40 text-sm font-medium text-primary">
                          {spec.label}
                        </span>
                        <span className="text-sm text-primary/70">
                          {spec.value}
                        </span>
                      </div>
                    ))}
                  </div>
                )}

                {activeTab === "reviews" && (
                  <div className="space-y-6 max-w-3xl">
                    {reviews.length === 0 ? (
                      <p className="text-muted">No reviews yet for this product.</p>
                    ) : (
                      reviews.map((review) => (
                        <div
                          key={review.id}
                          className="bg-white rounded-xl p-5 border border-surface-dark"
                        >
                          <div className="flex items-center gap-3 mb-3">
                            <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                              <span className="text-accent-dark font-semibold text-sm">
                                {review.avatar}
                              </span>
                            </div>
                            <div>
                              <p className="font-medium text-primary text-sm">
                                {review.author}
                              </p>
                              <div className="flex items-center gap-1">
                                {[...Array(5)].map((_, j) => (
                                  <Star
                                    key={j}
                                    size={12}
                                    className={
                                      j < review.rating
                                        ? "fill-amber-400 text-amber-400"
                                        : "text-surface-dark"
                                    }
                                  />
                                ))}
                              </div>
                            </div>
                            <span className="ml-auto text-xs text-muted">
                              {new Date(review.date).toLocaleDateString()}
                            </span>
                          </div>
                          <p className="text-primary/70 text-sm">
                            {review.comment}
                          </p>
                        </div>
                      ))
                    )}
                  </div>
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        </AnimatedSection>

        {/* Related Products */}
        {related.length > 0 && (
          <AnimatedSection className="mt-16">
            <h2 className="text-2xl font-bold text-primary mb-8">
              You May Also Like
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {related.map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
            </div>
          </AnimatedSection>
        )}
      </div>
    </div>
  );
}
