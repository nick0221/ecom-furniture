"use client";

import AnimatedSection from "@/components/ui/AnimatedSection";

const brands = [
  "Architectural Digest",
  "Elle Decor",
  "Dwell",
  "House Beautiful",
  "Better Homes & Gardens",
  "Martha Stewart Living",
  "Country Living",
  "Sunset Magazine",
];

export default function BrandsTicker() {
  return (
    <section className="py-12 bg-white border-y border-surface-dark overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mb-6">
        <AnimatedSection className="text-center">
          <p className="text-muted text-sm font-medium tracking-wide uppercase">
            As Featured In
          </p>
        </AnimatedSection>
      </div>

      <div className="relative">
        <div className="flex animate-ticker whitespace-nowrap">
          {[...brands, ...brands].map((brand, i) => (
            <div
              key={i}
              className="flex items-center justify-center mx-8 sm:mx-12 shrink-0"
            >
              <span className="text-lg sm:text-xl font-bold text-primary/20 hover:text-primary/40 transition-colors duration-300 cursor-default select-none">
                {brand}
              </span>
            </div>
          ))}
        </div>

        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-20 bg-gradient-to-r from-white to-transparent pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-white to-transparent pointer-events-none" />
      </div>
    </section>
  );
}
