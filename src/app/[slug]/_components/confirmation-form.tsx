"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { confirmPresenceAction } from "../_actions/confirm-presence";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";

const formSchema = z.object({
  fullName: z.string().trim().min(1, "Informe o nome completo"),
});

type FormValues = z.infer<typeof formSchema>;

export function ConfirmationForm({ slug }: { slug: string }) {
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
    },
  });

  async function handleSubmit(values: FormValues) {
    setFormError(null);
    setSuccessMessage(null);

    const result = await confirmPresenceAction({
      slug,
      fullName: values.fullName,
    });

    if (!result.success) {
      if (result.errors?.fullName) {
        form.setError("fullName", { message: result.errors.fullName[0] });
      }
      setFormError(result.message ?? "Não foi possível confirmar. Tente de novo.");
      return;
    }

    setSuccessMessage(result.message ?? "Presença confirmada.");
    form.reset({ fullName: "" });
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
      {successMessage ? (
        <Alert>
          <AlertTitle>Presença confirmada</AlertTitle>
          <AlertDescription>
            {successMessage} Você pode confirmar outra pessoa neste mesmo evento.
          </AlertDescription>
        </Alert>
      ) : null}

      {formError ? (
        <Alert variant="destructive">
          <AlertTitle>Não foi possível confirmar</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}

      <FieldGroup>
        <Controller
          name="fullName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="full-name">Nome completo</FieldLabel>
              <Input
                {...field}
                id="full-name"
                autoComplete="name"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : null}
            </Field>
          )}
        />
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
          Eu vou!
        </Button>
      </FieldGroup>
    </form>
  );
}
