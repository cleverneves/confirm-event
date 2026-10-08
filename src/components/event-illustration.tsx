"use client";

import { useState } from "react";

import { cn } from "@/lib/utils";
import type { IllustrationAspect } from "@/lib/event-illustration";

const aspectClassName: Record<IllustrationAspect, string> = {
  banner: "aspect-[4/1]",
  portrait: "aspect-[700/923]",
};

/**
 * Imagem do evento na proporção do layout. Some se o arquivo não carregar.
 */
export function EventIllustration({
  src,
  alt,
  aspect = "banner",
  className,
}: {
  src: string;
  alt: string;
  aspect?: IllustrationAspect;
  className?: string;
}) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) {
    return null;
  }

  return (
    <div className={cn(aspectClassName[aspect], "w-full overflow-hidden", className)}>
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
