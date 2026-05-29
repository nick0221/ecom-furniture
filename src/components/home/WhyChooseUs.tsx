"use client";

import { useEffect, useRef } from "react";
import { Award, Leaf, Hammer, Truck } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";
import { animate } from "animejs";

const features = [
  {
    icon: Hammer,
    title: "Handcrafted",
    description:
      "Each piece is meticulously built by skilled artisans with decades of experience.",
  },
  {
    icon: Leaf,
    title: "Sustainable",
    description:
      "Responsibly sourced materials from FSC-certified forests and eco-friendly suppliers.",
  },
  {
    icon: Award,
    title: "Premium Quality",
    description:
      "Built to last generations with kiln-dried hardwoods and reinforced joinery.",
  },
  {
    icon: Truck,
    title: "Free Delivery",
    description:
      "Complimentary white-glove delivery and assembly on all orders over ₱500.",
  },
];

export default function WhyChooseUs() {
  const iconsRef = useRef<HTMLDivElement[]>([]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            iconsRef.current.forEach((el, i) => {
              if (el) {
                animate(el, {
                  scale: [0, 1.15, 1],
                  rotate: [0, -10, 0],
                  duration: 800,
                  delay: i * 150,
                  ease: "outElastic(1, .6)",
                });
              }
            });
            observer.disconnect();
          }
        });
      },
      { threshold: 0.3 }
    );

    if (iconsRef.current[0]) {
      observer.observe(iconsRef.current[0]);
    }
    return () => observer.disconnect();
  }, []);

  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <AnimatedSection className="text-center mb-14">
          <p className="text-accent font-medium tracking-wide uppercase text-sm mb-2">
            Why WoodCraft
          </p>
          <h2 className="text-3xl lg:text-4xl font-bold text-primary">
            Built Different
          </h2>
        </AnimatedSection>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, i) => (
            <AnimatedSection key={feature.title} delay={i * 0.12}>
              <div className="group text-center">
                <div
                  ref={(el) => {
                    if (el) iconsRef.current[i] = el;
                  }}
                  className="w-16 h-16 mx-auto mb-5 bg-accent/10 rounded-2xl flex items-center justify-center group-hover:bg-accent/20 transition-colors duration-300"
                >
                  <feature.icon
                    size={28}
                    className="text-accent group-hover:scale-110 transition-transform duration-300"
                  />
                </div>
                <h3 className="text-lg font-semibold text-primary mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm text-primary/60 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            </AnimatedSection>
          ))}
        </div>
      </div>
    </section>
  );
}
