"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Send, Check } from "lucide-react";
import AnimatedSection from "@/components/ui/AnimatedSection";

export default function Newsletter() {
  const [email, setEmail] = useState("");
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubmitted(true);
      setEmail("");
    }
  };

  return (
    <section className="py-20 bg-primary relative overflow-hidden">
      <div className="absolute inset-0 opacity-5">
        <div
          className="absolute inset-0"
          style={{
            backgroundImage: `radial-gradient(circle at 20px 20px, white 1%, transparent 0%)`,
            backgroundSize: "40px 40px",
          }}
        />
      </div>
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
        <AnimatedSection>
          <h2 className="text-3xl lg:text-4xl font-bold text-white mb-4">
            Stay in the Loop
          </h2>
          <p className="text-white/60 mb-8 max-w-lg mx-auto">
            Subscribe to our newsletter for exclusive offers, design tips, and
            early access to new collections.
          </p>

          {submitted ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="flex items-center justify-center gap-2 text-accent text-lg font-medium"
            >
              <Check size={20} />
              Thank you for subscribing!
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto"
            >
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="flex-1 px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder:text-white/40 focus:border-accent focus:ring-1 focus:ring-accent/30"
              />
              <button
                type="submit"
                className="px-6 py-3 bg-accent text-white rounded-lg font-medium hover:bg-accent-light transition-colors flex items-center justify-center gap-2"
              >
                Subscribe
                <Send size={16} />
              </button>
            </form>
          )}
        </AnimatedSection>
      </div>
    </section>
  );
}
