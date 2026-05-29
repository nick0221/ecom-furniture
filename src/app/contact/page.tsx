"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Send, ChevronDown, MapPin, Phone, Mail, Clock } from "lucide-react";
import Breadcrumb from "@/components/layout/Breadcrumb";
import AnimatedSection from "@/components/ui/AnimatedSection";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";

const contactSchema = z.object({
  name: z.string().min(2),
  email: z.string().email(),
  subject: z.string().min(3),
  message: z.string().min(10),
});

type ContactForm = z.infer<typeof contactSchema>;

const faqs = [
  {
    question: "What is your delivery timeframe?",
    answer:
      "Standard delivery takes 3-5 business days. White glove delivery service is available for large items and takes 5-7 business days.",
  },
  {
    question: "Do you offer assembly services?",
    answer:
      "Yes, we offer professional assembly for most of our furniture. This can be added during checkout for an additional fee.",
  },
  {
    question: "What is your return policy?",
    answer:
      "We offer a 30-day return policy for all standard items. Custom orders are final sale. Items must be in original condition.",
  },
  {
    question: "Can I track my order?",
    answer:
      "Yes, once your order ships, you'll receive a tracking number via email. You can also check your order status in your account dashboard.",
  },
  {
    question: "Do you ship internationally?",
    answer:
      "Currently, we ship within the continental United States. International shipping is available for select items - please contact us for details.",
  },
];

const contactInfo = [
  {
    icon: MapPin,
    label: "Visit Us",
    value: "123 Furniture Lane, Design City, DC 10001",
  },
  {
    icon: Phone,
    label: "Call Us",
    value: "(555) 123-4567",
  },
  {
    icon: Mail,
    label: "Email Us",
    value: "hello@woodcraft.com",
  },
  {
    icon: Clock,
    label: "Business Hours",
    value: "Mon-Sat: 9AM - 7PM",
  },
];

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(null);

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactForm>({
    resolver: zodResolver(contactSchema),
  });

  const onSubmit = async (data: ContactForm) => {
    await new Promise((r) => setTimeout(r, 500));
    setSubmitted(true);
    reset();
    setTimeout(() => setSubmitted(false), 5000);
  };

  return (
    <div className="min-h-screen bg-surface">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Breadcrumb items={[{ label: "Contact" }]} />

        <AnimatedSection className="mt-6 mb-12">
          <h1 className="text-3xl lg:text-4xl font-bold text-primary">
            Get in Touch
          </h1>
          <p className="text-muted mt-2">
            We&apos;d love to hear from you. Reach out with questions, feedback,
            or just to say hello.
          </p>
        </AnimatedSection>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
          {/* Contact Form */}
          <AnimatedSection className="lg:col-span-2">
            <div className="bg-white rounded-xl p-6 lg:p-8 border border-surface-dark">
              <h2 className="text-xl font-semibold text-primary mb-6">
                Send a Message
              </h2>

              <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <Input
                    label="Name"
                    placeholder="Your name"
                    error={errors.name?.message}
                    {...register("name")}
                  />
                  <Input
                    label="Email"
                    type="email"
                    placeholder="your@email.com"
                    error={errors.email?.message}
                    {...register("email")}
                  />
                </div>
                <Input
                  label="Subject"
                  placeholder="How can we help?"
                  error={errors.subject?.message}
                  {...register("subject")}
                />
                <div>
                  <label className="block text-sm font-medium text-primary mb-1.5">
                    Message
                  </label>
                  <textarea
                    placeholder="Tell us more..."
                    rows={5}
                    className="w-full px-4 py-2.5 rounded-lg border border-surface-dark bg-white text-primary placeholder:text-muted transition-colors duration-200 focus:border-accent focus:ring-2 focus:ring-accent/20 resize-none"
                    {...register("message")}
                  />
                  {errors.message && (
                    <p className="mt-1 text-sm text-danger">
                      {errors.message.message}
                    </p>
                  )}
                </div>

                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0 }}
                      className="p-3 bg-green-50 border border-green-200 rounded-lg text-sm text-success"
                    >
                      Message sent successfully! We&apos;ll get back to you
                      soon.
                    </motion.div>
                  )}
                </AnimatePresence>

                <Button type="submit" size="lg">
                  <Send size={16} className="mr-2" />
                  Send Message
                </Button>
              </form>
            </div>
          </AnimatedSection>

          {/* Contact Info */}
          <AnimatedSection delay={0.1}>
            <div className="space-y-4">
              {contactInfo.map((info) => (
                <div
                  key={info.label}
                  className="bg-white rounded-xl p-5 border border-surface-dark"
                >
                  <div className="flex items-start gap-3">
                    <info.icon size={20} className="text-accent mt-0.5 shrink-0" />
                    <div>
                      <p className="text-sm font-medium text-primary">
                        {info.label}
                      </p>
                      <p className="text-sm text-muted">{info.value}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </AnimatedSection>
        </div>

        {/* FAQ */}
        <AnimatedSection className="mt-16">
          <h2 className="text-2xl font-bold text-primary mb-8 text-center">
            Frequently Asked Questions
          </h2>
          <div className="max-w-3xl mx-auto space-y-3">
            {faqs.map((faq, i) => (
              <div
                key={i}
                className="bg-white rounded-xl border border-surface-dark overflow-hidden"
              >
                <button
                  onClick={() => setOpenFaq(openFaq === i ? null : i)}
                  className="w-full flex items-center justify-between p-5 text-left"
                >
                  <span className="font-medium text-primary">
                    {faq.question}
                  </span>
                  <ChevronDown
                    size={18}
                    className={`text-muted transition-transform ${
                      openFaq === i ? "rotate-180" : ""
                    }`}
                  />
                </button>
                <AnimatePresence>
                  {openFaq === i && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      <div className="px-5 pb-5 text-sm text-primary/70 leading-relaxed">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        </AnimatedSection>
      </div>
    </div>
  );
}
