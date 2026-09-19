import { TrendingUpIcon, UsersIcon } from "lucide-react";

import { Card, CardContent, CardHeader } from "@/components/ui/card";

export function EventMetrics({
  total,
  confirmedLast24h,
}: {
  total: number;
  confirmedLast24h: number;
}) {
  return (
    <div className="grid gap-4 md:grid-cols-2">
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <p className="text-xs font-semibold tracking-[0.06em] text-muted-foreground uppercase">
            Total de confirmados
          </p>
          <span className="text-muted-foreground [&_svg]:size-5">
            <UsersIcon />
          </span>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <p className="font-heading text-4xl leading-none tracking-tight">
            {total}
          </p>
          <p className="text-sm text-muted-foreground">
            {total === 1 ? "pessoa" : "pessoas"}
          </p>
        </CardContent>
      </Card>
      <Card>
        <CardHeader className="flex flex-row items-start justify-between">
          <p className="text-xs font-semibold tracking-[0.06em] text-muted-foreground uppercase">
            Últimas 24h
          </p>
          <span className="text-muted-foreground [&_svg]:size-5">
            <TrendingUpIcon />
          </span>
        </CardHeader>
        <CardContent className="flex flex-col gap-1">
          <p className="font-heading text-4xl leading-none tracking-tight text-success">
            +{confirmedLast24h}
          </p>
          <p className="text-sm text-muted-foreground">novos convites aceitos</p>
        </CardContent>
      </Card>
    </div>
  );
}
