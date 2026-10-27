"use client";

import type { Control, FieldValues, Path } from "react-hook-form";
import { Controller } from "react-hook-form";

import { PageLayoutMark } from "./page-layout-mark";
import { EventIllustration } from "@/components/event-illustration";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  illustrationAspect,
  illustrationAspectWarning,
  illustrationFieldHelp,
  pageLayoutLabel,
  type EventPageLayout,
} from "@/lib/event-illustration";
import { cn } from "@/lib/utils";

type PublicationShape = {
  layout: EventPageLayout;
  maxGuestCapacity: string;
  confirmationStartsOn: string;
  confirmationEndsOn: string;
};

const LAYOUT_OPTIONS: {
  value: EventPageLayout;
  description: string;
}[] = [
    {
      value: "personalized",
      description: "Edita todas as informações.",
    },
    {
      value: "image_only",
      description: "Envie a imagem do evento.",
    },
  ];

export function EventLayoutField<T extends FieldValues & PublicationShape>({
  control,
  idPrefix,
}: {
  control: Control<T>;
  idPrefix: string;
}) {
  return (
    <Controller
      name={"layout" as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <FieldSet>
          <FieldLegend variant="label">Layout da página</FieldLegend>
          <RadioGroup
            value={field.value}
            onValueChange={field.onChange}
            aria-invalid={fieldState.invalid}
            className="grid grid-cols-2 gap-3"
          >
            {LAYOUT_OPTIONS.map((option) => {
              const inputId = `${idPrefix}-layout-${option.value === "personalized" ? "personalized" : "image-only"}`;
              const isSelected = field.value === option.value;

              return (
                <FieldLabel key={option.value} htmlFor={inputId} className="min-w-0">
                  <div
                    className={cn(
                      "flex min-w-0 cursor-pointer flex-col items-center gap-3 rounded-lg bg-card p-4 text-center shadow-panel transition-shadow",
                      isSelected
                        ? "ring-2 ring-primary"
                        : "ring-1 ring-muted-foreground/20"
                    )}
                    data-invalid={fieldState.invalid}
                  >
                    <RadioGroupItem
                      value={option.value}
                      id={inputId}
                      className="sr-only"
                    />
                    <PageLayoutMark layout={option.value} size="choice" />
                    <FieldContent className="min-w-0 items-center">
                      <FieldTitle>{pageLayoutLabel(option.value)}</FieldTitle>
                      <FieldDescription>{option.description}</FieldDescription>
                    </FieldContent>
                  </div>
                </FieldLabel>
              );
            })}
          </RadioGroup>
          {fieldState.invalid ? (
            <FieldError errors={[fieldState.error]} />
          ) : null}
        </FieldSet>
      )}
    />
  );
}

export function EventIllustrationField({
  selectedLayout,
  isImageRequired,
  previewUrl,
  previewAlt,
  hasAspectWarning,
  fileError,
  inputId,
  fileInputRef,
  onFileChange,
  onRemove,
}: {
  selectedLayout: EventPageLayout;
  isImageRequired: boolean;
  previewUrl: string | null;
  previewAlt: string;
  hasAspectWarning: boolean;
  fileError: string | null;
  inputId: string;
  fileInputRef: React.RefObject<HTMLInputElement | null>;
  onFileChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onRemove: () => void;
}) {
  return (
    <Field data-invalid={Boolean(fileError)}>
      <FieldLabel htmlFor={inputId}>
        {isImageRequired ? "Imagem" : "Imagem (opcional)"}
      </FieldLabel>
      <FieldDescription>{illustrationFieldHelp(selectedLayout)}</FieldDescription>
      {previewUrl ? (
        <EventIllustration
          src={previewUrl}
          alt={previewAlt}
          aspect={illustrationAspect(selectedLayout)}
        />
      ) : null}
      {hasAspectWarning ? (
        <Alert>
          <AlertDescription>
            {illustrationAspectWarning(selectedLayout)}
          </AlertDescription>
        </Alert>
      ) : null}
      <Input
        ref={fileInputRef}
        id={inputId}
        type="file"
        accept=".jpg,.jpeg,.png,image/jpeg,image/png"
        aria-invalid={Boolean(fileError)}
        onChange={(event) => void onFileChange(event)}
      />
      {fileError ? <FieldError errors={[{ message: fileError }]} /> : null}
      {previewUrl ? (
        <Button type="button" variant="outline" onClick={onRemove}>
          Remover imagem
        </Button>
      ) : null}
    </Field>
  );
}

export function EventCapacityField<T extends FieldValues & PublicationShape>({
  control,
  idPrefix,
}: {
  control: Control<T>;
  idPrefix: string;
}) {
  return (
    <Controller
      name={"maxGuestCapacity" as Path<T>}
      control={control}
      render={({ field, fieldState }) => (
        <Field data-invalid={fieldState.invalid}>
          <FieldLabel htmlFor={`${idPrefix}-max-guest-capacity`}>
            Capacidade máxima de convidados (opcional)
          </FieldLabel>
          <Input
            {...field}
            id={`${idPrefix}-max-guest-capacity`}
            inputMode="numeric"
            autoComplete="off"
            aria-invalid={fieldState.invalid}
          />
          {fieldState.invalid ? (
            <FieldError errors={[fieldState.error]} />
          ) : null}
        </Field>
      )}
    />
  );
}

export function EventConfirmationWindowFields<
  T extends FieldValues & PublicationShape,
>({
  control,
  idPrefix,
}: {
  control: Control<T>;
  idPrefix: string;
}) {
  return (
    <FieldSet>
      <FieldLegend>Período de confirmação (opcional)</FieldLegend>
      <FieldDescription>
        Início e fim que a confirmação fica disponível para o convidado.
      </FieldDescription>
      <Controller
        name={"confirmationStartsOn" as Path<T>}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${idPrefix}-confirmation-starts-on`}>
              Início
            </FieldLabel>
            <Input
              {...field}
              id={`${idPrefix}-confirmation-starts-on`}
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
        name={"confirmationEndsOn" as Path<T>}
        control={control}
        render={({ field, fieldState }) => (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={`${idPrefix}-confirmation-ends-on`}>
              Fim
            </FieldLabel>
            <Input
              {...field}
              id={`${idPrefix}-confirmation-ends-on`}
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
  );
}
