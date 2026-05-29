"use client";

import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Star, Truck, Shield } from "lucide-react";
import Button from "@/components/ui/Button";
import { animate } from "animejs";

function AnimatedCounter({ target, suffix = "" }: { target: number; suffix?: string }) {
  const [count, setCount] = useState(0);
  const ref = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          let startTime: number | null = null;
          const duration = 2000;

          const step = (timestamp: number) => {
            if (!startTime) startTime = timestamp;
            const progress = Math.min((timestamp - startTime) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 4);
            setCount(Math.round(eased * target));
            if (progress < 1) requestAnimationFrame(step);
          };

          requestAnimationFrame(step);
          observer.disconnect();
        }
      },
      { threshold: 0.5 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, [target]);

  return (
    <span ref={ref}>
      {count}
      {suffix}
    </span>
  );
}

export default function Hero() {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  // Anime.js staggered letter reveal
  useEffect(() => {
    if (charsRef.current.length) {
      charsRef.current.forEach((el, i) => {
        animate(el, {
          opacity: [0, 1],
          y: [50, 0],
          rotateX: [-90, 0],
          duration: 1200,
          delay: i * 40,
          ease: "outExpo",
        });
      });
    }
  }, []);

  // Floating particles animation
  useEffect(() => {
    const particles = document.querySelectorAll(".hero-particle");
    if (particles.length) {
      const els = Array.from(particles);
      els.forEach((el, i) => {
        const duration = 3000 + Math.random() * 3000;
        const delay = i * 400;
        animate(el, {
          translateY: [0, -20 - Math.random() * 20, 0],
          translateX: [0, -10 + Math.random() * 20, 0],
          opacity: [0, 0.5, 0],
          duration,
          delay,
          loop: true,
          ease: "inOutSine",
        });
      });
    }
  }, []);

  const titleWords = ["Furniture", "That", "Tells", "a", "Story"];

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-primary">
      {/* Animated background gradient */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
        <motion.div
          animate={{
            background: [
              "radial-gradient(ellipse at 20% 50%, rgba(196,167,125,0.15) 0%, transparent 60%)",
              "radial-gradient(ellipse at 80% 20%, rgba(196,167,125,0.1) 0%, transparent 60%)",
              "radial-gradient(ellipse at 40% 80%, rgba(196,167,125,0.15) 0%, transparent 60%)",
              "radial-gradient(ellipse at 20% 50%, rgba(196,167,125,0.15) 0%, transparent 60%)",
            ],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute inset-0"
        />
      </div>

      {/* Dot pattern */}
      <div className="absolute inset-0 opacity-[0.03]">
        <div
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, white 1px, transparent 0)`,
            backgroundSize: "40px 40px",
          }}
          className="w-full h-full"
        />
      </div>

      {/* Floating particles */}
      {[
        { w: 7, h: 5, l: 15, t: 22 },
        { w: 5, h: 8, l: 30, t: 65 },
        { w: 9, h: 6, l: 55, t: 18 },
        { w: 4, h: 7, l: 72, t: 45 },
        { w: 8, h: 5, l: 88, t: 75 },
        { w: 6, h: 9, l: 20, t: 85 },
        { w: 5, h: 5, l: 45, t: 35 },
        { w: 7, h: 4, l: 65, t: 60 },
        { w: 4, h: 6, l: 80, t: 12 },
        { w: 8, h: 7, l: 38, t: 52 },
        { w: 6, h: 5, l: 92, t: 38 },
        { w: 5, h: 8, l: 10, t: 48 },
      ].map((p, i) => (
        <div
          key={i}
          className="hero-particle absolute rounded-full bg-accent/30"
          style={{
            width: `${p.w}px`,
            height: `${p.h}px`,
            left: `${p.l}%`,
            top: `${p.t}%`,
            opacity: 0,
          }}
        />
      ))}

      {/* Floating geometric shapes */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        className="absolute right-[15%] top-[15%] w-32 h-32 border border-accent/20 rounded-2xl hidden lg:block"
      />
      <motion.div
        animate={{ rotate: -360 }}
        transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        className="absolute right-[10%] top-[25%] w-20 h-20 border border-white/10 rounded-full hidden lg:block"
      />
      <motion.div
        animate={{ y: [-15, 15, -15], x: [-5, 5, -5] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[20%] bottom-[20%] w-24 h-24 bg-accent/10 rounded-2xl blur-sm hidden lg:block"
      />

      {/* Large glow */}
      <motion.div
        animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute right-[5%] top-[30%] w-96 h-96 bg-accent rounded-full blur-[120px] hidden lg:block"
      />

      <motion.div style={{ y: y1, opacity }} className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Left: Text */}
          <div>
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-8"
            >
              <Sparkles size={14} className="text-accent" />
              <span className="text-accent font-medium text-xs tracking-wider uppercase">
                Handcrafted with love
              </span>
              <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
            </motion.div>

            {/* Animated Title */}
            <h1
              ref={titleRef}
              className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-6"
            >
              {titleWords.map((word, wi) => (
                <span key={wi} className="inline-block mr-[0.3em]">
                  {word.split("").map((char, ci) => (
                    <span
                      key={ci}
                      ref={(el) => {
                        if (el) charsRef.current.push(el);
                      }}
                      className={`inline-block ${word === "Story" ? "text-accent" : ""}`}
                      style={{ opacity: 0 }}
                    >
                      {char}
                    </span>
                  ))}
                </span>
              ))}
            </h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.2 }}
              className="text-white/60 text-lg sm:text-xl mb-10 leading-relaxed max-w-lg"
            >
              Discover our curated collection of premium furniture, designed to
              transform your space into a haven of comfort and style.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.4 }}
              className="flex flex-wrap gap-4 mb-14"
            >
              <Link href="/products">
                <Button variant="secondary" size="lg" className="group">
                  Explore Collection
                  <ArrowRight
                    size={18}
                    className="ml-2 group-hover:translate-x-1 transition-transform"
                  />
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="outline"
                  size="lg"
                  className="border-white/20 text-white hover:bg-white hover:text-primary"
                >
                  Our Story
                </Button>
              </Link>
            </motion.div>

            {/* Trust badges */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.8, duration: 0.6 }}
              className="flex flex-wrap items-center gap-6 mb-12"
            >
              {[
                { icon: Truck, text: "Free Delivery" },
                { icon: Shield, text: "2-Year Warranty" },
                { icon: Star, text: "4.9 Rated" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/40">
                  <Icon size={14} className="text-accent/60" />
                  <span className="text-xs font-medium">{text}</span>
                </div>
              ))}
            </motion.div>

            {/* Stats with animated counters */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.6 }}
              className="flex gap-10"
            >
              {[
                { value: 500, suffix: "+", label: "Products" },
                { value: 10, suffix: "k+", label: "Happy Customers" },
                { value: 15, suffix: "+", label: "Years Experience" },
              ].map((stat) => (
                <div key={stat.label} className="relative">
                  <p className="text-3xl font-bold text-accent">
                    <AnimatedCounter target={stat.value} suffix={stat.suffix} />
                  </p>
                  <p className="text-white/40 text-sm mt-1">{stat.label}</p>
                  <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-accent/30 rounded-full" />
                </div>
              ))}
            </motion.div>
          </div>

          {/* Right: Decorative furniture showcase */}
          <motion.div
            style={{ y: y2 }}
            className="hidden lg:flex items-center justify-center relative"
          >
            {/* Main image frame */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: -5 }}
              animate={{ opacity: 1, scale: 1, rotate: 0 }}
              transition={{ duration: 1, delay: 0.5, ease: [0.25, 0.46, 0.45, 0.94] }}
              className="relative w-80 h-96 rounded-3xl overflow-hidden shadow-2xl border border-white/10"
            >
              <Image
                src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"
                alt="Premium sofa"
                fill
                className="object-cover"
                sizes="320px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent" />
            </motion.div>

            {/* Floating card 1 */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1, duration: 0.6 }}
              className="absolute -left-10 top-16 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-accent/20 rounded-lg flex items-center justify-center">
                  <Star size={14} className="text-accent fill-accent" />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary">4.9 Rating</p>
                  <p className="text-[10px] text-muted">2,847 reviews</p>
                </div>
              </div>
            </motion.div>

            {/* Floating card 2 */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 1.3, duration: 0.6 }}
              className="absolute -right-5 bottom-28 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-xl"
            >
              <div className="flex items-center gap-2">
                <div className="w-8 h-8 bg-green-100 rounded-lg flex items-center justify-center">
                  <Truck size={14} className="text-success" />
                </div>
                <div>
                  <p className="text-xs font-bold text-primary">Free Shipping</p>
                  <p className="text-[10px] text-muted">Orders over ₱500</p>
                </div>
              </div>
            </motion.div>

            {/* Small image */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 1.5, duration: 0.6 }}
              className="absolute -bottom-6 -left-8 w-28 h-28 rounded-2xl overflow-hidden shadow-xl border-2 border-white/20"
            >
              <Image
                src="https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=200"
                alt="Table detail"
                fill
                className="object-cover"
                sizes="112px"
              />
            </motion.div>
          </motion.div>
        </div>
      </motion.div>

      {/* Bottom marquee */}
      <div className="absolute bottom-0 left-0 right-0 border-t border-white/5 bg-black/20 backdrop-blur-sm overflow-hidden">
        <div className="flex animate-marquee whitespace-nowrap py-3">
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex items-center gap-8 mx-8">
              {[
                "Free Delivery Over ₱500",
                "Handcrafted Quality",
                "Sustainable Materials",
                "2-Year Warranty",
                "30-Day Returns",
                "Custom Orders Welcome",
                "Free Delivery Over ₱500",
                "Handcrafted Quality",
                "Sustainable Materials",
                "2-Year Warranty",
                "30-Day Returns",
                "Custom Orders Welcome",
              ].map((text, j) => (
                <span key={`${i}-${j}`} className="flex items-center gap-2 text-white/30 text-xs font-medium">
                  <span className="w-1 h-1 bg-accent/50 rounded-full" />
                  {text}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
