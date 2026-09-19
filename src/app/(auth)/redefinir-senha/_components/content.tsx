"use client";

import { useState } from "react";
import Link from "next/link";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { resetPasswordAction } from "../_actions/reset-password";
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
  password: z.string().min(6, "A senha precisa ter pelo menos 6 caracteres"),
});

type FormValues = z.infer<typeof formSchema>;

export function ResetPasswordContent({ hasSession }: { hasSession: boolean }) {
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      password: "",
    },
  });

  async function handleSubmit(values: FormValues) {
    setFormError(null);
    const result = await resetPasswordAction(values);

    if (!result.success) {
      if (result.errors?.password) {
        form.setError("password", { message: result.errors.password[0] });
      }
      setFormError(
        result.message ?? "Não foi possível definir a senha nova. Tente de novo."
      );
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="font-heading text-sm text-muted-foreground">Organização</p>
        <h1 className="font-heading text-3xl leading-none">Nova senha</h1>
        <p className="text-muted-foreground">
          Defina uma senha nova para entrar no painel.
        </p>
      </div>

      {!hasSession ? (
        <Alert variant="destructive">
          <AlertTitle>Link inválido ou vencido</AlertTitle>
          <AlertDescription>
            Solicite a recuperação de novo para definir uma senha nova.
          </AlertDescription>
        </Alert>
      ) : null}

      {formError ? (
        <Alert variant="destructive">
          <AlertTitle>Não foi possível salvar</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}

      {hasSession ? (
        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Controller
              name="password"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="reset-password">Senha nova</FieldLabel>
                  <Input
                    {...field}
                    id="reset-password"
                    type="password"
                    autoComplete="new-password"
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
              Salvar senha
            </Button>
          </FieldGroup>
        </form>
      ) : (
        <p className="text-sm text-muted-foreground">
          <Link href="/recuperar-senha" className="underline underline-offset-4">
            Pedir recuperação de novo
          </Link>
        </p>
      )}
    </div>
  );
}
