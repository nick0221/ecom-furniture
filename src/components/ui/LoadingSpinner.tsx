"use client";

import { useEffect, useState } from "react";

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg";
}

export default function LoadingSpinner({ size = "md" }: LoadingSpinnerProps) {
  return (
    <div
      className={`animate-spin rounded-full border-2 border-surface-dark border-t-accent ${
        size === "sm" ? "h-5 w-5" : size === "md" ? "h-8 w-8" : "h-12 w-12"
      }`}
    />
  );
}

export function PageLoader() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-surface">
      <LoadingSpinner size="lg" />
    </div>
  );
}

export function ProductCardSkeleton() {
  return (
    <div className="bg-white rounded-xl border border-surface-dark overflow-hidden">
      <div className="aspect-square animate-shimmer" />
      <div className="p-4 space-y-3">
        <div className="h-4 w-3/4 animate-shimmer rounded" />
        <div className="h-3 w-1/2 animate-shimmer rounded" />
        <div className="h-5 w-1/3 animate-shimmer rounded" />
      </div>
    </div>
  );
}
