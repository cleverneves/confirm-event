"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon } from "lucide-react";
import { toast } from "sonner";

import { addOrganizerAction } from "../_actions/add-organizer";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  addOrganizerSchema,
  type AddOrganizerInput,
} from "@/lib/organizer-schema";

/** Abre o modal para incluir, pelo e-mail inteiro, uma conta já cadastrada. */
export function AddOrganizerDialog({ eventId }: { eventId: number }) {
  const [open, setOpen] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleOpenChange(nextOpen: boolean) {
    if (isSubmitting) {
      return;
    }
    setOpen(nextOpen);
  }

  function handleSuccess() {
    setOpen(false);
  }

  return (
    <Dialog open={open} onOpenChange={handleOpenChange}>
      <DialogTrigger render={<Button type="button" variant="outline" className="w-fit" />}>
        Adicionar
      </DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>Adicionar organizador</DialogTitle>
        </DialogHeader>
        {open ? (
          <AddOrganizerDialogForm
            eventId={eventId}
            onSubmittingChange={setIsSubmitting}
            onSuccess={handleSuccess}
          />
        ) : null}
      </DialogContent>
    </Dialog>
  );
}

function AddOrganizerDialogForm({
  eventId,
  onSubmittingChange,
  onSuccess,
}: {
  eventId: number;
  onSubmittingChange: (isSubmitting: boolean) => void;
  onSuccess: () => void;
}) {
  const router = useRouter();
  const form = useForm<AddOrganizerInput>({
    resolver: zodResolver(addOrganizerSchema),
    defaultValues: { email: "" },
  });

  async function handleSubmit(values: AddOrganizerInput) {
    onSubmittingChange(true);
    const result = await addOrganizerAction(eventId, values);
    onSubmittingChange(false);

    if (!result.success) {
      if (result.errors?.email) {
        form.setError("email", { message: result.errors.email[0] });
      }
      toast.error(result.message ?? "Não foi possível adicionar o organizador.");
      return;
    }

    toast.success(result.message ?? "Organizador adicionado.");
    form.reset({ email: "" });
    onSuccess();
    router.refresh();
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <form
      onSubmit={form.handleSubmit(handleSubmit)}
      className="flex flex-col gap-3 sm:flex-row sm:items-start"
      noValidate
    >
      <Controller
        name="email"
        control={form.control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid} className="min-w-0 flex-1">
            <FieldLabel htmlFor="add-organizer-email">
              E-mail do organizador
            </FieldLabel>
            <Input
              {...field}
              id="add-organizer-email"
              type="email"
              autoComplete="off"
              placeholder="nome@exemplo.com"
              aria-invalid={fieldState.invalid}
            />
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : (
              <FieldDescription>
                Informe o e-mail inteiro de uma conta já cadastrada.
              </FieldDescription>
            )}
          </Field>
        )}
      />
      <Button
        type="submit"
        size="icon"
        disabled={isSubmitting}
        className="shrink-0 sm:mt-6"
        aria-label="Adicionar organizador"
      >
        {isSubmitting ? <Spinner data-icon="inline-start" /> : <PlusIcon />}
      </Button>
    </form>
  );
}
