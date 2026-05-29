"use client";

import { useEffect, useRef, useState, useCallback } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, useScroll, useTransform } from "framer-motion";
import { ArrowRight, Sparkles, Star, Truck, Shield, Mouse } from "lucide-react";
import Button from "@/components/ui/Button";
import { animate } from "animejs";

const taglines = [
  "Designed for Living",
  "Crafted with Care",
  "Built to Last",
  "Timeless Elegance",
];

/* ── Animated Counter ──────────────────────────────── */
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
          const step = (ts: number) => {
            if (!startTime) startTime = ts;
            const p = Math.min((ts - startTime) / duration, 1);
            setCount(Math.round((1 - Math.pow(1 - p, 4)) * target));
            if (p < 1) requestAnimationFrame(step);
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

/* ── Typewriter ────────────────────────────────────── */
function Typewriter() {
  const [index, setIndex] = useState(0);
  const [displayed, setDisplayed] = useState("");
  const [deleting, setDeleting] = useState(false);

  useEffect(() => {
    const word = taglines[index];
    const speed = deleting ? 40 : 80;

    const timer = setTimeout(() => {
      if (!deleting) {
        setDisplayed(word.slice(0, displayed.length + 1));
        if (displayed.length + 1 === word.length) {
          setTimeout(() => setDeleting(true), 2000);
        }
      } else {
        setDisplayed(word.slice(0, displayed.length - 1));
        if (displayed.length - 1 === 0) {
          setDeleting(false);
          setIndex((prev) => (prev + 1) % taglines.length);
        }
      }
    }, speed);

    return () => clearTimeout(timer);
  }, [displayed, deleting, index]);

  return (
    <span className="inline-block min-w-[200px] sm:min-w-[280px]">
      {displayed}
      <span className="animate-pulse text-accent">|</span>
    </span>
  );
}

/* ── Cursor Trail Particle ─────────────────────────── */
function CursorTrail() {
  const [particles, setParticles] = useState<
    { id: number; x: number; y: number }[]
  >([]);
  const counter = useRef(0);

  useEffect(() => {
    const handleMove = (e: MouseEvent) => {
      const id = counter.current++;
      setParticles((prev) => [
        ...prev.slice(-12),
        { id, x: e.clientX, y: e.clientY },
      ]);
    };
    window.addEventListener("mousemove", handleMove);
    return () => window.removeEventListener("mousemove", handleMove);
  }, []);

  useEffect(() => {
    if (particles.length === 0) return;
    const timer = setTimeout(() => {
      setParticles((prev) => prev.slice(1));
    }, 400);
    return () => clearTimeout(timer);
  }, [particles]);

  return (
    <div className="fixed inset-0 pointer-events-none z-[60]">
      {particles.map((p, i) => (
        <div
          key={p.id}
          className="absolute w-1.5 h-1.5 bg-accent/40 rounded-full"
          style={{
            left: p.x,
            top: p.y,
            opacity: 0.3 + (i / particles.length) * 0.4,
            transform: `scale(${0.5 + (i / particles.length) * 0.5})`,
            transition: "opacity 0.3s ease-out",
          }}
        />
      ))}
    </div>
  );
}

/* ── Main Hero ─────────────────────────────────────── */
export default function Hero() {
  const charsRef = useRef<HTMLSpanElement[]>([]);
  const mainImageRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });
  const [loaded, setLoaded] = useState(false);
  const [prefersReduced, setPrefersReduced] = useState(false);

  const { scrollY } = useScroll();
  const y1 = useTransform(scrollY, [0, 500], [0, -100]);
  const y2 = useTransform(scrollY, [0, 500], [0, -50]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);

  /* ── Reduced motion detection ───────────────────── */
  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setPrefersReduced(mq.matches);
    const handler = (e: MediaQueryListEvent) => setPrefersReduced(e.matches);
    mq.addEventListener("change", handler);
    return () => mq.removeEventListener("change", handler);
  }, []);

  /* ── Anime.js letter reveal ─────────────────────── */
  useEffect(() => {
    if (prefersReduced || !charsRef.current.length) {
      if (charsRef.current.length) {
        charsRef.current.forEach((el) => (el.style.opacity = "1"));
      }
      setLoaded(true);
      return;
    }
    charsRef.current.forEach((el, i) => {
      animate(el, {
        opacity: [0, 1],
        y: [50, 0],
        rotateX: [-90, 0],
        duration: 1200,
        delay: i * 40,
        ease: "outExpo",
        onComplete: () => {
          if (i === charsRef.current.length - 1) setLoaded(true);
        },
      });
    });
  }, [prefersReduced]);

  /* ── Floating particles (client-only, deterministic) ── */
  useEffect(() => {
    if (prefersReduced) return;
    const particles = document.querySelectorAll(".hero-particle");
    Array.from(particles).forEach((el, i) => {
      animate(el, {
        translateY: [0, -20 - (i % 5) * 4, 0],
        translateX: [0, (i % 3) * 6 - 9, 0],
        opacity: [0, 0.45, 0],
        duration: 3000 + (i % 4) * 750,
        delay: i * 400,
        loop: true,
        ease: "inOutSine",
      });
    });
  }, [prefersReduced]);

  /* ── Mouse tracking for glow + 3D tilt ──────────── */
  const handleMouseMove = useCallback((e: React.MouseEvent) => {
    if (!sectionRef.current) return;
    const rect = sectionRef.current.getBoundingClientRect();
    setMouse({
      x: ((e.clientX - rect.left) / rect.width) * 100,
      y: ((e.clientY - rect.top) / rect.height) * 100,
    });
  }, []);

  const tiltX = ((mouse.y - 50) / 50) * 6;
  const tiltY = ((mouse.x - 50) / 50) * -6;

  const titleWords = ["Furniture", "That", "Tells", "a", "Story"];

  return (
    <>
      <CursorTrail />

      <section
        ref={sectionRef}
        onMouseMove={handleMouseMove}
        className="relative min-h-screen flex items-center overflow-hidden bg-primary"
      >
        {/* ── Animated gradient ────────────────────── */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-primary" />
          {!prefersReduced && (
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
          )}
        </div>

        {/* ── Dot pattern ─────────────────────────── */}
        <div className="absolute inset-0 opacity-[0.03]">
          <div
            style={{
              backgroundImage: "radial-gradient(circle at 1px 1px, white 1px, transparent 0)",
              backgroundSize: "40px 40px",
            }}
            className="w-full h-full"
          />
        </div>

        {/* ── Mouse-following glow ─────────────────── */}
        {!prefersReduced && (
          <div
            className="absolute w-[500px] h-[500px] rounded-full bg-accent/10 blur-[100px] pointer-events-none transition-all duration-700 ease-out hidden lg:block"
            style={{
              left: `${mouse.x}%`,
              top: `${mouse.y}%`,
              transform: "translate(-50%, -50%)",
            }}
          />
        )}

        {/* ── Floating particles ───────────────────── */}
        {[
          { w: 7, h: 5, l: 15, t: 22 }, { w: 5, h: 8, l: 30, t: 65 },
          { w: 9, h: 6, l: 55, t: 18 }, { w: 4, h: 7, l: 72, t: 45 },
          { w: 8, h: 5, l: 88, t: 75 }, { w: 6, h: 9, l: 20, t: 85 },
          { w: 5, h: 5, l: 45, t: 35 }, { w: 7, h: 4, l: 65, t: 60 },
          { w: 4, h: 6, l: 80, t: 12 }, { w: 8, h: 7, l: 38, t: 52 },
          { w: 6, h: 5, l: 92, t: 38 }, { w: 5, h: 8, l: 10, t: 48 },
        ].map((p, i) => (
          <div
            key={i}
            className="hero-particle absolute rounded-full bg-accent/30"
            style={{ width: p.w, height: p.h, left: `${p.l}%`, top: `${p.t}%`, opacity: 0 }}
          />
        ))}

        {/* ── Floating shapes ──────────────────────── */}
        {!prefersReduced && (
          <>
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
          </>
        )}

        {/* ── Large glow ───────────────────────────── */}
        {!prefersReduced && (
          <motion.div
            animate={{ scale: [1, 1.2, 1], opacity: [0.08, 0.15, 0.08] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute right-[5%] top-[30%] w-96 h-96 bg-accent rounded-full blur-[120px] hidden lg:block"
          />
        )}

        {/* ── Content ──────────────────────────────── */}
        <motion.div
          style={{ y: y1, opacity }}
          className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10 w-full"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* ── Left: Text ──────────────────────── */}
            <div>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: prefersReduced ? 0 : 0.2 }}
                className="inline-flex items-center gap-2 px-4 py-2 bg-white/10 backdrop-blur-sm rounded-full border border-white/10 mb-8"
              >
                <Sparkles size={14} className="text-accent" />
                <span className="text-accent font-medium text-xs tracking-wider uppercase">
                  Handcrafted with love
                </span>
                <span className="w-1.5 h-1.5 bg-accent rounded-full animate-pulse" />
              </motion.div>

              {/* ── Title with letter reveal + gradient word ── */}
              <h1 className="text-4xl sm:text-5xl lg:text-7xl font-bold text-white leading-[1.1] mb-4">
                {titleWords.map((word, wi) => (
                  <span key={wi} className="inline-block mr-[0.3em]">
                    {word.split("").map((char, ci) => (
                      <span
                        key={ci}
                        ref={(el) => { if (el) charsRef.current.push(el); }}
                        className={`inline-block ${
                          word === "Story"
                            ? "hero-gradient-text"
                            : ""
                        }`}
                        style={prefersReduced ? {} : { opacity: 0 }}
                      >
                        {char}
                      </span>
                    ))}
                  </span>
                ))}
              </h1>

              {/* ── Typewriter subtitle ──────────── */}
              <div className="text-accent/80 text-xl sm:text-2xl font-light mb-8 h-8">
                <Typewriter />
              </div>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: prefersReduced ? 0 : 1.2 }}
                className="text-white/60 text-lg sm:text-xl mb-10 leading-relaxed max-w-lg"
              >
                Discover our curated collection of premium furniture, designed to
                transform your space into a haven of comfort and style.
              </motion.p>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: prefersReduced ? 0 : 1.4 }}
                className="flex flex-wrap gap-4 mb-14"
              >
                <Link href="/products">
                  <Button variant="secondary" size="lg" className="group">
                    Explore Collection
                    <ArrowRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" size="lg" className="border-white/20 text-white hover:bg-white hover:text-primary">
                    Our Story
                  </Button>
                </Link>
              </motion.div>

              {/* ── Trust badges ──────────────────── */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: prefersReduced ? 0 : 1.8, duration: 0.6 }}
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

              {/* ── Stats ─────────────────────────── */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: prefersReduced ? 0 : 1.6 }}
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

            {/* ── Right: Overlapping Photo Stack ────── */}
            <motion.div
              style={{ y: y2 }}
              className="flex items-center justify-center relative mt-10 lg:mt-0 h-[420px] sm:h-[500px] lg:h-[560px] w-full max-w-xl lg:max-w-2xl"
            >
              {/* Back-left photo */}
              <motion.div
                initial={{ opacity: 0, x: 100, y: 80, rotate: 0 }}
                animate={{ opacity: 1, x: -110, y: -60, rotate: -15 }}
                transition={{ duration: 1, delay: prefersReduced ? 0 : 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute w-44 h-56 sm:w-52 sm:h-64 lg:w-60 lg:h-76 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 z-10"
              >
                <Image
                  src="https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=500"
                  alt="Minimalist bedroom"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 176px, (max-width: 1024px) 208px, 240px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-white text-xs font-semibold drop-shadow-lg">Bedrooms</p>
                </div>
              </motion.div>

              {/* Back-right photo */}
              <motion.div
                initial={{ opacity: 0, x: -100, y: 80, rotate: 0 }}
                animate={{ opacity: 1, x: 110, y: 30, rotate: 12 }}
                transition={{ duration: 1, delay: prefersReduced ? 0 : 0.45, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute w-44 h-56 sm:w-52 sm:h-64 lg:w-60 lg:h-76 rounded-2xl overflow-hidden shadow-2xl border-4 border-white/20 z-20"
              >
                <Image
                  src="https://images.unsplash.com/photo-1532372576444-dda954194ad0?w=500"
                  alt="Industrial dining table"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 176px, (max-width: 1024px) 208px, 240px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-3 left-3">
                  <p className="text-white text-xs font-semibold drop-shadow-lg">Dining</p>
                </div>
              </motion.div>

              {/* Center hero photo — largest, in front */}
              <motion.div
                ref={mainImageRef}
                initial={{ opacity: 0, y: 70, scale: 0.8 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                transition={{ duration: 1.1, delay: prefersReduced ? 0 : 0.6, ease: [0.25, 0.46, 0.45, 0.94] }}
                className="absolute w-52 h-72 sm:w-64 sm:h-84 lg:w-80 lg:h-[420px] rounded-3xl overflow-hidden shadow-[0_30px_70px_-15px_rgba(0,0,0,0.6)] border-4 border-white/30 z-30 transition-transform duration-200 ease-out"
                style={{
                  transform: prefersReduced
                    ? undefined
                    : `perspective(800px) rotateX(${tiltX * 0.8}deg) rotateY(${tiltY * 0.8}deg)`,
                }}
              >
                <Image
                  src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=600"
                  alt="Premium sofa"
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 208px, (max-width: 1024px) 256px, 320px"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent" />
                <div className="absolute bottom-4 left-4 right-4">
                  <p className="text-white text-sm font-bold drop-shadow-lg">Living Room</p>
                  <p className="text-white/70 text-xs mt-0.5">Our bestseller collection</p>
                </div>
              </motion.div>

              {/* Floating rating card */}
              {!prefersReduced && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.2, duration: 0.6 }}
                  className="absolute left-0 sm:left-4 top-2 sm:top-4 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-xl z-40"
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
              )}

              {/* Floating shipping card */}
              {!prefersReduced && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 1.5, duration: 0.6 }}
                  className="absolute right-0 sm:right-4 bottom-4 sm:bottom-8 bg-white/95 backdrop-blur-sm rounded-xl p-3 shadow-xl z-40"
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
              )}
            </motion.div>
          </div>
        </motion.div>

        {/* ── Scroll indicator ─────────────────────── */}
        {!prefersReduced && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: loaded ? 1 : 0 }}
            transition={{ delay: 2.5, duration: 0.6 }}
            className="absolute bottom-16 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 z-10"
          >
            <span className="text-white/30 text-[10px] tracking-widest uppercase">Scroll</span>
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
            >
              <Mouse size={20} className="text-white/30" />
            </motion.div>
          </motion.div>
        )}

        {/* ── Bottom marquee ───────────────────────── */}
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
    </>
  );
}
