"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

import {
  EventSideMenu,
  type MenuCollapseOverride,
} from "./event-side-menu";
import type { PainelEvent } from "../_data-access/get-event";

export function EventSection({
  event,
  children,
}: {
  event: Pick<PainelEvent, "id" | "title">;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const [collapseOverride, setCollapseOverride] =
    useState<MenuCollapseOverride>(null);

  const eventPath = `/painel/eventos/${event.id}`;
  const guestsPath = `${eventPath}/convidados`;
  const settingsPath = `${eventPath}/configuracoes`;
  const isGuestsPage = pathname === guestsPath;
  const isSettingsPage = pathname === settingsPath;
  const isSubAreaPage = isGuestsPage || isSettingsPage;

  return (
    <div className="flex flex-col gap-4">
      <nav
        aria-label="Caminho"
        className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground"
      >
        <Link href="/painel" className="hover:text-foreground">
          Meus Eventos
        </Link>
        <span aria-hidden="true">/</span>
        {isSubAreaPage ? (
          <>
            <Link href={eventPath} className="hover:text-foreground">
              {event.title}
            </Link>
            <span aria-hidden="true">/</span>
            <span className="text-foreground">
              {isGuestsPage ? "Convidados" : "Configurações"}
            </span>
          </>
        ) : (
          <span className="text-foreground">{event.title}</span>
        )}
      </nav>

      <div className="flex min-w-0 flex-row items-start gap-4 lg:gap-6">
        <EventSideMenu
          event={event}
          collapseOverride={collapseOverride}
          onCollapseOverrideChange={setCollapseOverride}
        />
        <div className="min-w-0 flex-1">{children}</div>
      </div>
    </div>
  );
}
