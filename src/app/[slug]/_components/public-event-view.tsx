import type { ReactNode } from "react";

import { EventIllustration } from "@/components/event-illustration";
import { cn } from "@/lib/utils";
import { formatEventDate, formatEventTime } from "@/lib/event-date";

function Detail({
  label,
  value,
  titleColor,
}: {
  label: string;
  value: string;
  titleColor: string | null;
}) {
  return (
    <div className="flex flex-col gap-1">
      <dt
        className={cn("text-sm", titleColor ? undefined : "text-muted-foreground")}
        style={titleColor ? { color: titleColor } : undefined}
      >
        {label}
      </dt>
      <dd
        className="font-heading text-lg"
        style={titleColor ? { color: titleColor } : undefined}
      >
        {value}
      </dd>
    </div>
  );
}

export function PublicEventView({
  title,
  details,
  eventDate,
  eventTime,
  location,
  titleColor,
  backgroundColor,
  imageUrl,
  variant = "page",
  children,
}: {
  title: string;
  details: string | null;
  eventDate: string;
  eventTime: string;
  location: string;
  titleColor: string | null;
  backgroundColor?: string | null;
  imageUrl?: string | null;
  variant?: "page" | "preview";
  children: ReactNode;
}) {
  const trimmedDetails = details?.trim();
  const titleStyle = titleColor ? { color: titleColor } : undefined;
  const mutedClass = titleColor ? undefined : "text-muted-foreground";
  const isPreview = variant === "preview";

  return (
    <div
      className={
        isPreview
          ? "overflow-hidden rounded-xl ring-1 ring-foreground/10"
          : "flex min-h-full flex-1 flex-col"
      }
      style={backgroundColor ? { backgroundColor } : undefined}
    >
      <main
        className={cn(
          "mx-auto flex w-full max-w-xl flex-1 flex-col",
          isPreview ? "gap-8 px-4 py-8" : "gap-12 px-6 py-16"
        )}
      >
        {imageUrl ? <EventIllustration src={imageUrl} alt={title} /> : null}

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
            <p className={cn("mx-auto max-w-sm", mutedClass)} style={titleStyle}>
              {trimmedDetails}
            </p>
          ) : null}
        </header>

        <dl className="grid gap-4 border-y border-border py-6 sm:grid-cols-3">
          <Detail
            label="Data"
            value={formatEventDate(eventDate)}
            titleColor={titleColor}
          />
          <Detail
            label="Horário"
            value={formatEventTime(eventTime)}
            titleColor={titleColor}
          />
          <Detail label="Local" value={location} titleColor={titleColor} />
        </dl>

        {children}
      </main>
    </div>
  );
}
