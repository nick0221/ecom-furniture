"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Award, Users, Leaf, Heart } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Newsletter from "@/components/home/Newsletter";

const values = [
  {
    icon: Award,
    title: "Quality Craftsmanship",
    description:
      "Every piece is meticulously crafted by skilled artisans using time-honored techniques.",
  },
  {
    icon: Leaf,
    title: "Sustainable Materials",
    description:
      "We source responsibly from FSC-certified forests and eco-friendly suppliers.",
  },
  {
    icon: Users,
    title: "Customer First",
    description:
      "Your satisfaction drives everything we do, from design to delivery and beyond.",
  },
  {
    icon: Heart,
    title: "Designed for Living",
    description:
      "Beautiful furniture should also be functional. We never compromise on comfort.",
  },
];

const team = [
  {
    name: "Emma Chen",
    role: "Founder & Designer",
    image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=400",
  },
  {
    name: "Marcus Rivera",
    role: "Master Craftsman",
    image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=400",
  },
  {
    name: "Sarah Johnson",
    role: "Head of Operations",
    image: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=400",
  },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-surface">
      {/* Hero */}
      <section className="bg-primary py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection className="max-w-2xl">
            <p className="text-accent font-medium tracking-wide uppercase text-sm mb-3">
              Our Story
            </p>
            <h1 className="text-4xl lg:text-5xl font-bold text-white mb-4">
              Crafting Furniture Since 2010
            </h1>
            <p className="text-white/70 text-lg leading-relaxed">
              What started as a small workshop has grown into a beloved furniture
              brand. We believe that beautiful, well-made furniture should be
              accessible to everyone.
            </p>
          </AnimatedSection>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Breadcrumb items={[{ label: "About Us" }]} />

        {/* Mission */}
        <AnimatedSection className="py-16 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-3xl font-bold text-primary mb-4">
              Our Mission
            </h2>
            <p className="text-primary/70 leading-relaxed mb-4">
              We set out to create furniture that brings warmth and character to
              modern homes. Each piece in our collection is designed with
              intention and built to last for generations.
            </p>
            <p className="text-primary/70 leading-relaxed">
              From sustainable sourcing to thoughtful design, we consider every
              step of the process. Our workshop combines traditional woodworking
              techniques with modern precision, resulting in furniture that
             &apos;s both beautiful and built to endure.
            </p>
          </div>
          <div className="relative aspect-[4/3] rounded-2xl overflow-hidden">
            <Image
              src="https://images.unsplash.com/photo-1506439773649-6e0eb8cfb237?w=800"
              alt="Our workshop"
              fill
              className="object-cover"
              sizes="(max-width: 1024px) 100vw, 50vw"
            />
          </div>
        </AnimatedSection>

        {/* Values */}
        <section className="py-16">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Our Values</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {values.map((value, i) => (
              <AnimatedSection key={value.title} delay={i * 0.1}>
                <div className="bg-white rounded-xl p-6 border border-surface-dark h-full">
                  <value.icon size={32} className="text-accent mb-4" />
                  <h3 className="font-semibold text-primary mb-2">
                    {value.title}
                  </h3>
                  <p className="text-sm text-primary/70 leading-relaxed">
                    {value.description}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>

        {/* Team */}
        <section className="py-16">
          <AnimatedSection className="text-center mb-12">
            <h2 className="text-3xl font-bold text-primary">Meet the Team</h2>
          </AnimatedSection>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {team.map((member, i) => (
              <AnimatedSection key={member.name} delay={i * 0.1}>
                <div className="text-center">
                  <div className="relative w-48 h-48 mx-auto rounded-full overflow-hidden mb-4">
                    <Image
                      src={member.image}
                      alt={member.name}
                      fill
                      className="object-cover"
                      sizes="192px"
                    />
                  </div>
                  <h3 className="font-semibold text-primary">{member.name}</h3>
                  <p className="text-sm text-accent">{member.role}</p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </section>
      </div>

      <Newsletter />
    </div>
  );
}
