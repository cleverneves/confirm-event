"use client";

import Link from "next/link";
import { SettingsIcon } from "lucide-react";

import { buttonVariants } from "@/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function EventSettingsLink({ eventId }: { eventId: number }) {
  const href = `/painel/eventos/${eventId}/configuracoes`;

  return (
    <Tooltip>
      <TooltipTrigger
        render={
          <Link
            href={href}
            aria-label="Configurações"
            className={cn(buttonVariants({ variant: "outline", size: "icon" }))}
          />
        }
      >
        <SettingsIcon />
      </TooltipTrigger>
      <TooltipContent>Configurações</TooltipContent>
    </Tooltip>
  );
}
