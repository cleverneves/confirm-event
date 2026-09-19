"use client";

import { useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { CalendarIcon, Trash2Icon } from "lucide-react";
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
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { formatConfirmationDateTime } from "@/lib/event-date";

const PAGE_SIZE = 5;

function getInitials(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean);

  if (parts.length === 0) {
    return "?";
  }

  if (parts.length === 1) {
    return parts[0].slice(0, 2).toUpperCase();
  }

  return `${parts[0][0]}${parts[1][0]}`.toUpperCase();
}

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
          <div className="flex items-center gap-3">
            <span className="flex size-9 shrink-0 items-center justify-center rounded-full border border-border bg-background text-xs font-semibold">
              {getInitials(confirmation.fullName)}
            </span>
            <span className="font-medium">{confirmation.fullName}</span>
          </div>
        )}
      </TableCell>
      <TableCell className="text-muted-foreground">
        <span className="inline-flex items-center gap-2 [&_svg]:size-4">
          <CalendarIcon />
          {formatConfirmationDateTime(confirmation.createdAt)}
        </span>
      </TableCell>
      <TableCell>
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
                <AlertDialogTrigger
                  render={<Button size="icon-sm" variant="destructive" />}
                >
                  <Trash2Icon data-icon="inline-start" />
                  <span className="sr-only">Remover</span>
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
  const [query, setQuery] = useState("");
  const [page, setPage] = useState(1);

  const filtered = useMemo(() => {
    const normalized = query.trim().toLowerCase();

    if (!normalized) {
      return confirmations;
    }

    return confirmations.filter((confirmation) =>
      confirmation.fullName.toLowerCase().includes(normalized)
    );
  }, [confirmations, query]);

  const pageCount = Math.max(1, Math.ceil(filtered.length / PAGE_SIZE));
  const currentPage = Math.min(page, pageCount);
  const pageItems = filtered.slice(
    (currentPage - 1) * PAGE_SIZE,
    currentPage * PAGE_SIZE
  );

  function handleQueryChange(value: string) {
    setQuery(value);
    setPage(1);
  }

  return (
    <Card>
      <CardHeader>
        <div className="flex flex-col gap-1">
          <CardTitle>Gestão de Convidados Confirmados</CardTitle>
          <CardDescription>
            {total === 1
              ? "1 pessoa confirmou presença."
              : `${total} pessoas confirmaram presença.`}
          </CardDescription>
        </div>
        {confirmations.length > 0 ? (
          <CardAction>
            <Input
              value={query}
              onChange={(event) => handleQueryChange(event.target.value)}
              placeholder="Buscar por nome..."
              aria-label="Buscar por nome"
              className="w-64 max-w-full"
            />
          </CardAction>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-col gap-4">
        {confirmations.length === 0 ? (
          <Empty className="border">
            <EmptyHeader>
              <EmptyTitle>Ninguém confirmou ainda</EmptyTitle>
              <EmptyDescription>
                As confirmações da página pública deste evento aparecem aqui.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : filtered.length === 0 ? (
          <Empty className="border">
            <EmptyHeader>
              <EmptyTitle>Nenhum nome encontrado</EmptyTitle>
              <EmptyDescription>
                Ajuste a busca para ver as confirmações deste evento.
              </EmptyDescription>
            </EmptyHeader>
          </Empty>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Nome completo do convidado</TableHead>
                  <TableHead>Data/hora da confirmação</TableHead>
                  <TableHead className="text-right">Ações</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {pageItems.map((confirmation) => (
                  <PresenceRow
                    key={confirmation.id}
                    eventId={eventId}
                    confirmation={confirmation}
                  />
                ))}
              </TableBody>
            </Table>
            <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-muted-foreground">
                Exibindo {pageItems.length} de {filtered.length} convidados
                confirmados
              </p>
              <div className="flex flex-wrap items-center gap-1">
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={currentPage === 1}
                  onClick={() => setPage(currentPage - 1)}
                >
                  Anterior
                </Button>
                {Array.from({ length: pageCount }, (_, index) => {
                  const pageNumber = index + 1;

                  return (
                    <Button
                      key={pageNumber}
                      type="button"
                      size="sm"
                      variant={pageNumber === currentPage ? "default" : "outline"}
                      aria-current={pageNumber === currentPage ? "page" : undefined}
                      onClick={() => setPage(pageNumber)}
                    >
                      {pageNumber}
                    </Button>
                  );
                })}
                <Button
                  type="button"
                  size="sm"
                  variant="outline"
                  disabled={currentPage === pageCount}
                  onClick={() => setPage(currentPage + 1)}
                >
                  Próximo
                </Button>
              </div>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
