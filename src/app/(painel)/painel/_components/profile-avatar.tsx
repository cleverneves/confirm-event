"use client";

import { UserRoundIcon } from "lucide-react";
import { useEffect, useState } from "react";

import { cn } from "@/lib/utils";

/**
 * Avatar circular do organizador. Ícone genérico se não houver src ou se a imagem falhar.
 */
export function ProfileAvatar({
  src,
  alt,
  className,
  iconClassName,
}: {
  src?: string | null;
  alt: string;
  className?: string;
  iconClassName?: string;
}) {
  const [showImage, setShowImage] = useState(Boolean(src));

  useEffect(() => {
    setShowImage(Boolean(src));
  }, [src]);

  const shouldShowImage = Boolean(src) && showImage;

  return (
    <div
      className={cn(
        "relative shrink-0 overflow-hidden rounded-full bg-muted",
        className
      )}
      aria-hidden={!alt}
    >
      {shouldShowImage ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={src ?? undefined}
          alt={alt}
          className="size-full object-cover object-center"
          onError={() => setShowImage(false)}
        />
      ) : (
        <span className="flex size-full items-center justify-center text-muted-foreground">
          <UserRoundIcon className={cn("size-[55%]", iconClassName)} />
        </span>
      )}
    </div>
  );
}
