"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import { isDateBeforeToday } from "@/lib/event-date";
import {
  eventFieldsSchema,
  type EventFields,
} from "@/lib/event-schema";

type SubmitResult = {
  success: boolean;
  message?: string;
  errors?: {
    title?: string[];
    details?: string[];
    eventDate?: string[];
    eventTime?: string[];
    location?: string[];
  };
};

function schemaFor(currentDate?: string) {
  return eventFieldsSchema.superRefine((data, ctx) => {
    if (currentDate && data.eventDate === currentDate) {
      return;
    }

    if (isDateBeforeToday(data.eventDate)) {
      ctx.addIssue({
        code: "custom",
        path: ["eventDate"],
        message: "A data não pode estar no passado.",
      });
    }
  });
}

export function EventFieldsForm({
  defaultValues,
  currentDate,
  submitLabel,
  onSubmit,
}: {
  defaultValues: EventFields;
  currentDate?: string;
  submitLabel: string;
  onSubmit: (values: EventFields) => Promise<SubmitResult>;
}) {
  const schema = useMemo(() => schemaFor(currentDate), [currentDate]);
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
      toast.error(result.message ?? "Não foi possível salvar. Tente de novo.");
      return;
    }

    if (result.message) {
      toast.success(result.message);
    }
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
      </FieldGroup>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
        {submitLabel}
      </Button>
    </form>
  );
}
