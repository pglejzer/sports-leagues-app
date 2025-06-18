"use client";

import { useState } from "react";
import Image from "next/image";
import { Loader2 } from "lucide-react";

interface LazyImageProps {
  src: string;
  alt: string;
  className?: string;
  fallback?: React.ReactNode;
  width: number;
  height: number;
  priority?: boolean;
}

export const LazyImage = ({
  src,
  alt,
  className = "",
  fallback,
  width,
  height,
  priority = false,
}: LazyImageProps) => {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex items-center justify-center ${className}`}>
        {fallback || (
          <div className="text-center py-4">
            <p className="text-sm text-red-500">Failed to load image</p>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className={`relative ${className}`} style={{ width, height }}>
      {loading && (
        <div className="absolute inset-0 flex items-center justify-center z-10">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
        </div>
      )}
      <Image
        src={src}
        alt={alt}
        width={width}
        height={height}
        priority={priority}
        className={`transition-opacity duration-200 ${
          loading ? "opacity-0" : "opacity-100"
        }`}
        onLoadingComplete={() => setLoading(false)}
        onError={() => {
          setLoading(false);
          setError(true);
        }}
      />
    </div>
  );
};

