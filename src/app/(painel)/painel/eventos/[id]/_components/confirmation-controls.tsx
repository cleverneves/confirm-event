"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import {
  closeConfirmationAction,
  reopenConfirmationAction,
} from "../_actions/close-confirmation";
import type { PainelEvent } from "../_data-access/get-event";
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

export function ConfirmationControls({ event }: { event: PainelEvent }) {
  if (event.confirmation.canCloseNow) {
    return <CloseConfirmationButton eventId={event.id} />;
  }

  if (event.confirmation.canReactivate) {
    return <ReopenConfirmationButton eventId={event.id} />;
  }

  return null;
}

function CloseConfirmationButton({ eventId }: { eventId: number }) {
  const router = useRouter();
  const [isClosing, setIsClosing] = useState(false);

  async function handleClose() {
    setIsClosing(true);
    const result = await closeConfirmationAction(eventId, true);

    if (!result.success) {
      setIsClosing(false);
      toast.error(
        result.message ?? "Não foi possível encerrar a confirmação. Tente de novo."
      );
      return;
    }

    toast.success(result.message ?? "A confirmação foi encerrada.");
    router.refresh();
  }

  return (
    <AlertDialog>
      <AlertDialogTrigger render={<Button variant="outline" className="w-fit" />}>
        Encerrar agora
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Encerrar a confirmação agora?</AlertDialogTitle>
          <AlertDialogDescription>
            O link deixa de aceitar nomes novos. Quem já confirmou permanece na
            lista. Você pode reativar depois, se o prazo ainda permitir.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction disabled={isClosing} onClick={handleClose}>
            {isClosing ? <Spinner data-icon="inline-start" /> : null}
            Encerrar
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

function ReopenConfirmationButton({ eventId }: { eventId: number }) {
  const router = useRouter();
  const [isReopening, setIsReopening] = useState(false);

  async function handleReopen() {
    setIsReopening(true);
    const result = await reopenConfirmationAction(eventId);
    setIsReopening(false);

    if (!result.success) {
      toast.error(
        result.message ?? "Não foi possível reativar a confirmação. Tente de novo."
      );
      return;
    }

    toast.success(result.message ?? "A confirmação foi reativada.");
    router.refresh();
  }

  return (
    <Button
      variant="outline"
      className="w-fit"
      disabled={isReopening}
      onClick={handleReopen}
    >
      {isReopening ? <Spinner data-icon="inline-start" /> : null}
      Reativar
    </Button>
  );
}
