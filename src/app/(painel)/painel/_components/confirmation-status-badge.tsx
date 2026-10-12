import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

/**
 * Tag do estado da confirmação: Aberta em verde, Encerrada em cinza.
 * Usada na lista de eventos e na página do evento.
 */
export function ConfirmationStatusBadge({
  isOpen,
  className,
}: {
  isOpen: boolean;
  className?: string;
}) {
  return (
    <Badge
      variant="secondary"
      className={cn(
        isOpen
          ? "bg-success/15 text-success"
          : "bg-muted text-muted-foreground",
        className
      )}
    >
      {isOpen ? "Aberta" : "Encerrada"}
    </Badge>
  );
}
