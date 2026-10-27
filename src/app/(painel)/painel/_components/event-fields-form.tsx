"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import {
  EventCapacityField,
  EventConfirmationWindowFields,
  EventIllustrationField,
  EventLayoutField,
} from "./event-publication-fields";
import { useIllustrationField } from "./use-illustration-field";
import { Button } from "@/components/ui/button";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { Textarea } from "@/components/ui/textarea";
import {
  IMAGE_ONLY_REQUIRES_IMAGE_MESSAGE,
  type EventPageLayout,
} from "@/lib/event-illustration";
import {
  makeEventFieldsSchema,
  makeEventOccasionSchema,
  type EventFieldErrors,
  type EventFields,
  type EventOccasionFields,
} from "@/lib/event-schema";

type SubmitResult = {
  success: boolean;
  message?: string;
  errors?: EventFieldErrors;
};

type EventFieldsFormProps = {
  submitLabel: string;
  onSubmit: (formData: FormData) => Promise<SubmitResult>;
  onSuccess?: () => void;
  idPrefix?: string;
  savedImageUrl?: string | null;
  persistedLayout?: EventPageLayout | null;
} & (
  | {
      mode?: "full";
      defaultValues: EventFields;
      currentDate?: string;
    }
  | {
      mode: "occasion";
      defaultValues: EventOccasionFields;
      currentDate?: string;
    }
);

export function EventFieldsForm(props: EventFieldsFormProps) {
  if (props.mode === "occasion") {
    return <EventOccasionFieldsForm {...props} />;
  }

  return <EventFullFieldsForm {...props} mode="full" defaultValues={props.defaultValues} />;
}

