"use client";

import { useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { updateEventSettingsAction } from "../_actions/update-event-settings";
import { ConfirmationControls } from "./confirmation-controls";
import { EventSlugEditor } from "./event-link";
import { EventThemeDialog } from "./event-theme-dialog";
import {
  EventCapacityField,
  EventConfirmationWindowFields,
  EventIllustrationField,
  EventLayoutField,
} from "../../../_components/event-publication-fields";
import { useIllustrationField } from "../../../_components/use-illustration-field";
import type { PainelEvent } from "../_data-access/get-event";
import { Button } from "@/components/ui/button";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import {
  IMAGE_ONLY_REQUIRES_IMAGE_MESSAGE,
  eventIllustrationUrl,
} from "@/lib/event-illustration";
import {
  makeEventSettingsSchema,
  type EventSettingsFields,
  type EventSettingsFieldErrors,
} from "@/lib/event-schema";

const ID_PREFIX = "settings";

export function EventSettingsForm({
  event,
  onSuccess,
}: {
  event: PainelEvent;
  onSuccess: () => void;
}) {
  const router = useRouter();
  const schema = useMemo(
    () => makeEventSettingsSchema(event.eventDate),
    [event.eventDate]
  );

  const defaultValues: EventSettingsFields = {
    maxGuestCapacity: event.maxGuestCapacity?.toString() ?? "",
    layout: event.pageLayout,
    confirmationStartsOn: event.confirmationStartsOn ?? "",
    confirmationEndsOn: event.confirmationEndsOn ?? "",
  };

  const form = useForm<EventSettingsFields>({
    resolver: zodResolver(schema),
    defaultValues,
  });

  const selectedLayout = form.watch("layout");
  const savedImageUrl = event.hasIllustration
    ? eventIllustrationUrl(event.slug, event.updatedAt)
    : null;

  const illustration = useIllustrationField({
    selectedLayout,
    savedImageUrl,
    persistedLayout: event.pageLayout,
    previewAlt: event.title.trim() || "Prévia da imagem do evento",
    inputId: `${ID_PREFIX}-illustration`,
  });

  async function handleSubmit(values: EventSettingsFields) {
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
    formData.set("maxGuestCapacity", values.maxGuestCapacity);
    formData.set("layout", values.layout);
    formData.set("confirmationStartsOn", values.confirmationStartsOn);
    formData.set("confirmationEndsOn", values.confirmationEndsOn);
    illustration.appendIllustrationToFormData(formData);

    const result = await updateEventSettingsAction(event.id, formData);

    if (!result.success) {
      applySettingsErrors(form, result.errors, illustration.setFileError);
      toast.error(result.message ?? "Não foi possível salvar. Tente de novo.");
      return;
    }

    if (result.message) {
      toast.success(result.message);
    }
    onSuccess();
    router.refresh();
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-6">
      <form
        className="flex flex-col gap-6"
        onSubmit={form.handleSubmit(handleSubmit)}
      >
        <FieldGroup>
          <EventLayoutField control={form.control} idPrefix={ID_PREFIX} />
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
        </FieldGroup>

        <EventSlugEditor eventId={event.id} slug={event.slug} />

        <FieldGroup>
          <EventCapacityField control={form.control} idPrefix={ID_PREFIX} />
          <EventConfirmationWindowFields
            control={form.control}
            idPrefix={ID_PREFIX}
          />
        </FieldGroup>
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
          Salvar
        </Button>
      </form>

      <ConfirmationControls event={event} />
      <EventThemeDialog event={event} embedded />
    </div>
  );
}

function applySettingsErrors(
  form: ReturnType<typeof useForm<EventSettingsFields>>,
  errors: EventSettingsFieldErrors | undefined,
  setFileError: (message: string) => void
) {
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
