import { ImageIcon, LayoutListIcon } from "lucide-react";

import type { EventPageLayout } from "@/lib/event-illustration";
import { cn } from "@/lib/utils";

export function PageLayoutMark({
  layout,
  size,
  className,
}: {
  layout: EventPageLayout;
  size: "choice" | "list";
  className?: string;
}) {
  const Icon = layout === "image_only" ? ImageIcon : LayoutListIcon;

  if (size === "list") {
    return <Icon className={cn("size-4 shrink-0", className)} aria-hidden />;
  }

  return (
    <div
      className={cn(
        "flex size-12 shrink-0 items-center justify-center rounded-md bg-muted",
        className
      )}
    >
      <Icon className="size-6" aria-hidden />
    </div>
  );
}
