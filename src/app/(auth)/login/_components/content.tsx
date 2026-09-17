"use client";

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

import { loginAction } from "../_actions/login";
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
  password: z.string().min(1, "Informe a senha"),
});

type FormValues = z.infer<typeof formSchema>;

export function LoginContent() {
  const [formError, setFormError] = useState<string | null>(null);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  });

  async function handleSubmit(values: FormValues) {
    setFormError(null);
    const result = await loginAction(values);

    if (!result.success) {
      if (result.errors) {
        if (result.errors.email) {
          form.setError("email", { message: result.errors.email[0] });
        }
        if (result.errors.password) {
          form.setError("password", { message: result.errors.password[0] });
        }
      }
      setFormError(result.message ?? "Não foi possível entrar.");
    }
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="mx-auto flex w-full max-w-md flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="font-heading text-sm text-muted-foreground">Organização</p>
        <h1 className="font-heading text-3xl leading-none">Entrar no painel</h1>
        <p className="text-muted-foreground">
          Só quem organiza a festa acessa totais e nomes.
        </p>
      </div>

      {formError ? (
        <Alert variant="destructive">
          <AlertTitle>Não foi possível entrar</AlertTitle>
          <AlertDescription>
            {formError ?? "Confira os dados e tente de novo."}
          </AlertDescription>
        </Alert>
      ) : null}

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup>
          <Controller
            name="email"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-email">E-mail</FieldLabel>
                <Input
                  {...field}
                  id="login-email"
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
          <Controller
            name="password"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="login-password">Senha</FieldLabel>
                <Input
                  {...field}
                  id="login-password"
                  type="password"
                  autoComplete="current-password"
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
            Entrar
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
