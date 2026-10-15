"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Trash2Icon } from "lucide-react";
import { toast } from "sonner";

import { removeOrganizerAction } from "../_actions/remove-organizer";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { Button } from "@/components/ui/button";
import { Spinner } from "@/components/ui/spinner";

/** Remove um organizador incluído, depois de confirmação explícita do criador. */
export function RemoveOrganizerButton({
  eventId,
  userId,
  name,
}: {
  eventId: number;
  userId: string;
  name: string;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const router = useRouter();

  async function handleRemove() {
    setIsRemoving(true);
    const result = await removeOrganizerAction(eventId, userId);
    setIsRemoving(false);

    if (!result.success) {
      toast.error(result.message ?? "Não foi possível remover o organizador.");
      return;
    }

    toast.success(result.message ?? "Organizador removido.");
    setIsOpen(false);
    router.refresh();
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger
        render={<Button size="icon-sm" variant="destructive" />}
      >
        <Trash2Icon data-icon="inline-start" />
        <span className="sr-only">Remover {name}</span>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Remover este organizador?</AlertDialogTitle>
          <AlertDialogDescription>
            {name} perde o acesso a este evento. As confirmações de presença
            permanecem. Ela só volta se você incluir o mesmo e-mail de novo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isRemoving}
            onClick={(event) => {
              event.preventDefault();
              void handleRemove();
            }}
          >
            {isRemoving ? <Spinner data-icon="inline-start" /> : null}
            Remover
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
