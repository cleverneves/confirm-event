"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { deleteConfirmationAction } from "../_actions/delete-confirmation";
import { updateConfirmationAction } from "../_actions/update-confirmation";
import type { Presence } from "../_data-access/get-presences";
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
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

function PresenceRow({
  eventId,
  confirmation,
}: {
  eventId: number;
  confirmation: Presence;
}) {
  const [isEditing, setIsEditing] = useState(false);
  const [name, setName] = useState(confirmation.fullName);
  const [isSaving, setIsSaving] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);
  const router = useRouter();

  async function handleSave() {
    setIsSaving(true);
    const result = await updateConfirmationAction(eventId, confirmation.id, {
      fullName: name,
    });
    setIsSaving(false);

    if (!result.success) {
      toast.error(result.message ?? "Não foi possível salvar o nome.");
      return;
    }

    toast.success(result.message ?? "Nome atualizado.");
    setIsEditing(false);
    router.refresh();
  }

  async function handleRemove() {
    setIsRemoving(true);
    const result = await deleteConfirmationAction(eventId, confirmation.id);

    if (!result.success) {
      setIsRemoving(false);
      toast.error(result.message ?? "Não foi possível remover a confirmação.");
      return;
    }

    router.refresh();
  }

  return (
    <TableRow>
      <TableCell>
        {isEditing ? (
          <Input
            value={name}
            onChange={(event) => setName(event.target.value)}
            aria-label="Nome completo"
          />
        ) : (
          confirmation.fullName
        )}
      </TableCell>
      <TableCell className="text-right">
        <div className="flex justify-end gap-2">
          {isEditing ? (
            <>
              <Button
                type="button"
                size="sm"
                onClick={handleSave}
                disabled={isSaving}
              >
                {isSaving ? <Spinner data-icon="inline-start" /> : null}
                Salvar
              </Button>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => {
                  setName(confirmation.fullName);
                  setIsEditing(false);
                }}
              >
                Cancelar
              </Button>
            </>
          ) : (
            <>
              <Button
                type="button"
                size="sm"
                variant="outline"
                onClick={() => setIsEditing(true)}
              >
                Editar
              </Button>
              <AlertDialog>
                <AlertDialogTrigger render={<Button size="sm" variant="destructive" />}>
                  Remover
                </AlertDialogTrigger>
                <AlertDialogContent>
                  <AlertDialogHeader>
                    <AlertDialogTitle>Remover esta confirmação?</AlertDialogTitle>
                    <AlertDialogDescription>
                      {confirmation.fullName} sai da lista deste evento. O total
                      diminui em 1.
                    </AlertDialogDescription>
                  </AlertDialogHeader>
                  <AlertDialogFooter>
                    <AlertDialogCancel>Cancelar</AlertDialogCancel>
                    <AlertDialogAction
                      variant="destructive"
                      disabled={isRemoving}
                      onClick={handleRemove}
                    >
                      {isRemoving ? <Spinner data-icon="inline-start" /> : null}
                      Remover
                    </AlertDialogAction>
                  </AlertDialogFooter>
                </AlertDialogContent>
              </AlertDialog>
            </>
          )}
        </div>
      </TableCell>
    </TableRow>
  );
}

export function PresenceList({
  eventId,
  confirmations,
  total,
}: {
  eventId: number;
  confirmations: Presence[];
  total: number;
}) {
  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-1">
        <h2 className="font-heading text-xl">Confirmados</h2>
        <p className="text-sm text-muted-foreground">
          {total === 1 ? "1 pessoa confirmou" : `${total} pessoas confirmaram`}
        </p>
      </div>

      {confirmations.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>Ninguém confirmou ainda</EmptyTitle>
            <EmptyDescription>
              As confirmações da página pública deste evento aparecem aqui.
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead className="text-right">Ações</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {confirmations.map((confirmation) => (
              <PresenceRow
                key={confirmation.id}
                eventId={eventId}
                confirmation={confirmation}
              />
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
}
