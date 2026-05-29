"use client";

import { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import {
  Mail,
  Phone,
  MapPin,
  ChevronDown,
  Send,
  Shield,
  Lock,
} from "lucide-react";
import { SITE_NAME } from "@/lib/constants";
import AnimatedSection from "@/components/ui/AnimatedSection";

const footerLinks = {
  shop: [
    { label: "All Products", href: "/products" },
    { label: "Sofas", href: "/products?category=Sofas" },
    { label: "Tables", href: "/products?category=Tables" },
    { label: "Chairs", href: "/products?category=Chairs" },
    { label: "Beds", href: "/products?category=Beds" },
    { label: "Storage", href: "/products?category=Storage" },
  ],
  company: [
    { label: "About Us", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Orders", href: "/orders" },
    { label: "Careers", href: "/about" },
  ],
  support: [
    { label: "Shipping Info", href: "/contact" },
    { label: "Returns & Exchanges", href: "/contact" },
    { label: "FAQ", href: "/contact" },
    { label: "Warranty", href: "/contact" },
  ],
};

const socials = [
  { label: "Facebook", href: "#", icon: "M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" },
  { label: "Instagram", href: "#", icon: "M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37zM17.5 6.5h.01M7.5 2h9A5.5 5.5 0 0122 7.5v9a5.5 5.5 0 01-5.5 5.5h-9A5.5 5.5 0 012 16.5v-9A5.5 5.5 0 017.5 2z" },
  { label: "X", href: "#", icon: "M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" },
  { label: "Pinterest", href: "#", icon: "M12 2C6.477 2 2 6.477 2 12c0 4.237 2.636 7.855 6.356 9.312-.088-.791-.167-2.005.035-2.868.181-.78 1.172-4.97 1.172-4.97s-.299-.598-.299-1.482c0-1.388.806-2.425 1.808-2.425.853 0 1.265.64 1.265 1.408 0 .858-.546 2.14-.828 3.33-.236.995.499 1.806 1.48 1.806 1.778 0 3.144-1.874 3.144-4.58 0-2.393-1.72-4.068-4.177-4.068-2.845 0-4.515 2.135-4.515 4.34 0 .859.331 1.781.745 2.281a.3.3 0 01.069.288l-.278 1.133c-.044.183-.145.222-.335.134-1.249-.581-2.03-2.407-2.03-3.874 0-3.154 2.292-6.052 6.608-6.052 3.469 0 6.165 2.473 6.165 5.776 0 3.447-2.173 6.22-5.19 6.22-1.013 0-1.965-.527-2.291-1.148l-.623 2.378c-.226.869-.835 1.958-1.244 2.621.937.29 1.931.449 2.962.449 5.523 0 10-4.477 10-10S17.523 2 12 2z" },
];

function MobileAccordion({
  title,
  children,
}: {
  title: string;
  children: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 lg:border-0">
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center justify-between w-full py-4 lg:py-0 lg:pointer-events-none"
      >
        <h3 className="font-semibold text-lg">{title}</h3>
        <ChevronDown
          size={18}
          className={`lg:hidden transition-transform duration-300 ${
            open ? "rotate-180" : ""
          }`}
        />
      </button>
      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="overflow-hidden lg:!h-auto lg:!opacity-100 lg:overflow-visible"
          >
            <div className="pb-4 lg:pb-0">{children}</div>
          </motion.div>
        )}
      </AnimatePresence>
      <div className="hidden lg:block">{children}</div>
    </div>
  );
}

