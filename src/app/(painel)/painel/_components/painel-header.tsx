"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusIcon } from "lucide-react";

import { logoutAction } from "../_actions/logout";
import { ProfileAvatar } from "./profile-avatar";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

export function PainelHeader({
  displayName,
  imageUrl,
}: {
  displayName: string;
  imageUrl: string | null;
}) {
  const pathname = usePathname();
  const isMeusEventos =
    pathname === "/painel" || /^\/painel\/eventos\/\d+/.test(pathname);
  const isMeuPerfil =
    pathname === "/painel/perfil" || pathname.startsWith("/painel/perfil/");

  return (
    <header className="sticky top-0 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1360px] flex-wrap items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex min-w-0 flex-wrap items-center gap-2 sm:gap-6">
          <Link href="/painel" className="flex shrink-0 items-center gap-2">
            <span className="size-2 rounded-full bg-primary" />
            <span className="font-heading text-base font-semibold tracking-tight">
              Confirm Event
            </span>
          </Link>
          <nav className="flex items-center gap-1">
            <Link
              href="/painel"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                isMeusEventos && "text-foreground"
              )}
            >
              Meus Eventos
            </Link>
            <Link
              href="/painel/perfil"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                isMeuPerfil && "text-foreground"
              )}
            >
              Meu perfil
            </Link>
          </nav>
        </div>
        <div className="flex items-center gap-3">
          <Button
            render={<Link href="/painel/eventos/novo" />}
            nativeButton={false}
          >
            <PlusIcon data-icon="inline-start" />
            Novo Evento
          </Button>
          <form action={logoutAction} className="flex min-w-0 items-center gap-3">
            <div className="flex min-w-0 max-w-[min(12rem,40vw)] items-center gap-2 sm:max-w-48">
              <ProfileAvatar
                src={imageUrl}
                alt={displayName}
                className="size-9"
              />
              <p className="truncate text-sm text-muted-foreground">
                {displayName}
              </p>
            </div>
            <Button type="submit" variant="outline" className="shrink-0">
              Sair
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
