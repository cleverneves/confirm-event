import { ConfirmationSection } from "./confirmation-form";
import { PublicEventView } from "./public-event-view";
import { SoldOutBoundary } from "./sold-out-boundary";
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
    backgroundMode: event.backgroundMode,
    blurLevel: event.blurLevel,
  });
  const isPersonalized = event.pageLayout === "personalized";

  return (
    <SoldOutBoundary
      initialSoldOut={event.isSoldOut}
      soldOutMessage={<SoldOutEvent title={event.title} />}
    >
      <PublicEventView
        title={event.title}
        details={event.details}
        eventDate={event.eventDate}
        eventTime={event.eventTime}
        venueName={event.venueName}
        address={event.address}
        titleColor={theme.effectiveTitleColor}
        textColor={theme.effectiveTextColor}
        backgroundImage={theme.backgroundImage}
        imageUrl={event.imageUrl}
        layout={event.pageLayout}
        backgroundMode={theme.backgroundMode}
        blurLevel={theme.effectiveBlurLevel}
      >
        <ConfirmationSection
          slug={slug}
          acceptsConfirmation={event.acceptsConfirmation}
          buttonColor={theme.buttonColor}
          buttonTextColor={theme.buttonTextColor}
          textColor={isPersonalized ? theme.effectiveTextColor : null}
        />
      </PublicEventView>
    </SoldOutBoundary>
  );
}

export function SoldOutEvent({ title }: { title: string }) {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 flex-col justify-center px-6 py-16 text-center">
      <p className="font-heading text-2xl leading-snug">
        Convites esgotados para o evento {title}. Agradecemos pelo seu interesse.
      </p>
    </main>
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
