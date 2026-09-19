import type { ReactNode } from "react";

import { PainelFooter } from "./_components/painel-footer";
import { PainelHeader } from "./_components/painel-header";
import { requireOrganizer } from "@/lib/auth/require-organizer";

export default async function PainelLayout({
  children,
}: {
  children: ReactNode;
}) {
  const { user } = await requireOrganizer();

  return (
    <div className="flex flex-1 flex-col">
      <PainelHeader email={user.email ?? ""} />
      <div className="mx-auto flex w-full max-w-[1360px] flex-1 flex-col px-4 py-6 md:px-6 md:py-10">
        {children}
      </div>
      <PainelFooter />
    </div>
  );
}
