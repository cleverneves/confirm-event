import { MapPinIcon } from "lucide-react";

import { cn } from "@/lib/utils";

type EventPlaceProps = {
  venueName: string | null;
  address: string;
  className?: string;
  textClassName?: string;
  /** Lista Meus Eventos: nome e endereço na mesma linha. */
  variant?: "block" | "inline";
};

export function EventPlace({
  venueName,
  address,
  className,
  textClassName,
  variant = "block",
}: EventPlaceProps) {
  const trimmedName = venueName?.trim();

  return (
    <div
      className={cn(
        "flex min-w-0 items-start gap-2 [&_svg]:size-4 [&_svg]:shrink-0",
        className
      )}
    >
      <MapPinIcon aria-hidden="true" />
      {variant === "inline" ? (
        <p className={cn("min-w-0 break-words", textClassName)}>
          {trimmedName ? (
            <>
              {trimmedName}
              <span aria-hidden="true"> · </span>
              {address}
            </>
          ) : (
            address
          )}
        </p>
      ) : (
        <div className={cn("min-w-0 break-words", textClassName)}>
          {trimmedName ? <p>{trimmedName}</p> : null}
          <p>{address}</p>
        </div>
      )}
    </div>
  );
}
