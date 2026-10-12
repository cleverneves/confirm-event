"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { confirmPresenceAction } from "../_actions/confirm-presence";
import {
  ConfirmationCard,
  ConfirmationCardTitle,
  ConfirmationThanks,
  ConfirmationUnavailable,
  ConfirmButtonContent,
} from "./confirmation-card";
import { useReportSoldOut } from "./sold-out-boundary";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { buttonThemeStyle } from "@/lib/event-theme";

const formSchema = z.object({
  fullName: z.string().trim().min(1, "Informe o nome completo"),
});

type FormValues = z.infer<typeof formSchema>;

/**
 * Estado da confirmação nesta visita. O agradecimento vale só até recarregar a
 * página: nada é guardado no navegador.
 */
type ConfirmationStatus = "form" | "unavailable" | "thanks";

export function ConfirmationSection({
  slug,
  acceptsConfirmation,
  buttonColor,
  buttonTextColor,
  textColor,
}: {
  slug: string;
  acceptsConfirmation: boolean;
  buttonColor: string;
  buttonTextColor: string;
  /** Cor da frase "Confirmação de presença"; null mantém o visual atual (layout somente imagem). */
  textColor: string | null;
}) {
  const router = useRouter();
  const reportSoldOut = useReportSoldOut();
  const [status, setStatus] = useState<ConfirmationStatus>(
    acceptsConfirmation ? "form" : "unavailable"
  );

  return (
    <ConfirmationCard>
      {status === "unavailable" ? <ConfirmationUnavailable /> : null}
      {status === "thanks" ? <ConfirmationThanks /> : null}
      {status === "form" ? (
        <ConfirmationForm
          slug={slug}
          buttonColor={buttonColor}
          buttonTextColor={buttonTextColor}
          textColor={textColor}
          onConfirmed={() => setStatus("thanks")}
          onUnavailable={() => {
            setStatus("unavailable");
            router.refresh();
          }}
          onSoldOut={reportSoldOut}
        />
      ) : null}
    </ConfirmationCard>
  );
}

function ConfirmationForm({
  slug,
  buttonColor,
  buttonTextColor,
  textColor,
  onConfirmed,
  onUnavailable,
  onSoldOut,
}: {
  slug: string;
  buttonColor: string;
  buttonTextColor: string;
  textColor: string | null;
  onConfirmed: () => void;
  onUnavailable: () => void;
  onSoldOut: () => void;
}) {
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
    },
  });

  async function handleSubmit(values: FormValues) {
    setFormError(null);

    const result = await confirmPresenceAction({
      slug,
      fullName: values.fullName,
    });

    if (result.soldOut) {
      onSoldOut();
      return;
    }

    if (result.unavailable) {
      onUnavailable();
      return;
    }

    if (!result.success) {
      if (result.errors?.fullName) {
        form.setError("fullName", { message: result.errors.fullName[0] });
        return;
      }
      setFormError(result.message ?? "Não foi possível confirmar. Tente de novo.");
      return;
    }

    onConfirmed();
  }

  /**
   * Nome inválido também vai ao servidor: sem vaga, a tela de esgotado prevalece
   * sobre o erro de nome; com vaga, o servidor devolve o mesmo erro do formulário.
   */
  async function handleInvalidSubmit() {
    await handleSubmit(form.getValues());
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit(handleSubmit, handleInvalidSubmit)}
    >
      {formError ? (
        <Alert variant="destructive">
          <AlertTitle>Não foi possível confirmar</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}

      <FieldGroup>
        <ConfirmationCardTitle textColor={textColor} />
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
        <Button
          type="submit"
          disabled={isSubmitting}
          style={buttonThemeStyle(buttonColor, buttonTextColor)}
        >
          <ConfirmButtonContent isSubmitting={isSubmitting} />
        </Button>
      </FieldGroup>
    </form>
  );
}
