"use client";

import { useRef, useState } from "react";
import Image from "next/image";

interface ImageZoomProps {
  src: string;
  alt: string;
  sizes?: string;
}

export default function ImageZoom({ src, alt, sizes }: ImageZoomProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const [position, setPosition] = useState({ x: 50, y: 50 });
  const [zooming, setZooming] = useState(false);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setPosition({ x, y });
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full h-full overflow-hidden cursor-crosshair"
      onMouseMove={handleMouseMove}
      onMouseEnter={() => setZooming(true)}
      onMouseLeave={() => setZooming(false)}
    >
      <Image
        src={src}
        alt={alt}
        fill
        className="object-cover transition-transform duration-200"
        style={{
          transform: zooming ? "scale(1.8)" : "scale(1)",
          transformOrigin: `${position.x}% ${position.y}%`,
        }}
        sizes={sizes || "(max-width: 1024px) 100vw, 50vw"}
        priority
      />
      {zooming && (
        <div className="absolute inset-0 pointer-events-none border-2 border-accent/30 rounded-2xl" />
      )}
    </div>
  );
}
