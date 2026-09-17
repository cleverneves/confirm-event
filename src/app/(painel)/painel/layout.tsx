import type { ReactNode } from "react";

import { logoutAction } from "./_actions/logout";
import { Button } from "@/components/ui/button";
import { requireOrganizer } from "@/lib/auth/require-organizer";

export default async function PainelLayout({
  children,
}: {
  children: ReactNode;
}) {
  await requireOrganizer();

  return (
    <div className="flex flex-1 flex-col">
      <header className="border-b border-border/70 bg-card/80">
        <div className="mx-auto flex w-full max-w-5xl items-center justify-between gap-4 px-6 py-4">
          <div className="flex flex-col">
            <p className="text-sm text-muted-foreground">Organização</p>
            <p className="font-heading text-lg leading-none">Painel da festa</p>
          </div>
          <form action={logoutAction}>
            <Button type="submit" variant="outline">
              Sair
            </Button>
          </form>
        </div>
      </header>
      <div className="mx-auto flex w-full max-w-5xl flex-1 flex-col px-6 py-8">
        {children}
      </div>
    </div>
  );
}
