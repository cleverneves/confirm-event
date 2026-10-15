import type { ReactNode } from "react";

import { PainelFooter } from "./_components/painel-footer";
import { PainelHeader } from "./_components/painel-header";
import { getPainelHeaderUser } from "./_data-access/get-painel-header";

export default async function PainelLayout({
  children,
}: {
  children: ReactNode;
}) {
  const headerUser = await getPainelHeaderUser();

  return (
    <div className="flex flex-1 flex-col">
      <PainelHeader
        displayName={headerUser.displayName}
        imageUrl={headerUser.imageUrl}
      />
      <div className="mx-auto flex w-full max-w-[1360px] flex-1 flex-col px-4 py-6 md:px-6 md:py-10">
        {children}
      </div>
      <PainelFooter />
    </div>
  );
}
