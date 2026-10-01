"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  makeEventFieldsSchema,
  type EventFieldErrors,
  type EventFields,
} from "@/lib/event-schema";

type SubmitResult = {
  success: boolean;
  message?: string;
  errors?: EventFieldErrors;
};

export function EventFieldsForm({
  defaultValues,
  currentDate,
  submitLabel,
  onSubmit,
  onSuccess,
}: {
  defaultValues: EventFields;
  currentDate?: string;
  submitLabel: string;
  onSubmit: (values: EventFields) => Promise<SubmitResult>;
  onSuccess?: () => void;
}) {
  const schema = useMemo(
    () => makeEventFieldsSchema(currentDate),
    [currentDate]
  );
  const router = useRouter();
  const form = useForm<EventFields>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function handleSubmit(values: EventFields) {
    const result = await onSubmit(values);

    if (!result.success) {
      if (result.errors?.title) {
        form.setError("title", { message: result.errors.title[0] });
      }
      if (result.errors?.details) {
        form.setError("details", { message: result.errors.details[0] });
      }
      if (result.errors?.eventDate) {
        form.setError("eventDate", { message: result.errors.eventDate[0] });
      }
      if (result.errors?.eventTime) {
        form.setError("eventTime", { message: result.errors.eventTime[0] });
      }
      if (result.errors?.location) {
        form.setError("location", { message: result.errors.location[0] });
      }
      if (result.errors?.confirmationStartsOn) {
        form.setError("confirmationStartsOn", {
          message: result.errors.confirmationStartsOn[0],
        });
      }
      if (result.errors?.confirmationEndsOn) {
        form.setError("confirmationEndsOn", {
          message: result.errors.confirmationEndsOn[0],
        });
      }
      toast.error(result.message ?? "Não foi possível salvar. Tente de novo.");
      return;
    }

    if (result.message) {
      toast.success(result.message);
    }
    onSuccess?.();
    router.refresh();
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="event-title">Título</FieldLabel>
              <Input
                {...field}
                id="event-title"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : null}
            </Field>
          )}
        />
        <Controller
          name="details"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="event-details">Detalhes (opcional)</FieldLabel>
              <Textarea
                {...field}
                id="event-details"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : null}
            </Field>
          )}
        />
        <Controller
          name="eventDate"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="event-date">Data</FieldLabel>
              <Input
                {...field}
                id="event-date"
                type="date"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : null}
            </Field>
          )}
        />
        <Controller
          name="eventTime"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="event-time">Horário</FieldLabel>
              <Input
                {...field}
                id="event-time"
                type="time"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : null}
            </Field>
          )}
        />
        <Controller
          name="location"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="event-location">Local</FieldLabel>
              <Input
                {...field}
                id="event-location"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : null}
            </Field>
          )}
        />
        <FieldSet>
          <FieldLegend>Janela de confirmação (opcional)</FieldLegend>
          <FieldDescription>
            O dia de início aceita nome. O dia de fim não aceita. Sem janela, a
            confirmação fica aberta até a véspera do evento.
          </FieldDescription>
          <Controller
            name="confirmationStartsOn"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirmation-starts-on">Início</FieldLabel>
                <Input
                  {...field}
                  id="confirmation-starts-on"
                  type="date"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </Field>
            )}
          />
          <Controller
            name="confirmationEndsOn"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirmation-ends-on">Fim</FieldLabel>
                <Input
                  {...field}
                  id="confirmation-ends-on"
                  type="date"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </Field>
            )}
          />
        </FieldSet>
      </FieldGroup>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
        {submitLabel}
      </Button>
    </form>
  );
}
