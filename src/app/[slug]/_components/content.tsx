import { ConfirmationSection } from "./confirmation-form";
import { PublicEventView } from "./public-event-view";
import type { PublicEvent } from "../_data-access/get-event-by-slug";
import { resolveEventTheme } from "@/lib/event-theme";

export function PublicContent({
  event,
  slug,
}: {
  event: PublicEvent;
  slug: string;
}) {
  const theme = resolveEventTheme({
    backgroundColor1: event.backgroundColor1,
    backgroundColor2: event.backgroundColor2,
    titleColor: event.titleColor,
    textColor: event.textColor,
  });
  const isPersonalized = event.pageLayout === "personalized";

  return (
    <PublicEventView
      title={event.title}
      details={event.details}
      eventDate={event.eventDate}
      eventTime={event.eventTime}
      location={event.location}
      titleColor={theme.effectiveTitleColor}
      textColor={theme.effectiveTextColor}
      backgroundImage={theme.backgroundImage}
      imageUrl={event.imageUrl}
      layout={event.pageLayout}
    >
      <ConfirmationSection
        slug={slug}
        acceptsConfirmation={event.acceptsConfirmation}
        buttonColor={theme.buttonColor}
        buttonTextColor={theme.buttonTextColor}
        textColor={isPersonalized ? theme.effectiveTextColor : null}
      />
    </PublicEventView>
  );
}

export function UnavailableEvent() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center gap-4 px-6 py-16 text-center">
      <h1 className="font-heading text-3xl leading-none">Evento indisponível</h1>
      <p className="text-muted-foreground">
        Este evento não está disponível. Confira o link com quem organizou.
      </p>
    </main>
  );
}