export default function Footer() {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
      setEmail("");
    }
  };

  return (
    <footer className="bg-primary text-white">
      {/* ── Main footer ──────────────────────────── */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8">
          {/* Brand + Contact + Newsletter */}
          <div className="lg:col-span-4">
            <Link href="/" className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 bg-accent rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-lg">W</span>
              </div>
              <span className="text-xl font-bold">{SITE_NAME}</span>
            </Link>
            <p className="text-white/60 text-sm leading-relaxed mb-6">
              Premium handcrafted furniture designed for modern living. Quality
              materials, timeless designs.
            </p>

            {/* Contact */}
            <div className="space-y-2.5 text-sm text-white/60 mb-8">
              <a href="mailto:hello@woodcraft.com" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Mail size={14} className="shrink-0" />
                <span>hello@woodcraft.com</span>
              </a>
              <a href="tel:+635551234567" className="flex items-center gap-2 hover:text-accent transition-colors">
                <Phone size={14} className="shrink-0" />
                <span>(555) 123-4567</span>
              </a>
              <div className="flex items-center gap-2">
                <MapPin size={14} className="shrink-0" />
                <span>123 Furniture Lane, Design City</span>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="font-semibold text-sm mb-3">Stay Updated</h4>
              {subscribed ? (
                <p className="text-accent text-sm">Thanks for subscribing!</p>
              ) : (
                <form onSubmit={handleSubscribe} className="flex gap-2">
                  <input
                    type="email"
                    placeholder="Your email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="flex-1 px-3 py-2 bg-white/10 border border-white/10 rounded-lg text-sm placeholder:text-white/30 focus:border-accent focus:ring-1 focus:ring-accent/30 min-w-0"
                  />
                  <button
                    type="submit"
                    className="px-3 py-2 bg-accent rounded-lg hover:bg-accent-light transition-colors shrink-0"
                  >
                    <Send size={16} />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Shop Links */}
          <div className="lg:col-span-2 lg:col-start-6">
            <MobileAccordion title="Shop">
              <ul className="space-y-2.5">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-accent transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </MobileAccordion>
          </div>

          {/* Company Links */}
          <div className="lg:col-span-2">
            <MobileAccordion title="Company">
              <ul className="space-y-2.5">
                {footerLinks.company.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-accent transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </MobileAccordion>
          </div>

          {/* Support Links */}
          <div className="lg:col-span-2">
            <MobileAccordion title="Support">
              <ul className="space-y-2.5">
                {footerLinks.support.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-white/60 hover:text-accent transition-colors text-sm"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </MobileAccordion>
          </div>

          {/* Social + Trust */}
          <div className="lg:col-span-2">
            <h3 className="font-semibold text-lg mb-4 hidden lg:block">
              Follow Us
            </h3>
            <h3 className="font-semibold text-lg mb-4 lg:hidden">Connect</h3>

            {/* Social icons */}
            <div className="flex gap-3 mb-8">
              {socials.map((social) => (
                <a
                  key={social.label}
                  href={social.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-accent/30 transition-colors"
                  aria-label={social.label}
                >
                  <svg
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="w-4 h-4"
                  >
                    <path d={social.icon} />
                  </svg>
                </a>
              ))}
            </div>

            {/* Trust badges */}
            <div className="space-y-3">
              {[
                { icon: Lock, text: "SSL Secure" },
                { icon: Shield, text: "Buyer Protection" },
              ].map(({ icon: Icon, text }) => (
                <div key={text} className="flex items-center gap-2 text-white/40 text-xs">
                  <Icon size={12} />
                  <span>{text}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ── Payment methods + copyright ──────────── */}
      <div className="border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            {/* Visa */}
            <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-label="Visa">
              <rect width="48" height="32" rx="4" fill="#1A1F71"/>
              <path d="M19.5 21h-3l1.9-11h3l-1.9 11zm7.8-10.7c-.6-.2-1.5-.5-2.7-.5-3 0-5 1.5-5 3.7 0 1.6 1.5 2.6 2.6 3.1 1.2.6 1.6.9 1.6 1.5 0 .8-1 1.2-1.9 1.2-1.2 0-1.9-.2-2.9-.6l-.4-.2-.4 2.5c.7.3 2 .6 3.4.6 3.2 0 5.3-1.5 5.3-3.8 0-1.3-.8-2.3-2.5-3.1-1-.5-1.7-.9-1.7-1.4 0-.5.6-1 1.8-1 1 0 1.8.2 2.4.5l.3.1.5-2.5zm6.4 0h-2.3c-.7 0-1.3.2-1.6.9l-4.5 10.1h3.2l.6-1.7h3.9l.4 1.7h2.8l-2.5-11zm-3.7 7.1l1.6-4.3.9 4.3h-2.5zM16.3 10l-2.8 7.5-.3-1.5c-.5-1.7-2.1-3.5-3.9-4.4l2.7 10h3.3l4.8-11.6h-3.8z" fill="#fff"/>
            </svg>
            {/* Mastercard */}
            <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-label="Mastercard">
              <rect width="48" height="32" rx="4" fill="#252525"/>
              <circle cx="19" cy="16" r="8" fill="#EB001B"/>
              <circle cx="29" cy="16" r="8" fill="#F79E1B"/>
              <path d="M24 10.2a8 8 0 010 11.6 8 8 0 000-11.6z" fill="#FF5F00"/>
            </svg>
            {/* GCash */}
            <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-label="GCash">
              <rect width="48" height="32" rx="4" fill="#007DFE"/>
              <text x="24" y="20" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif">GCash</text>
            </svg>
            {/* Maya */}
            <svg viewBox="0 0 48 32" className="h-6 w-auto" aria-label="Maya">
              <rect width="48" height="32" rx="4" fill="#00C4B4"/>
              <text x="24" y="20" textAnchor="middle" fill="#fff" fontSize="11" fontWeight="bold" fontFamily="Arial, sans-serif">Maya</text>
            </svg>
          </div>
          <p className="text-white/30 text-xs text-center sm:text-right">
            &copy; 2026 {SITE_NAME}. All rights reserved. Made with care.
          </p>
        </div>
      </div>
    </footer>
  );
}
