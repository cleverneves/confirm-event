"use client";

import { useState } from "react";
import { toast } from "sonner";

import { deleteEventAction } from "../_actions/delete-event";
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

export function DeleteEvent({ eventId }: { eventId: number }) {
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleDelete() {
    setIsDeleting(true);
    const result = await deleteEventAction(eventId);

    if (!result.success) {
      setIsDeleting(false);
      toast.error(result.message ?? "Não foi possível excluir o evento.");
    }
  }

  return (
    <div className="flex flex-col gap-3 border-t border-border pt-8">
      <p className="text-sm text-muted-foreground">
        Apaga o evento, os links e todas as confirmações. Não dá para desfazer.
      </p>
      <AlertDialog>
        <AlertDialogTrigger render={<Button variant="destructive" className="w-fit" />}>
          Excluir evento
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Excluir este evento?</AlertDialogTitle>
            <AlertDialogDescription>
              O evento, os links (atual e antigos) e as confirmações deste
              evento serão apagados. Essa ação não pode ser desfeita.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancelar</AlertDialogCancel>
            <AlertDialogAction
              variant="destructive"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              {isDeleting ? <Spinner data-icon="inline-start" /> : null}
              Excluir
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
