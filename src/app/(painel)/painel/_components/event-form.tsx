"use client";

import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { updateEventAction } from "../_actions/update-event";
import type { EventDetails } from "@/app/_data-access/get-event";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  eventDate: z
    .string()
    .regex(/^\d{4}-\d{2}-\d{2}$/, "Informe um dia válido"),
  eventTime: z.string().regex(/^\d{2}:\d{2}$/, "Informe um horário válido"),
  location: z.string().trim().min(1, "Informe o local"),
});

type FormValues = z.infer<typeof formSchema>;

function toTimeInput(value: string | null) {
  if (!value) {
    return "";
  }
  return value.slice(0, 5);
}

export function EventForm({ event }: { event: EventDetails | null }) {
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      eventDate: event?.eventDate ?? "",
      eventTime: toTimeInput(event?.eventTime ?? null),
      location: event?.location ?? "",
    },
  });

  async function handleSubmit(values: FormValues) {
    const result = await updateEventAction(values);

    if (!result.success) {
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

    toast.success(result.message ?? "Dados do evento gravados.");
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Dia, horário e local</CardTitle>
        <CardDescription>
          Vale para as duas festas. A página pública mostra o que estiver
          gravado.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form id="event-form" onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Controller
              name="eventDate"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="event-date">Dia</FieldLabel>
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
        </form>
      </CardContent>
      <CardFooter>
        <Button type="submit" form="event-form" disabled={isSubmitting}>
          {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
          Salvar
        </Button>
      </CardFooter>
    </Card>
  );
}
