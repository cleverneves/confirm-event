"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { PlusIcon } from "lucide-react";

import { logoutAction } from "../_actions/logout";
import { Button } from "@/components/ui/button";
import { cn } from "cn";

export function PainelHeader({ email }: { email: string }) {
  const pathname = usePathname();
  const isMeusEventos =
    pathname === "/painel" || /^\/painel\/eventos\/\d+/.test(pathname);

  return (
    <header className="sticky top-0 border-b border-border bg-card/80 backdrop-blur-md">
      <div className="mx-auto flex w-full max-w-[1360px] items-center justify-between gap-4 px-4 py-3 md:px-6">
        <div className="flex min-w-0 items-center gap-6">
          <Link href="/painel" className="flex shrink-0 items-center gap-2">
            <span className="size-2 rounded-full bg-primary" />
            <span className="font-heading text-base font-semibold tracking-tight">
              Confirm Event
            </span>
          </Link>
          <nav className="hidden items-center gap-1 sm:flex">
            <Link
              href="/painel"
              className={cn(
                "rounded-md px-3 py-2 text-sm font-medium text-muted-foreground transition-colors hover:text-foreground",
                isMeusEventos && "text-foreground"
              )}
            >
              Meus Eventos
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
          <form action={logoutAction} className="flex items-center gap-3">
            {email ? (
              <p className="hidden max-w-40 truncate text-sm text-muted-foreground md:block">
                {email}
              </p>
            ) : null}
            <Button type="submit" variant="outline">
              Sair
            </Button>
          </form>
        </div>
      </div>
    </header>
  );
}
