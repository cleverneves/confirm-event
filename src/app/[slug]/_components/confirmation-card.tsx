import type { ComponentProps } from "react";
import { CheckIcon, CircleCheckIcon } from "lucide-react";

import { Card } from "@/components/ui/card";
import { Spinner } from "@/components/ui/spinner";
import { cn } from "@/lib/utils";

/**
 * Superfície única da confirmação de presença, usada na página pública e na
 * prévia do tema, nos dois layouts. É a única superfície em volta da
 * confirmação, inclusive sobre o fundo desfocado.
 */
export function ConfirmationCard({
  className,
  ...props
}: ComponentProps<typeof Card>) {
  return <Card className={cn("relative px-6", className)} {...props} />;
}

/**
 * Título "Confirmação de presença". Com `textColor` usa a cor de texto do tema
 * (layout personalizado); sem ela mantém o visual neutro (layout somente imagem).
 */
export function ConfirmationCardTitle({
  textColor,
}: {
  textColor: string | null;
}) {
  return (
    <p
      className={cn("text-sm", textColor ? undefined : "text-muted-foreground")}
      style={textColor ? { color: textColor } : undefined}
    >
      Confirmação de presença
    </p>
  );
}

/** Conteúdo do botão: texto "confirmo" com check, ou o indicador de espera durante o envio. */
export function ConfirmButtonContent({
  isSubmitting = false,
}: {
  isSubmitting?: boolean;
}) {
  return (
    <>
      {isSubmitting ? (
        <Spinner data-icon="inline-start" />
      ) : (
        <CheckIcon data-icon="inline-start" />
      )}
      confirmo
    </>
  );
}

export function ConfirmationUnavailable() {
  return (
    <p className="text-center font-heading text-xl">Confirmação indisponível</p>
  );
}

export function ConfirmationThanks() {
  return (
    <div
      role="status"
      className="flex flex-col items-center gap-4 py-2 text-center"
    >
      <CircleCheckIcon aria-hidden="true" className="size-16 text-success" />
      <p className="font-heading text-xl">Agradecemos pela sua confirmação.</p>
    </div>
  );
}
