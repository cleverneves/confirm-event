"use client";

import { useEffect, useState } from "react";
import { Controller, useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PlusIcon, XIcon } from "lucide-react";
import { z } from "zod";

import { confirmPresenceAction } from "../_actions/confirm-presence";
import { findDuplicateNameKey } from "@/lib/people/name-key";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

const personSchema = z.object({
  firstName: z.string().trim().min(1, "Informe o nome"),
  lastName: z.string().trim().min(1, "Informe o sobrenome"),
});

const formSchema = z
  .object({
    party: z.enum(["mariana", "victor"], {
      error: "Escolha a festa",
    }),
    titular: personSchema,
    companions: z.array(personSchema),
  })
  .superRefine((data, ctx) => {
    const duplicate = findDuplicateNameKey([data.titular, ...data.companions]);
    if (duplicate) {
      ctx.addIssue({
        code: "custom",
        path: ["companions"],
        message: "Há nomes repetidos neste envio.",
      });
    }
  });

type FormValues = z.infer<typeof formSchema>;

export function ConfirmationForm() {
  const [isClient, setIsClient] = useState(false);
  const [formError, setFormError] = useState<string | null>(null);
  const [isSuccess, setIsSuccess] = useState(false);
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      party: undefined,
      titular: { firstName: "", lastName: "" },
      companions: [],
    },
  });
  const companions = useFieldArray({
    control: form.control,
    name: "companions",
  });

  async function handleSubmit(values: FormValues) {
    setFormError(null);
    const result = await confirmPresenceAction(values);

    if (!result.success) {
      setFormError(result.message ?? "Não foi possível confirmar. Tente de novo.");
      return;
    }

    setIsSuccess(true);
  }

  function handleAddCompanion() {
    companions.append({ firstName: "", lastName: "" });
  }

  const isSubmitting = form.formState.isSubmitting;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="min-h-96" />;
  }

  if (isSuccess) {
    return (
      <div className="flex flex-col gap-3 border border-border bg-card px-5 py-6">
        <h2 className="font-heading text-2xl">Presença confirmada</h2>
        <p className="text-muted-foreground">
          Te esperamos no mesmo lugar, no mesmo horário.
        </p>
      </div>
    );
  }

  return (
    <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
      {formError ? (
        <Alert variant="destructive">
          <AlertTitle>Não foi possível confirmar</AlertTitle>
          <AlertDescription>{formError}</AlertDescription>
        </Alert>
      ) : null}

      <FieldGroup>
        <Controller
          name="party"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel>De qual festa você foi convidado?</FieldLabel>
              <ToggleGroup
                value={field.value ? [field.value] : []}
                onValueChange={(value) => {
                  field.onChange(value[0]);
                }}
                spacing={2}
                className="w-full"
                variant="outline"
                aria-invalid={fieldState.invalid}
              >
                <ToggleGroupItem className="flex-1" value="mariana">
                  Festa da Mariana
                </ToggleGroupItem>
                <ToggleGroupItem className="flex-1" value="victor">
                  Festa do Victor
                </ToggleGroupItem>
              </ToggleGroup>
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : null}
            </Field>
          )}
        />

        <Controller
          name="titular.firstName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="titular-first-name">Seu nome</FieldLabel>
              <Input
                {...field}
                id="titular-first-name"
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
          name="titular.lastName"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="titular-last-name">Seu sobrenome</FieldLabel>
              <Input
                {...field}
                id="titular-last-name"
                autoComplete="family-name"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : null}
            </Field>
          )}
        />

        <FieldSet>
          <FieldLegend>Acompanhantes</FieldLegend>
          <p className="text-sm text-muted-foreground">
            Opcional. Cada pessoa entra na mesma festa.
          </p>
          {companions.fields.map((companion, index) => (
            <div key={companion.id} className="flex flex-col gap-3 border border-border/80 p-3">
              <div className="flex items-center justify-between gap-3">
                <p className="text-sm font-medium">Acompanhante {index + 1}</p>
                <Button
                  type="button"
                  variant="ghost"
                  size="sm"
                  onClick={() => companions.remove(index)}
                >
                  <XIcon data-icon="inline-start" />
                  Remover
                </Button>
              </div>
              <Controller
                name={`companions.${index}.firstName`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`companion-${index}-first-name`}>
                      Nome
                    </FieldLabel>
                    <Input
                      {...field}
                      id={`companion-${index}-first-name`}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />
              <Controller
                name={`companions.${index}.lastName`}
                control={form.control}
                render={({ field, fieldState }) => (
                  <Field data-invalid={fieldState.invalid}>
                    <FieldLabel htmlFor={`companion-${index}-last-name`}>
                      Sobrenome
                    </FieldLabel>
                    <Input
                      {...field}
                      id={`companion-${index}-last-name`}
                      aria-invalid={fieldState.invalid}
                    />
                    {fieldState.invalid ? (
                      <FieldError errors={[fieldState.error]} />
                    ) : null}
                  </Field>
                )}
              />
            </div>
          ))}
          {form.formState.errors.companions &&
          "message" in form.formState.errors.companions &&
          form.formState.errors.companions.message ? (
            <FieldError
              errors={[{ message: form.formState.errors.companions.message }]}
            />
          ) : null}
          <Button type="button" variant="outline" onClick={handleAddCompanion}>
            <PlusIcon data-icon="inline-start" />
            Adicionar acompanhante
          </Button>
        </FieldSet>

        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
          Confirmar presença
        </Button>
      </FieldGroup>
    </form>
  );
}
