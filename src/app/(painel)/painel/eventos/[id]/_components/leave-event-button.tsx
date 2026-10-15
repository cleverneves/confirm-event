"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { LogOutIcon } from "lucide-react";
import { toast } from "sonner";

import { leaveEventAction } from "../_actions/leave-event";
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

/** O organizador incluído sai do evento, depois de confirmação explícita. */
export function LeaveEventButton({ eventId }: { eventId: number }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isLeaving, setIsLeaving] = useState(false);
  const router = useRouter();

  async function handleLeave() {
    setIsLeaving(true);
    const result = await leaveEventAction(eventId);

    if (!result.success) {
      setIsLeaving(false);
      toast.error(result.message ?? "Não foi possível sair do evento.");
      return;
    }

    toast.success(result.message ?? "Você saiu do evento.");
    router.push("/painel");
  }

  return (
    <AlertDialog open={isOpen} onOpenChange={setIsOpen}>
      <AlertDialogTrigger
        render={<Button type="button" variant="outline" className="w-fit" />}
      >
        <LogOutIcon data-icon="inline-start" />
        Sair do evento
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Sair deste evento?</AlertDialogTitle>
          <AlertDialogDescription>
            Você perde o acesso a este evento e ele some de Meus Eventos. Você
            só volta se o criador incluir o seu e-mail de novo.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancelar</AlertDialogCancel>
          <AlertDialogAction
            variant="destructive"
            disabled={isLeaving}
            onClick={(event) => {
              event.preventDefault();
              void handleLeave();
            }}
          >
            {isLeaving ? <Spinner data-icon="inline-start" /> : null}
            Sair
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
