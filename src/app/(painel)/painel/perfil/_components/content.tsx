"use client";

import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { updateProfileAction } from "../_actions/update-profile";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  profileFormSchema,
  type ProfileFormValues,
} from "@/lib/profile-schema";

export function ProfileContent({
  email,
  fields,
  loadError,
}: {
  email: string;
  fields: ProfileFormValues;
  loadError?: string;
}) {
  const router = useRouter();
  const form = useForm<ProfileFormValues>({
    resolver: zodResolver(profileFormSchema),
    defaultValues: fields,
  });

  async function handleSubmit(values: ProfileFormValues) {
    const result = await updateProfileAction(values);

    if (!result.success) {
      if (result.errors?.firstName) {
        form.setError("firstName", { message: result.errors.firstName[0] });
      }
      if (result.errors?.lastName) {
        form.setError("lastName", { message: result.errors.lastName[0] });
      }
      if (result.errors?.phone) {
        form.setError("phone", { message: result.errors.phone[0] });
      }
      if (result.errors?.company) {
        form.setError("company", { message: result.errors.company[0] });
      }
      toast.error(result.message ?? "Não foi possível salvar.");
      return;
    }

    if (result.fields) {
      form.reset(result.fields);
    }

    toast.success(result.message ?? "Perfil salvo.");
    router.refresh();
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="flex max-w-xl flex-col gap-8">
      <div className="flex flex-col gap-2">
        <p className="text-xs font-semibold tracking-[0.06em] text-muted-foreground uppercase">
          Painel
        </p>
        <h1 className="font-heading text-3xl leading-none tracking-tight">
          Meu perfil
        </h1>
        <p className="text-muted-foreground">
          Nome e sobrenome são obrigatórios. Telefone e empresa são opcionais.
        </p>
      </div>

      {loadError ? (
        <Alert variant="destructive">
          <AlertTitle>Não foi possível carregar</AlertTitle>
          <AlertDescription>{loadError}</AlertDescription>
        </Alert>
      ) : null}

      <form onSubmit={form.handleSubmit(handleSubmit)}>
        <FieldGroup>
          <Field>
            <FieldLabel htmlFor="profile-email">E-mail da conta</FieldLabel>
            <Input
              id="profile-email"
              type="email"
              defaultValue={email}
              disabled
              readOnly
              autoComplete="email"
            />
            <FieldDescription>
              Este e-mail não se altera nesta área.
            </FieldDescription>
          </Field>
          <Controller
            name="firstName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="profile-first-name">Nome</FieldLabel>
                <Input
                  {...field}
                  id="profile-first-name"
                  autoComplete="given-name"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </Field>
            )}
          />
          <Controller
            name="lastName"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="profile-last-name">Sobrenome</FieldLabel>
                <Input
                  {...field}
                  id="profile-last-name"
                  autoComplete="family-name"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </Field>
            )}
          />
          <Controller
            name="phone"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="profile-phone">Telefone (opcional)</FieldLabel>
                <Input
                  {...field}
                  id="profile-phone"
                  type="tel"
                  autoComplete="tel"
                  aria-invalid={fieldState.invalid}
                />
                {fieldState.invalid ? (
                  <FieldError errors={[fieldState.error]} />
                ) : null}
              </Field>
            )}
          />
          <Controller
            name="company"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="profile-company">Empresa (opcional)</FieldLabel>
                <Input
                  {...field}
                  id="profile-company"
                  autoComplete="organization"
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
            Salvar
          </Button>
        </FieldGroup>
      </form>
    </div>
  );
}
