import { Suspense } from "react";

import { RecoverPasswordContent } from "./_components/content";

export default function RecoverPasswordPage() {
  return (
    <main className="flex flex-1 items-center px-6 py-16">
      <Suspense>
        <RecoverPasswordContent />
      </Suspense>
    </main>
  );
}
