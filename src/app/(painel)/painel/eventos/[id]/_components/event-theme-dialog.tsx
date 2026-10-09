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
import { eventIllustrationUrl } from "@/lib/event-illustration";
import {
  backgroundGradient,
  buttonTextColor,
  buttonThemeStyle,
  DEFAULT_BACKGROUND_COLOR_1,
  DEFAULT_BACKGROUND_COLOR_2,
  DEFAULT_TEXT_COLOR,
  DEFAULT_TITLE_COLOR,
  eventThemeFormSchema,
  getContrastWarnings,
  toThemeFormValues,
  type EventThemeFields,
} from "@/lib/event-theme";
import { cn } from "@/lib/utils";

const EMPTY_THEME_FIELDS: EventThemeFields = {
  backgroundColor1: "",
  backgroundColor2: "",
  titleColor: "",
  textColor: "",
};

export function EventThemeDialog({ event }: { event: PainelEvent }) {
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger render={<Button variant="outline" />}>
        <PaletteIcon data-icon="inline-start" />
        Personalizar
      </DialogTrigger>
      <DialogContent className="max-h-[90vh] overflow-y-auto sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Personalizar a página do evento</DialogTitle>
        </DialogHeader>
        <EventThemeForm
          key={`${event.backgroundColor1 ?? ""}-${event.backgroundColor2 ?? ""}-${event.titleColor ?? ""}-${event.textColor ?? ""}-${event.pageLayout}`}
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
  const isPersonalized = event.pageLayout === "personalized";
  const form = useForm<EventThemeFields>({
    resolver: zodResolver(eventThemeFormSchema),
    defaultValues: toThemeFormValues({
      backgroundColor1: event.backgroundColor1,
      backgroundColor2: event.backgroundColor2,
      titleColor: event.titleColor,
      textColor: event.textColor,
    }),
  });

  const backgroundColor1 = useWatch({
    control: form.control,
    name: "backgroundColor1",
  });
  const backgroundColor2 = useWatch({
    control: form.control,
    name: "backgroundColor2",
  });
  const titleColor = useWatch({
    control: form.control,
    name: "titleColor",
  });
  const textColor = useWatch({
    control: form.control,
    name: "textColor",
  });

  const effectiveColor1 = backgroundColor1 || DEFAULT_BACKGROUND_COLOR_1;
  const effectiveColor2 = backgroundColor2 || DEFAULT_BACKGROUND_COLOR_2;
  const effectiveTitle = titleColor || DEFAULT_TITLE_COLOR;
  const effectiveText = textColor || DEFAULT_TEXT_COLOR;
  const contrastWarnings = isPersonalized
    ? getContrastWarnings({
        backgroundColor1: effectiveColor1,
        backgroundColor2: effectiveColor2,
        titleColor: effectiveTitle,
        textColor: effectiveText,
      })
    : [];
  const previewButtonText = buttonTextColor(effectiveColor1);
  const isSubmitting = form.formState.isSubmitting;
  const isBusy = isSubmitting || isRestoring;

  async function handleSubmit(values: EventThemeFields) {
    const result = await updateEventThemeAction(event.id, values);

    if (!result.success) {
      if (result.errors?.backgroundColor1) {
        form.setError("backgroundColor1", {
          message: result.errors.backgroundColor1[0],
        });
      }
      if (result.errors?.backgroundColor2) {
        form.setError("backgroundColor2", {
          message: result.errors.backgroundColor2[0],
        });
      }
      if (result.errors?.titleColor) {
        form.setError("titleColor", { message: result.errors.titleColor[0] });
      }
      if (result.errors?.textColor) {
        form.setError("textColor", { message: result.errors.textColor[0] });
      }
      toast.error(result.message ?? "Não foi possível salvar. Tente de novo.");
      return;
    }

    toast.success(result.message ?? "Tema gravado.");
    onSuccess();
    router.refresh();
  }

  async function handleRestoreDefault() {
    const previousValues = form.getValues();

    form.reset(EMPTY_THEME_FIELDS);
    setIsRestoring(true);

    const result = await updateEventThemeAction(event.id, {
      backgroundColor1: null,
      backgroundColor2: null,
      titleColor: null,
      textColor: null,
    });

    setIsRestoring(false);

    if (!result.success) {
      form.reset(previousValues);
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
      <FieldGroup
        className={cn(
          "sm:grid sm:items-start sm:gap-4",
          isPersonalized ? "sm:grid-cols-4" : "sm:grid-cols-2"
        )}
      >
        <ThemeColorField
          control={form.control}
          name="backgroundColor1"
          label="Cor 1 (topo)"
          inputId="theme-background-1"
          fallback={DEFAULT_BACKGROUND_COLOR_1}
          disabled={isBusy}
        />
        <ThemeColorField
          control={form.control}
          name="backgroundColor2"
          label="Cor 2 (base)"
          inputId="theme-background-2"
          fallback={DEFAULT_BACKGROUND_COLOR_2}
          disabled={isBusy}
        />
        {isPersonalized ? (
          <>
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
              name="textColor"
              label="Texto"
              inputId="theme-text"
              fallback={DEFAULT_TEXT_COLOR}
              disabled={isBusy}
            />
          </>
        ) : null}
      </FieldGroup>

      {contrastWarnings.length > 0 ? (
        <div className="flex flex-col gap-2">
          {contrastWarnings.map((warning) => (
            <Alert key={warning}>
              <AlertDescription>{warning}</AlertDescription>
            </Alert>
          ))}
        </div>
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
          titleColor={effectiveTitle}
          textColor={effectiveText}
          backgroundImage={backgroundGradient(effectiveColor1, effectiveColor2)}
          layout={event.pageLayout}
          imageUrl={
            event.hasIllustration
              ? eventIllustrationUrl(event.slug, event.updatedAt)
              : null
          }
        >
          <FieldGroup>
            <p
              className={cn(
                "text-sm",
                isPersonalized ? undefined : "text-muted-foreground"
              )}
              style={isPersonalized ? { color: effectiveText } : undefined}
            >
              Confirmação de presença
            </p>
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
              style={buttonThemeStyle(effectiveColor1, previewButtonText)}
            >
              confirmo
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
          Redefinir tema
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
