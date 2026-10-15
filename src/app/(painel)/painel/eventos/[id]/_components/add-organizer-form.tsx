"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { addOrganizerAction } from "../_actions/add-organizer";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { addOrganizerSchema, type AddOrganizerInput } from "@/lib/organizer-schema";

/** Inclui, pelo e-mail inteiro, uma conta já cadastrada como organizadora do evento. */
export function AddOrganizerForm({ eventId }: { eventId: number }) {
  const router = useRouter();
  const form = useForm<AddOrganizerInput>({
    resolver: zodResolver(addOrganizerSchema),
    defaultValues: { email: "" },
  });

  async function handleSubmit(values: AddOrganizerInput) {
    const result = await addOrganizerAction(eventId, values);

    if (!result.success) {
      if (result.errors?.email) {
        form.setError("email", { message: result.errors.email[0] });
      }
      toast.error(result.message ?? "Não foi possível adicionar o organizador.");
      return;
    }

    toast.success(result.message ?? "Organizador adicionado.");
    form.reset({ email: "" });
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
          <Field data-invalid={fieldState.invalid} className="sm:flex-1">
            <FieldLabel htmlFor="organizer-email">
              E-mail do organizador
            </FieldLabel>
            <Input
              {...field}
              id="organizer-email"
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
      <Button type="submit" disabled={isSubmitting} className="sm:mt-6">
        {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
        Adicionar
      </Button>
    </form>
  );
}
