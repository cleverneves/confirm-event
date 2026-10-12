"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ReactNode,
} from "react";

import { EventIllustration } from "@/components/event-illustration";
import {
  BLUR_BACKGROUND_SCALE_PERCENT,
  BLUR_RADIUS_CQMIN_PER_LEVEL,
  type BackgroundMode,
} from "@/lib/event-theme";
import { cn } from "@/lib/utils";

/**
 * Conteúdo do layout Somente imagem: arte nítida e confirmação, com a foto do
 * evento ampliada e desfocada atrás quando o fundo é o desfoque. Se a imagem não
 * carregar, a arte, o fundo desfocado e a superfície clara somem e a página fica
 * no gradiente.
 */
export function ImageOnlyContent({
  imageUrl,
  alt,
  backgroundMode,
  blurLevel,
  isPreview,
  children,
}: {
  imageUrl: string;
  alt: string;
  backgroundMode: BackgroundMode;
  /** Nível efetivo do desfoque, de 0 a 100. */
  blurLevel: number;
  isPreview: boolean;
  children: ReactNode;
}) {
  const [hasImageFailed, setHasImageFailed] = useState(false);
  const handleImageError = useCallback(() => setHasImageFailed(true), []);

  // A imagem muda quando o evento é atualizado; a nova URL recomeça a tentativa.
  const [trackedUrl, setTrackedUrl] = useState(imageUrl);
  if (trackedUrl !== imageUrl) {
    setTrackedUrl(imageUrl);
    setHasImageFailed(false);
  }

  const hasBlurBackground = backgroundMode === "blur" && !hasImageFailed;

  return (
    <>
      {hasBlurBackground ? (
        <BlurredBackdrop
          src={imageUrl}
          blurLevel={blurLevel}
          isPreview={isPreview}
          onError={handleImageError}
        />
      ) : null}

      <EventIllustration
        src={imageUrl}
        alt={alt}
        aspect="portrait"
        className="relative"
        onError={handleImageError}
      />

      {hasBlurBackground ? (
        <div className="relative rounded-xl bg-card p-6 text-card-foreground shadow-panel ring-1 ring-foreground/10">
          {children}
        </div>
      ) : (
        children
      )}
    </>
  );
}

function BlurredBackdrop({
  src,
  blurLevel,
  isPreview,
  onError,
}: {
  src: string;
  blurLevel: number;
  isPreview: boolean;
  onError: () => void;
}) {
  const imageRef = useRef<HTMLImageElement>(null);

  // Falhas anteriores à hidratação não disparam onError.
  useEffect(() => {
    const image = imageRef.current;

    if (image?.complete && image.naturalWidth === 0) {
      onError();
    }
  }, [onError, src]);

  return (
    <div
      aria-hidden="true"
      className={cn(
        "pointer-events-none inset-0 z-0 overflow-hidden [container-type:size]",
        isPreview ? "absolute" : "fixed"
      )}
    >
      {/* Mesma rota da arte nítida; next/image não se aplica. */}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        ref={imageRef}
        src={src}
        alt=""
        className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2 object-cover"
        style={{
          width: `${BLUR_BACKGROUND_SCALE_PERCENT}%`,
          height: `${BLUR_BACKGROUND_SCALE_PERCENT}%`,
          filter: `blur(calc(${blurLevel} * ${BLUR_RADIUS_CQMIN_PER_LEVEL}cqmin))`,
        }}
        onError={onError}
      />
    </div>
  );
}
