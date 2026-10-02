"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Faixa 4:1 da imagem do evento. Some se o arquivo não carregar.
 */
export function EventIllustration({
  src,
  alt,
  className,
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={cn("aspect-[4/1] w-full overflow-hidden", className)}>
      {/* Rota própria do evento; next/image não se aplica. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt={alt}
        className="size-full object-fill"
        onError={() => setIsVisible(false)}
      />
    </div>
  );
}
