"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  PanelLeftClose,
  PanelLeftOpen,
  SettingsIcon,
  UsersIcon,
} from "lucide-react";
import { useSyncExternalStore, type ReactNode } from "react";

import type { PainelEvent } from "../_data-access/get-event";
import { Button } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

const LG_MEDIA = "(min-width: 1024px)";

export type MenuCollapseOverride = boolean | null;

function subscribeToLgViewport(onChange: () => void) {
  const media = window.matchMedia(LG_MEDIA);
  media.addEventListener("change", onChange);
  return () => media.removeEventListener("change", onChange);
}

function getLgViewportSnapshot() {
  return window.matchMedia(LG_MEDIA).matches;
}

function getLgViewportServerSnapshot() {
  return true;
}

function useIsLgViewport() {
  return useSyncExternalStore(
    subscribeToLgViewport,
    getLgViewportSnapshot,
    getLgViewportServerSnapshot
  );
}

function menuRowSurface(isCollapsed: boolean, isActive = false) {
  return cn(
    "flex h-9 w-full min-w-0 items-center !px-2 font-normal",
    isCollapsed ? "size-9 w-9 shrink-0 justify-center !px-0" : "justify-start gap-2",
    isActive
      ? "bg-accent text-accent-foreground hover:bg-accent hover:text-accent-foreground"
      : "text-muted-foreground hover:text-foreground"
  );
}

function MenuIcon({ children }: { children: ReactNode }) {
  return (
    <span className="inline-flex w-5 shrink-0 items-center justify-center [&_svg]:size-4">
      {children}
    </span>
  );
}

function MenuLabel({ children }: { children: ReactNode }) {
  return <span className="truncate text-left">{children}</span>;
}

type MenuRowProps = {
  isCollapsed: boolean;
  isActive?: boolean;
  label: string;
  tooltipLabel?: string;
  onClick?: () => void;
  href?: string;
  ariaCurrent?: "page" | undefined;
  icon: ReactNode;
  className?: string;
};

function MenuRow({
  isCollapsed,
  isActive = false,
  label,
  tooltipLabel,
  onClick,
  href,
  ariaCurrent,
  icon,
  className,
}: MenuRowProps) {
  const surface = menuRowSurface(isCollapsed, isActive);
  const tooltip = tooltipLabel ?? label;

  const row =
    href !== undefined ? (
      <Button
        variant="ghost"
        size="sm"
        nativeButton={false}
        className={surface}
        aria-label={isCollapsed ? (tooltipLabel ?? label) : undefined}
        render={
          <Link href={href} aria-current={ariaCurrent} />
        }
      >
        <MenuIcon>{icon}</MenuIcon>
        {!isCollapsed ? <MenuLabel>{label}</MenuLabel> : null}
      </Button>
    ) : (
      <Button
        type="button"
        variant="ghost"
        size="sm"
        className={surface}
        aria-label={isCollapsed ? (tooltipLabel ?? label) : undefined}
        onClick={onClick}
      >
        <MenuIcon>{icon}</MenuIcon>
        {!isCollapsed ? <MenuLabel>{label}</MenuLabel> : null}
      </Button>
    );

  return (
    <div className={cn("flex w-full", className)}>
      {!isCollapsed ? (
        row
      ) : (
        <Tooltip>
          <TooltipTrigger render={row} />
          <TooltipContent>{tooltip}</TooltipContent>
        </Tooltip>
      )}
    </div>
  );
}

export function EventSideMenu({
  event,
  collapseOverride,
  onCollapseOverrideChange,
}: {
  event: Pick<PainelEvent, "id">;
  collapseOverride: MenuCollapseOverride;
  onCollapseOverrideChange: (value: MenuCollapseOverride) => void;
}) {
  const pathname = usePathname();
  const isLg = useIsLgViewport();
  const isCollapsed = collapseOverride ?? !isLg;

  const settingsHref = `/painel/eventos/${event.id}/configuracoes`;
  const isSettingsCurrent = pathname === settingsHref;

  function handleToggleCollapse() {
    onCollapseOverrideChange(isCollapsed ? false : true);
  }

  return (
    <nav
      aria-label="Áreas do evento"
      className={cn(
        "flex shrink-0 flex-col items-stretch gap-1",
        isCollapsed ? "w-10" : "w-44"
      )}
    >
      <MenuRow
        isCollapsed={isCollapsed}
        label="Convidados"
        icon={<UsersIcon aria-hidden="true" />}
      />

      <MenuRow
        isCollapsed={isCollapsed}
        isActive={isSettingsCurrent}
        label="Configurações"
        href={settingsHref}
        ariaCurrent={isSettingsCurrent ? "page" : undefined}
        icon={<SettingsIcon aria-hidden="true" />}
      />

      <MenuRow
        isCollapsed={isCollapsed}
        label="Reduzir menu"
        tooltipLabel={isCollapsed ? "Expandir menu" : "Reduzir menu"}
        onClick={handleToggleCollapse}
        className="mt-2 border-t border-border pt-2"
        icon={
          isCollapsed ? (
            <PanelLeftOpen aria-hidden="true" />
          ) : (
            <PanelLeftClose aria-hidden="true" />
          )
        }
      />
    </nav>
  );
}
