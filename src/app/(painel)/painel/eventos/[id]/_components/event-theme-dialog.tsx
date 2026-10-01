"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm, useWatch, type Control } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { PaletteIcon } from "lucide-react";
import { toast } from "sonner";

import { updateEventThemeAction } from "../_actions/update-event-theme";
import type { PainelEvent } from "../_data-access/get-event";
import { PublicEventView } from "@/app/[slug]/_components/public-event-view";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import {
  buttonTextColor,
  buttonThemeStyle,
  DEFAULT_BACKGROUND_COLOR,
  DEFAULT_BUTTON_COLOR,
  DEFAULT_TITLE_COLOR,
  eventThemeFormSchema,
  hasLowTitleContrast,
  TITLE_CONTRAST_WARNING,
  toThemeFormValues,
  type EventThemeFields,
} from "@/lib/event-theme";

export function EventThemeDialog({ event }: { event: PainelEvent }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        <PaletteIcon data-icon="inline-start" />
        Personalizar tema
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Tema da página pública</DialogTitle>
          <DialogDescription>
            A prévia mostra o rascunho. A página do convite só muda depois de
            salvar, ou ao voltar ao tema padrão.
          </DialogDescription>
        </DialogHeader>
        <EventThemeForm
          key={`${event.backgroundColor ?? ""}-${event.titleColor ?? ""}-${event.buttonColor ?? ""}`}
          event={event}
          onSuccess={() => setOpen(false)}
        />
      </DialogContent>
    </Dialog>
  );
}

