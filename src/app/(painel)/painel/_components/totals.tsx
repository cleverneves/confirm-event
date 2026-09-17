import type { PresenceTotals } from "../_data-access/get-presences";

export function Totals({ totals }: { totals: PresenceTotals }) {
  return (
    <section className="grid gap-3 sm:grid-cols-3">
      <article className="border border-border/80 bg-card px-4 py-3">
        <p className="text-sm text-muted-foreground">Total geral</p>
        <p className="font-heading text-3xl tabular-nums">{totals.geral}</p>
      </article>
      <article className="border border-border/80 bg-card px-4 py-3">
        <p className="text-sm text-muted-foreground">Festa da Mariana</p>
        <p className="font-heading text-3xl tabular-nums">{totals.mariana}</p>
      </article>
      <article className="border border-border/80 bg-card px-4 py-3">
        <p className="text-sm text-muted-foreground">Festa do Victor</p>
        <p className="font-heading text-3xl tabular-nums">{totals.victor}</p>
      </article>
    </section>
  );
}
