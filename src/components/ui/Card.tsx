"use client";

import { cn } from "@/lib/utils";

interface CardProps {
  children: React.ReactNode;
  className?: string;
  hover?: boolean;
  padding?: "none" | "sm" | "md" | "lg";
}

export default function Card({
  children,
  className,
  hover = false,
  padding = "md",
}: CardProps) {
  return (
    <div
      className={cn(
        "bg-white rounded-xl border border-surface-dark shadow-sm",
        hover && "transition-shadow duration-300 hover:shadow-md",
        {
          "p-0": padding === "none",
          "p-3": padding === "sm",
          "p-5": padding === "md",
          "p-8": padding === "lg",
        },
        className
      )}
    >
      {children}
    </div>
  );
}
