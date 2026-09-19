"use client";

import { useState } from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { recoverPasswordAction } from "../_actions/recover-password";
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
  email: z.email("Informe um e-mail válido"),
});

type FormValues = z.infer<typeof formSchema>;

export function RecoverPasswordContent() {
  const searchParams = useSearchParams();
  const hasInvalidLink = searchParams.get("erro") === "invalido";
  const [formError, setFormError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
    },
  });

  async function handleSubmit(values: FormValues) {
    setFormError(null);
    setSuccessMessage(null);

    const result = await recoverPasswordAction(values);

    if (!result.success) {
      if (result.errors?.email) {
        form.setError("email", { message: result.errors.email[0] });
      }
      setFormError(result.message ?? "Não foi possível concluir o pedido.");
      return;
    }

    setSuccessMessage(
      result.message ?? "Se o e-mail for o da conta, você receberá as instruções."
    );
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="font-heading text-sm text-muted-foreground">Organização</p>
        <h1 className="font-heading text-3xl leading-none">Recuperar senha</h1>
        <p className="text-muted-foreground">
          Informe o e-mail da conta. Se for o da organização, as instruções
          chegam por e-mail.
        </p>
      </div>

      {hasInvalidLink && !successMessage ? (
        <Alert variant="destructive">
          <AlertTitle>Link inválido ou vencido</AlertTitle>
          <AlertDescription>
            Solicite a recuperação de novo para definir uma senha nova.
          </AlertDescription>
        </Alert>
      ) : null}

      {formError ? (
        <Alert variant="destructive">
          <AlertTitle>Não foi possível concluir</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}

      {successMessage ? (
        <Alert>
          <AlertTitle>Pedido enviado</AlertTitle>
          <AlertDescription>{successMessage}</AlertDescription>
        </Alert>
      ) : null}

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="recover-email">E-mail</FieldLabel>
                <Input
                  {...field}
                  id="recover-email"
                  type="email"
                  autoComplete="email"
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
            Enviar instruções
          </Button>
        </FieldGroup>
      </form>

      <p className="text-sm text-muted-foreground">
        <Link href="/login" className="underline underline-offset-4">
          Voltar ao login
        </Link>
      </p>
    </div>
  );
}