function EventThemeForm({
  event,
  onSuccess,
}: {
  event: PainelEvent;
  onSuccess: () => void;
}) {
  const router = useRouter();
  const [isRestoring, setIsRestoring] = useState(false);
  const form = useForm<EventThemeFields>({
    resolver: zodResolver(eventThemeFormSchema),
    defaultValues: toThemeFormValues({
      backgroundColor: event.backgroundColor,
      titleColor: event.titleColor,
      buttonColor: event.buttonColor,
    }),
  });

  const backgroundColor = useWatch({
    control: form.control,
    name: "backgroundColor",
  });
  const titleColor = useWatch({
    control: form.control,
    name: "titleColor",
  });
  const buttonColor = useWatch({
    control: form.control,
    name: "buttonColor",
  });

  const effectiveBackground = backgroundColor || DEFAULT_BACKGROUND_COLOR;
  const effectiveTitle = titleColor || DEFAULT_TITLE_COLOR;
  const effectiveButton = buttonColor || DEFAULT_BUTTON_COLOR;
  const showContrastWarning = hasLowTitleContrast(
    effectiveBackground,
    effectiveTitle
  );
  const previewButtonText = buttonTextColor(effectiveButton);
  const isSubmitting = form.formState.isSubmitting;
  const isBusy = isSubmitting || isRestoring;

  async function handleSubmit(values: EventThemeFields) {
    const result = await updateEventThemeAction(event.id, values);

    if (!result.success) {
      if (result.errors?.backgroundColor) {
        form.setError("backgroundColor", {
          message: result.errors.backgroundColor[0],
        });
      }
      if (result.errors?.titleColor) {
        form.setError("titleColor", { message: result.errors.titleColor[0] });
      }
      if (result.errors?.buttonColor) {
        form.setError("buttonColor", { message: result.errors.buttonColor[0] });
      }
      toast.error(result.message ?? "Não foi possível salvar. Tente de novo.");
      return;
    }

    toast.success(result.message ?? "Tema gravado.");
    onSuccess();
    router.refresh();
  }

  async function handleRestoreDefault() {
    form.reset({
      backgroundColor: "",
      titleColor: "",
      buttonColor: "",
    });
    setIsRestoring(true);

    const result = await updateEventThemeAction(event.id, {
      backgroundColor: null,
      titleColor: null,
      buttonColor: null,
    });

    setIsRestoring(false);

    if (!result.success) {
      toast.error(result.message ?? "Não foi possível restaurar. Tente de novo.");
      return;
    }

    toast.success(result.message ?? "Tema padrão restaurado.");
    router.refresh();
  }

  return (
    <form
      className="flex flex-col gap-6"
      onSubmit={form.handleSubmit(handleSubmit)}
    >
      <FieldGroup className="sm:grid sm:grid-cols-3 sm:items-start sm:gap-4">
        <ThemeColorField
          control={form.control}
          name="backgroundColor"
          label="Fundo"
          inputId="theme-background"
          fallback={DEFAULT_BACKGROUND_COLOR}
          disabled={isBusy}
        />
        <ThemeColorField
          control={form.control}
          name="titleColor"
          label="Título"
          inputId="theme-title"
          fallback={DEFAULT_TITLE_COLOR}
          disabled={isBusy}
        />
        <ThemeColorField
          control={form.control}
          name="buttonColor"
          label="Botão"
          inputId="theme-button"
          fallback={DEFAULT_BUTTON_COLOR}
          disabled={isBusy}
        />
      </FieldGroup>

      {showContrastWarning ? (
        <Alert>
          <AlertDescription>{TITLE_CONTRAST_WARNING}</AlertDescription>
        </Alert>
      ) : null}

      <div className="flex flex-col gap-2">
        <p className="text-sm font-medium">Prévia</p>
        <PublicEventView
          variant="preview"
          title={event.title}
          details={event.details}
          eventDate={event.eventDate}
          eventTime={event.eventTime}
          location={event.location}
          titleColor={titleColor || null}
          backgroundColor={effectiveBackground}
        >
          <FieldGroup>
            <Field>
              <FieldLabel htmlFor="theme-preview-name">Nome completo</FieldLabel>
              <Input
                id="theme-preview-name"
                readOnly
                tabIndex={-1}
                autoComplete="off"
              />
            </Field>
            <Button
              type="button"
              tabIndex={-1}
              style={buttonThemeStyle(buttonColor || null, previewButtonText)}
            >
              Eu vou!
            </Button>
          </FieldGroup>
        </PublicEventView>
      </div>

      <DialogFooter className="-mx-0 -mb-0 rounded-none border-0 bg-transparent p-0">
        <Button
          type="button"
          variant="outline"
          disabled={isBusy}
          onClick={() => void handleRestoreDefault()}
        >
          {isRestoring ? <Spinner data-icon="inline-start" /> : null}
          Voltar ao tema padrão
        </Button>
        <Button type="submit" disabled={isBusy}>
          {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
          Salvar
        </Button>
      </DialogFooter>
    </form>
  );
}

function ThemeColorField({
  control,
  name,
  label,
  inputId,
  fallback,
  disabled,
}: {
  control: Control<EventThemeFields>;
  name: keyof EventThemeFields;
  label: string;
  inputId: string;
  fallback: string;
  disabled: boolean;
}) {
  return (
    <Controller
      name={name}
      control={control}
      render={({ field, fieldState }) => {
        const isCustom = field.value !== "";

        return (
          <Field data-invalid={fieldState.invalid}>
            <FieldLabel htmlFor={inputId}>{label}</FieldLabel>
            <div className="flex items-center gap-2">
              <input
                id={inputId}
                type="color"
                disabled={disabled}
                value={field.value || fallback}
                aria-invalid={fieldState.invalid}
                className="size-10 cursor-pointer rounded-md border border-input bg-transparent p-0.5 disabled:cursor-not-allowed disabled:opacity-50"
                onChange={(event) => field.onChange(event.target.value)}
              />
              <Button
                type="button"
                variant="ghost"
                size="sm"
                disabled={disabled || !isCustom}
                onClick={() => field.onChange("")}
              >
                Padrão
              </Button>
            </div>
            {fieldState.invalid ? (
              <FieldError errors={[fieldState.error]} />
            ) : null}
          </Field>
        );
      }}
    />
  );
}
