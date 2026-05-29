"use client";

import { Star, Quote } from "lucide-react";
import { reviews } from "@/data/reviews";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Testimonials() {
  const displayReviews = reviews.slice(0, 4);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-12">
          <p className="text-accent font-medium tracking-wide uppercase text-sm mb-2">
            Testimonials
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">
            What Our Customers Say
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {displayReviews.map((review, i) => (
            <AnimatedSection key={review.id} delay={i * 0.1}>
              <div className="bg-surface rounded-xl p-6 h-full flex flex-col">
                <Quote size={24} className="text-accent/30 mb-3" />
                <p className="text-primary/70 text-sm leading-relaxed flex-1 mb-4">
                  &ldquo;{review.comment}&rdquo;
                </p>
                <div className="flex items-center gap-1 mb-3">
                  {[...Array(5)].map((_, j) => (
                    <Star
                      key={j}
                      size={14}
                      className={
                        j < review.rating
                          ? "fill-amber-400 text-amber-400"
                          : "text-surface-dark"
                      }
                    />
                  ))}
                </div>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-accent/20 rounded-full flex items-center justify-center">
                    <span className="text-accent-dark font-semibold text-sm">
                      {review.avatar}
                    </span>
                  </div>
                  <div>
                    <p className="font-medium text-primary text-sm">
                      {review.author}
                    </p>
                    <p className="text-muted text-xs">Verified Buyer</p>
                  </div>
                </div>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
