import type { ReactNode } from "react";

import { EventIllustration } from "@/components/event-illustration";
import { formatInviteDateTimeLine } from "@/lib/event-date";
import {
  illustrationAspect,
  type EventPageLayout,
} from "@/lib/event-illustration";
import { cn } from "@/lib/utils";

export function PublicEventView({
  title,
  details,
  eventDate,
  eventTime,
  location,
  titleColor,
  textColor,
  backgroundImage,
  imageUrl,
  layout = "personalized",
  variant = "page",
  children,
}: {
  title: string;
  details: string | null;
  eventDate: string;
  eventTime: string;
  location: string;
  /** Cor efetiva do nome do evento (só usada no layout personalizado). */
  titleColor: string;
  /** Cor efetiva de detalhes, data/horário e local (só usada no layout personalizado). */
  textColor: string;
  /** Gradiente de fundo (cor 1 em cima, cor 2 embaixo). */
  backgroundImage: string;
  imageUrl?: string | null;
  layout?: EventPageLayout;
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
          ? "overflow-hidden rounded-xl ring-1 ring-foreground/10"
          : "flex min-h-full flex-1 flex-col"
      }
      style={{ backgroundImage }}
    >
      <main
        className={cn(
          "mx-auto flex w-full max-w-xl flex-1 flex-col",
          isPreview ? "gap-8 px-4 py-8" : "gap-12 px-6 py-16"
        )}
      >
        {imageUrl ? (
          <EventIllustration
            src={imageUrl}
            alt={title}
            aspect={illustrationAspect(layout)}
          />
        ) : null}

        {isImageOnly ? null : (
          <>
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
              <p style={textStyle}>
                {formatInviteDateTimeLine(eventDate, eventTime)}
              </p>
              <p style={textStyle}>{location}</p>
            </section>
          </>
        )}

        {children}
      </main>
    </div>
  );
}
