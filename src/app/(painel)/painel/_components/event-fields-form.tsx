"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { EventIllustration } from "@/components/event-illustration";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldContent,
  FieldDescription,
  FieldError,
  FieldGroup,
  FieldLabel,
  FieldLegend,
  FieldSet,
  FieldTitle,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  hasLayoutAspect,
  illustrationAspect,
  illustrationAspectWarning,
  illustrationFieldHelp,
  IMAGE_ONLY_REQUIRES_IMAGE_MESSAGE,
  ILLUSTRATION_INVALID_TYPE_MESSAGE,
  validateIllustrationFile,
  type EventPageLayout,
} from "@/lib/event-illustration";
import {
  makeEventFieldsSchema,
  type EventFieldErrors,
  type EventFields,
} from "@/lib/event-schema";

type SubmitResult = {
  success: boolean;
  message?: string;
  errors?: EventFieldErrors;
};

function readImageSize(file: File) {
  return new Promise<{ width: number; height: number } | null>((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(null);
    };
    image.src = objectUrl;
  });
}

export function EventFieldsForm({
  defaultValues,
  currentDate,
  submitLabel,
  savedImageUrl,
  persistedLayout = null,
  onSubmit,
  onSuccess,
}: {
  defaultValues: EventFields;
  currentDate?: string;
  submitLabel: string;
  savedImageUrl?: string | null;
  persistedLayout?: EventPageLayout | null;
  onSubmit: (formData: FormData) => Promise<SubmitResult>;
  onSuccess?: () => void;
}) {
  const schema = useMemo(
    () => makeEventFieldsSchema(currentDate),
    [currentDate]
  );
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [shouldRemoveIllustration, setShouldRemoveIllustration] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);
  const form = useForm<EventFields>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  const selectedLayout = form.watch("layout");
  const canUseSavedImage =
    Boolean(savedImageUrl) &&
    persistedLayout === selectedLayout &&
    !shouldRemoveIllustration;
  const previewUrl = objectUrl ?? (canUseSavedImage ? savedImageUrl ?? null : null);
  const previewAlt = form.watch("title").trim() || "Prévia da imagem do evento";
  const hasAspectWarning =
    imageSize !== null &&
    !hasLayoutAspect(selectedLayout, imageSize.width, imageSize.height);

  function clearSelectedFile() {
    setSelectedFile(null);
    setImageSize(null);
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }
    setObjectUrl(null);
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const selectionError = validateIllustrationFile(file);

    if (selectionError) {
      setFileError(selectionError);
      clearSelectedFile();
      event.target.value = "";
      return;
    }

    const size = await readImageSize(file);

    if (!size) {
      setFileError(ILLUSTRATION_INVALID_TYPE_MESSAGE);
      clearSelectedFile();
      event.target.value = "";
      return;
    }

    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }

    setFileError(null);
    setSelectedFile(file);
    setImageSize(size);
    setShouldRemoveIllustration(false);
    setObjectUrl(URL.createObjectURL(file));
  }

  function handleRemoveIllustration() {
    clearSelectedFile();
    setFileError(null);
    setShouldRemoveIllustration(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  async function handleSubmit(values: EventFields) {
    const keepsSavedImage =
      persistedLayout === values.layout &&
      Boolean(savedImageUrl) &&
      !shouldRemoveIllustration;

    if (values.layout === "image_only" && !selectedFile && !keepsSavedImage) {
      setFileError(IMAGE_ONLY_REQUIRES_IMAGE_MESSAGE);
      toast.error(IMAGE_ONLY_REQUIRES_IMAGE_MESSAGE);
      return;
    }

    const formData = new FormData();
    formData.set("title", values.title);
    formData.set("details", values.details);
    formData.set("eventDate", values.eventDate);
    formData.set("eventTime", values.eventTime);
    formData.set("location", values.location);
    formData.set("layout", values.layout);
    formData.set("confirmationStartsOn", values.confirmationStartsOn);
    formData.set("confirmationEndsOn", values.confirmationEndsOn);

    if (selectedFile) {
      formData.set("illustration", selectedFile);
    }

    if (shouldRemoveIllustration) {
      formData.set("removeIllustration", "true");
    }

    const result = await onSubmit(formData);

    if (!result.success) {
      if (result.errors?.title) {
        form.setError("title", { message: result.errors.title[0] });
      }
      if (result.errors?.details) {
        form.setError("details", { message: result.errors.details[0] });
      }
      if (result.errors?.eventDate) {
        form.setError("eventDate", { message: result.errors.eventDate[0] });
      }
      if (result.errors?.eventTime) {
        form.setError("eventTime", { message: result.errors.eventTime[0] });
      }
      if (result.errors?.location) {
        form.setError("location", { message: result.errors.location[0] });
      }
      if (result.errors?.layout) {
        form.setError("layout", { message: result.errors.layout[0] });
      }
      if (result.errors?.confirmationStartsOn) {
        form.setError("confirmationStartsOn", {
          message: result.errors.confirmationStartsOn[0],
        });
      }
      if (result.errors?.confirmationEndsOn) {
        form.setError("confirmationEndsOn", {
          message: result.errors.confirmationEndsOn[0],
        });
      }
      if (result.errors?.illustration) {
        setFileError(result.errors.illustration[0]);
      }
      toast.error(result.message ?? "Não foi possível salvar. Tente de novo.");
      return;
    }

    if (result.message) {
      toast.success(result.message);
    }
    onSuccess?.();
    router.refresh();
  }

  const isSubmitting = form.formState.isSubmitting;
  const isImageRequired = selectedLayout === "image_only";

  return (
    <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="event-title">Título</FieldLabel>
              <Input
                {...field}
                id="event-title"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : null}
            </Field>
          )}
        />
        <Controller
          name="details"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="event-details">Detalhes (opcional)</FieldLabel>
              <Textarea
                {...field}
                id="event-details"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : null}
            </Field>
          )}
        />
        <Controller
          name="eventDate"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="event-date">Data</FieldLabel>
              <Input
                {...field}
                id="event-date"
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
          name="eventTime"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="event-time">Horário</FieldLabel>
              <Input
                {...field}
                id="event-time"
                type="time"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : null}
            </Field>
          )}
        />
        <Controller
          name="location"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor="event-location">Local</FieldLabel>
              <Input
                {...field}
                id="event-location"
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : null}
            </Field>
          )}
        />
        <Controller
          name="layout"
          control={form.control}
          render={({ field, fieldState }) => (
            <FieldSet>
              <FieldLegend variant="label">Layout da página</FieldLegend>
              <RadioGroup
                value={field.value}
                onValueChange={field.onChange}
                aria-invalid={fieldState.invalid}
              >
                <FieldLabel htmlFor="layout-personalized">
                  <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                    <RadioGroupItem
                      value="personalized"
                      id="layout-personalized"
                    />
                    <FieldContent>
                      <FieldTitle>Personalizado</FieldTitle>
                      <FieldDescription>
                        O convidado vê a faixa, se houver, o título, os
                        detalhes, a data, o horário e o local, e depois a
                        confirmação.
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                </FieldLabel>
                <FieldLabel htmlFor="layout-image-only">
                  <Field orientation="horizontal" data-invalid={fieldState.invalid}>
                    <RadioGroupItem value="image_only" id="layout-image-only" />
                    <FieldContent>
                      <FieldTitle>Somente imagem</FieldTitle>
                      <FieldDescription>
                        O convidado vê somente a imagem e depois a confirmação.
                      </FieldDescription>
                    </FieldContent>
                  </Field>
                </FieldLabel>
              </RadioGroup>
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : null}
            </FieldSet>
          )}
        />
        <Field data-invalid={Boolean(fileError)}>
          <FieldLabel htmlFor="event-illustration">
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
            id="event-illustration"
            type="file"
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            aria-invalid={Boolean(fileError)}
            onChange={(event) => void handleFileChange(event)}
          />
          {fileError ? <FieldError errors={[{ message: fileError }]} /> : null}
          {previewUrl ? (
            <Button type="button" variant="outline" onClick={handleRemoveIllustration}>
              Remover imagem
            </Button>
          ) : null}
        </Field>
        <FieldSet>
          <FieldLegend>Janela de confirmação (opcional)</FieldLegend>
          <FieldDescription>
            O dia de início aceita nome. O dia de fim não aceita. Sem janela, a
            confirmação fica aberta até a véspera do evento.
          </FieldDescription>
          <Controller
            name="confirmationStartsOn"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirmation-starts-on">Início</FieldLabel>
                <Input
                  {...field}
                  id="confirmation-starts-on"
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
            name="confirmationEndsOn"
            control={form.control}
            render={({ field, fieldState }) => (
              <Field data-invalid={fieldState.invalid}>
                <FieldLabel htmlFor="confirmation-ends-on">Fim</FieldLabel>
                <Input
                  {...field}
                  id="confirmation-ends-on"
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
      </FieldGroup>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
        {submitLabel}
      </Button>
    </form>
  );
}
