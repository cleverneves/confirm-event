"use client";

import { useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { updateEventVisualSettingsAction } from "../_actions/update-event-visual-settings";
import { EventThemeDialog } from "./event-theme-dialog";
import {
  EventIllustrationField,
  EventLayoutField,
} from "../../../_components/event-publication-fields";
import { useIllustrationField } from "../../../_components/use-illustration-field";
import type { PainelEvent } from "../_data-access/get-event";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { FieldGroup } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import {
  IMAGE_ONLY_REQUIRES_IMAGE_MESSAGE,
  eventIllustrationUrl,
  type EventPageLayout,
} from "@/lib/event-illustration";
import {
  makeEventVisualSettingsSchema,
  type EventVisualSettingsFieldErrors,
  type EventVisualSettingsFields,
} from "@/lib/event-schema";

const ID_PREFIX = "settings-visual";

export function EventVisualSettingsCard({ event }: { event: PainelEvent }) {
  const router = useRouter();
  const schema = useMemo(() => makeEventVisualSettingsSchema(), []);

  const [persistedLayout, setPersistedLayout] = useState<EventPageLayout>(
    event.pageLayout
  );
  const [savedImageCacheKey, setSavedImageCacheKey] = useState(event.updatedAt);

  const form = useForm<EventVisualSettingsFields>({
    resolver: zodResolver(schema),
    defaultValues: { layout: event.pageLayout },
  });

  const selectedLayout = form.watch("layout");
  const isFormDirty = form.formState.isDirty;

  const savedImageUrl = event.hasIllustration
    ? eventIllustrationUrl(event.slug, savedImageCacheKey)
    : null;

  const illustration = useIllustrationField({
    selectedLayout,
    savedImageUrl,
    persistedLayout,
    previewAlt: event.title.trim() || "Prévia da imagem do evento",
    inputId: `${ID_PREFIX}-illustration`,
  });

  const {
    resetIllustrationDraft,
    validateImageOnlyLayout,
    appendIllustrationToFormData,
    setFileError,
    isIllustrationDraftDirty,
    ...illustrationFieldProps
  } = illustration;

  const isVisualDraftDirty = isFormDirty || isIllustrationDraftDirty;

  useEffect(() => {
    if (!isVisualDraftDirty) {
      form.reset({ layout: event.pageLayout });
      setPersistedLayout(event.pageLayout);
      setSavedImageCacheKey(event.updatedAt);
      resetIllustrationDraft();
    }
  }, [
    event.pageLayout,
    event.updatedAt,
    form,
    isVisualDraftDirty,
    resetIllustrationDraft,
  ]);

  async function handleSubmit(values: EventVisualSettingsFields) {
    if (
      !validateImageOnlyLayout(
        values.layout,
        IMAGE_ONLY_REQUIRES_IMAGE_MESSAGE
      )
    ) {
      toast.error(IMAGE_ONLY_REQUIRES_IMAGE_MESSAGE);
      return;
    }

    const formData = new FormData();
    formData.set("layout", values.layout);
    appendIllustrationToFormData(formData);

    const result = await updateEventVisualSettingsAction(event.id, formData);

    if (!result.success) {
      applyVisualErrors(form, result.errors, setFileError);
      toast.error(result.message ?? "Não foi possível salvar. Tente de novo.");
      return;
    }

    if (result.message) {
      toast.success(result.message);
    }

    setPersistedLayout(values.layout);
    form.reset({ layout: values.layout });
    resetIllustrationDraft();
    router.refresh();
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Visual</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
          <FieldGroup>
            <EventLayoutField
              control={form.control}
              idPrefix={ID_PREFIX}
              layoutGridClassName="grid-cols-1 sm:grid-cols-2"
            />
            <EventIllustrationField
              selectedLayout={selectedLayout}
              isImageRequired={illustrationFieldProps.isImageRequired}
              previewUrl={illustrationFieldProps.previewUrl}
              previewAlt={illustrationFieldProps.previewAlt}
              hasAspectWarning={illustrationFieldProps.hasAspectWarning}
              fileError={illustrationFieldProps.fileError}
              inputId={illustrationFieldProps.inputId}
              fileInputRef={illustrationFieldProps.fileInputRef}
              onFileChange={illustrationFieldProps.handleFileChange}
              onRemove={illustrationFieldProps.handleRemoveIllustration}
            />
          </FieldGroup>
          <Button type="submit" disabled={isSubmitting}>
            {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
            Salvar
          </Button>
        </form>
        <EventThemeDialog
          event={event}
          embedded
          selectedLayout={selectedLayout}
          previewImageUrl={illustrationFieldProps.previewUrl}
        />
      </CardContent>
    </Card>
  );
}

function applyVisualErrors(
  form: ReturnType<typeof useForm<EventVisualSettingsFields>>,
  errors: EventVisualSettingsFieldErrors | undefined,
  setFileError: (message: string) => void
) {
  if (errors?.layout) {
    form.setError("layout", { message: errors.layout[0] });
  }
  if (errors?.illustration) {
    setFileError(errors.illustration[0]);
  }
}