function EventOccasionFieldsForm({
  defaultValues,
  currentDate,
  submitLabel,
  onSubmit,
  onSuccess,
  idPrefix = "event",
}: Extract<EventFieldsFormProps, { mode: "occasion" }>) {
  const schema = useMemo(
    () => makeEventOccasionSchema(currentDate),
    [currentDate]
  );
  const router = useRouter();
  const form = useForm<EventOccasionFields>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  async function handleSubmit(values: EventOccasionFields) {
    const formData = new FormData();
    formData.set("title", values.title);
    formData.set("details", values.details);
    formData.set("eventDate", values.eventDate);
    formData.set("eventTime", values.eventTime);
    formData.set("location", values.location);

    const result = await onSubmit(formData);

    if (!result.success) {
      applyOccasionErrors(form, result.errors);
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

  return (
    <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${idPrefix}-title`}>Título</FieldLabel>
              <Input
                {...field}
                id={`${idPrefix}-title`}
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
              <FieldLabel htmlFor={`${idPrefix}-details`}>
                Detalhes (opcional)
              </FieldLabel>
              <Textarea
                {...field}
                id={`${idPrefix}-details`}
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
              <FieldLabel htmlFor={`${idPrefix}-date`}>Data</FieldLabel>
              <Input
                {...field}
                id={`${idPrefix}-date`}
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
              <FieldLabel htmlFor={`${idPrefix}-time`}>Horário</FieldLabel>
              <Input
                {...field}
                id={`${idPrefix}-time`}
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
              <FieldLabel htmlFor={`${idPrefix}-location`}>Local</FieldLabel>
              <Input
                {...field}
                id={`${idPrefix}-location`}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : null}
            </Field>
          )}
        />
      </FieldGroup>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
        {submitLabel}
      </Button>
    </form>
  );
}

function EventFullFieldsForm({
  defaultValues,
  currentDate,
  submitLabel,
  savedImageUrl,
  persistedLayout = null,
  onSubmit,
  onSuccess,
  idPrefix = "event",
}: Extract<EventFieldsFormProps, { mode?: "full" }>) {
  const schema = useMemo(
    () => makeEventFieldsSchema(currentDate),
    [currentDate]
  );
  const router = useRouter();
  const form = useForm<EventFields>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const selectedLayout = form.watch("layout");
  const previewAlt = form.watch("title").trim() || "Prévia da imagem do evento";
  const illustration = useIllustrationField({
    selectedLayout,
    savedImageUrl,
    persistedLayout,
    previewAlt,
    inputId: `${idPrefix}-illustration`,
  });

  async function handleSubmit(values: EventFields) {
    if (
      !illustration.validateImageOnlyLayout(
        values.layout,
        IMAGE_ONLY_REQUIRES_IMAGE_MESSAGE
      )
    ) {
      toast.error(IMAGE_ONLY_REQUIRES_IMAGE_MESSAGE);
      return;
    }

    const formData = new FormData();
    formData.set("title", values.title);
    formData.set("details", values.details);
    formData.set("eventDate", values.eventDate);
    formData.set("eventTime", values.eventTime);
    formData.set("location", values.location);
    formData.set("maxGuestCapacity", values.maxGuestCapacity);
    formData.set("layout", values.layout);
    formData.set("confirmationStartsOn", values.confirmationStartsOn);
    formData.set("confirmationEndsOn", values.confirmationEndsOn);
    illustration.appendIllustrationToFormData(formData);

    const result = await onSubmit(formData);

    if (!result.success) {
      applyFullErrors(form, result.errors, illustration.setFileError);
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

  return (
    <form className="flex flex-col gap-6" onSubmit={form.handleSubmit(handleSubmit)}>
      <FieldGroup>
        <Controller
          name="title"
          control={form.control}
          render={({ field, fieldState }) => (
            <Field data-invalid={fieldState.invalid}>
              <FieldLabel htmlFor={`${idPrefix}-title`}>Título</FieldLabel>
              <Input
                {...field}
                id={`${idPrefix}-title`}
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
              <FieldLabel htmlFor={`${idPrefix}-details`}>
                Detalhes (opcional)
              </FieldLabel>
              <Textarea
                {...field}
                id={`${idPrefix}-details`}
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
              <FieldLabel htmlFor={`${idPrefix}-date`}>Data</FieldLabel>
              <Input
                {...field}
                id={`${idPrefix}-date`}
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
              <FieldLabel htmlFor={`${idPrefix}-time`}>Horário</FieldLabel>
              <Input
                {...field}
                id={`${idPrefix}-time`}
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
              <FieldLabel htmlFor={`${idPrefix}-location`}>Local</FieldLabel>
              <Input
                {...field}
                id={`${idPrefix}-location`}
                aria-invalid={fieldState.invalid}
              />
              {fieldState.invalid ? (
                <FieldError errors={[fieldState.error]} />
              ) : null}
            </Field>
          )}
        />
        <EventCapacityField control={form.control} idPrefix={idPrefix} />
        <EventLayoutField control={form.control} idPrefix={idPrefix} />
        <EventIllustrationField
          selectedLayout={selectedLayout}
          isImageRequired={illustration.isImageRequired}
          previewUrl={illustration.previewUrl}
          previewAlt={illustration.previewAlt}
          hasAspectWarning={illustration.hasAspectWarning}
          fileError={illustration.fileError}
          inputId={illustration.inputId}
          fileInputRef={illustration.fileInputRef}
          onFileChange={illustration.handleFileChange}
          onRemove={illustration.handleRemoveIllustration}
        />
        <EventConfirmationWindowFields
          control={form.control}
          idPrefix={idPrefix}
        />
      </FieldGroup>
      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
        {submitLabel}
      </Button>
    </form>
  );
}

function applyOccasionErrors(
  form: ReturnType<typeof useForm<EventOccasionFields>>,
  errors?: EventFieldErrors
) {
  if (errors?.title) {
    form.setError("title", { message: errors.title[0] });
  }
  if (errors?.details) {
    form.setError("details", { message: errors.details[0] });
  }
  if (errors?.eventDate) {
    form.setError("eventDate", { message: errors.eventDate[0] });
  }
  if (errors?.eventTime) {
    form.setError("eventTime", { message: errors.eventTime[0] });
  }
  if (errors?.location) {
    form.setError("location", { message: errors.location[0] });
  }
}

function applyFullErrors(
  form: ReturnType<typeof useForm<EventFields>>,
  errors: EventFieldErrors | undefined,
  setFileError: (message: string) => void
) {
  if (errors?.title) {
    form.setError("title", { message: errors.title[0] });
  }
  if (errors?.details) {
    form.setError("details", { message: errors.details[0] });
  }
  if (errors?.eventDate) {
    form.setError("eventDate", { message: errors.eventDate[0] });
  }
  if (errors?.eventTime) {
    form.setError("eventTime", { message: errors.eventTime[0] });
  }
  if (errors?.location) {
    form.setError("location", { message: errors.location[0] });
  }

  if (errors?.maxGuestCapacity) {
    form.setError("maxGuestCapacity", {
      message: errors.maxGuestCapacity[0],
    });
  }
  if (errors?.layout) {
    form.setError("layout", { message: errors.layout[0] });
  }
  if (errors?.confirmationStartsOn) {
    form.setError("confirmationStartsOn", {
      message: errors.confirmationStartsOn[0],
    });
  }
  if (errors?.confirmationEndsOn) {
    form.setError("confirmationEndsOn", {
      message: errors.confirmationEndsOn[0],
    });
  }
  if (errors?.illustration) {
    setFileError(errors.illustration[0]);
  }
}
