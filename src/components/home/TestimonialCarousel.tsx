"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronLeft, ChevronRight, Quote, Star } from "lucide-react";
import { reviews } from "@/data/reviews";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function TestimonialCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);

  const next = useCallback(() => {
    setDirection(1);
    setCurrent((prev) => (prev + 1) % reviews.length);
  }, []);

  const prev = useCallback(() => {
    setDirection(-1);
    setCurrent((prev) => (prev - 1 + reviews.length) % reviews.length);
  }, []);

  useEffect(() => {
    const timer = setInterval(next, 5000);
    return () => clearInterval(timer);
  }, [next]);

  const review = reviews[current];

  const variants = {
    enter: (dir: number) => ({
      x: dir > 0 ? 80 : -80,
      opacity: 0,
    }),
    center: { x: 0, opacity: 1 },
    exit: (dir: number) => ({
      x: dir > 0 ? -80 : 80,
      opacity: 0,
    }),
  };

  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <p className="text-accent font-medium tracking-wide uppercase text-sm mb-2">
            Testimonials
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">
            What Our Customers Say
          </h2>
        </AnimatedSection>

        <div className="relative">
          <div className="min-h-[280px] flex items-center justify-center">
            <AnimatePresence mode="wait" custom={direction}>
              <motion.div
                key={current}
                custom={direction}
                variants={variants}
                initial="enter"
                animate="center"
                exit="exit"
                transition={{ duration: 0.4, ease: "easeInOut" }}
                className="text-center px-4 sm:px-12"
              >
                <Quote size={40} className="mx-auto text-accent/20 mb-4" />
                <p className="text-lg sm:text-xl text-primary/80 leading-relaxed mb-6 italic">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <div className="flex items-center justify-center gap-1 mb-4">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={16}
                      className={
                        i < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-surface-dark"
                      }
                    />
                  ))}
                </div>
                <div className="flex items-center justify-center gap-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent-dark font-semibold text-sm">
                      {review.avatar}
                    </span>
                  </div>
                  <div className="text-left">
                    <p className="font-medium text-primary text-sm">
                      {review.author}
                    </p>
                    <p className="text-muted text-xs">Verified Buyer</p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Navigation */}
          <div className="flex items-center justify-center gap-4 mt-4">
            <button
              onClick={prev}
              className="w-10 h-10 rounded-full border border-surface-dark flex items-center justify-center hover:bg-surface transition-colors"
            >
              <ChevronLeft size={18} />
            </button>

            <div className="flex gap-2">
              {reviews.map((_, i) => (
                <button
                  key={i}
                  onClick={() => {
                    setDirection(i > current ? 1 : -1);
                    setCurrent(i);
                  }}
                  className={`w-2 h-2 rounded-full transition-all duration-300 ${
                    i === current
                      ? "bg-accent w-6"
                      : "bg-surface-dark hover:bg-muted"
                  }`}
                />
              ))}
            </div>

            <button
              onClick={next}
              className="w-10 h-10 rounded-full border border-surface-dark flex items-center justify-center hover:bg-surface transition-colors"
            >
              <ChevronRight size={18} />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
