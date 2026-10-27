import { Fragment, type ReactNode } from "react";

import { ImageOnlyContent } from "./image-only-content";
import { EventIllustration } from "@/components/event-illustration";
import { formatInviteDateTimeParts } from "@/lib/event-date";
import {
  illustrationAspect,
  type EventPageLayout,
} from "@/lib/event-illustration";
import { DEFAULT_BLUR_LEVEL, type BackgroundMode } from "@/lib/event-theme";
import { cn } from "@/lib/utils";

export function PublicEventView({
  title,
  details,
  eventDate,
  eventTime,
  venueName,
  address,
  titleColor,
  textColor,
  backgroundImage,
  imageUrl,
  layout = "personalized",
  backgroundMode = "gradient",
  blurLevel = DEFAULT_BLUR_LEVEL,
  variant = "page",
  children,
}: {
  title: string;
  details: string | null;
  eventDate: string;
  eventTime: string;
  venueName: string | null;
  address: string;
  /** Cor efetiva do nome do evento (só usada no layout personalizado). */
  titleColor: string;
  /** Cor efetiva de detalhes, data/horário e local (só usada no layout personalizado). */
  textColor: string;
  /** Gradiente de fundo (cor 1 em cima, cor 2 embaixo). */
  backgroundImage: string;
  imageUrl?: string | null;
  layout?: EventPageLayout;
  /** Fundo do layout Somente imagem; nos demais layouts é ignorado. */
  backgroundMode?: BackgroundMode;
  /** Nível efetivo do desfoque (0 a 100), usado só no modo desfoque. */
  blurLevel?: number;
  variant?: "page" | "preview";
  children: ReactNode;
}) {
  const trimmedDetails = details?.trim();
  const titleStyle = { color: titleColor };
  const textStyle = { color: textColor };
  const isPreview = variant === "preview";
  const isImageOnly = layout === "image_only";

  return (
    <div
      className={
        isPreview
          ? "relative overflow-hidden rounded-xl ring-1 ring-foreground/10"
          : "relative flex min-h-full flex-1 flex-col"
      }
      style={{ backgroundImage }}
    >
      <main
        className={cn(
          "mx-auto flex w-full max-w-xl flex-1 flex-col",
          isPreview ? "gap-8 px-4 py-8" : "gap-12 px-6 py-16"
        )}
      >
        {isImageOnly ? (
          imageUrl ? (
            <ImageOnlyContent
              imageUrl={imageUrl}
              alt={title}
              backgroundMode={backgroundMode}
              blurLevel={blurLevel}
              isPreview={isPreview}
            >
              {children}
            </ImageOnlyContent>
          ) : (
            children
          )
        ) : (
          <>
            {imageUrl ? (
              <EventIllustration
                src={imageUrl}
                alt={title}
                aspect={illustrationAspect(layout)}
              />
            ) : null}

            <header className="flex flex-col gap-4 text-center">
              <h1
                className={cn(
                  "font-heading leading-none tracking-tight",
                  isPreview ? "text-3xl" : "text-5xl sm:text-6xl"
                )}
                style={titleStyle}
              >
                {title}
              </h1>
              {trimmedDetails ? (
                <p className="mx-auto max-w-sm" style={textStyle}>
                  {trimmedDetails}
                </p>
              ) : null}
            </header>

            <section className="flex flex-col items-center gap-2 border-y border-border py-6 text-center font-heading text-lg">
              <p
                className="flex flex-wrap items-center justify-center gap-x-3 text-xl sm:gap-x-4 sm:text-2xl"
                style={textStyle}
              >
                {formatInviteDateTimeParts(eventDate, eventTime).map(
                  (part, index) => (
                    <Fragment key={part}>
                      {index > 0 ? <span aria-hidden="true">|</span> : null}
                      <span>{part}</span>
                    </Fragment>
                  )
                )}
              </p>
              {venueName?.trim() ? (
                <p style={textStyle}>{venueName.trim()}</p>
              ) : null}
              <p style={textStyle}>{address}</p>
            </section>

            {children}
          </>
        )}
      </main>
    </div>
  );
}
