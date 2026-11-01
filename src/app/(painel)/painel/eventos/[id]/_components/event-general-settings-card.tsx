"use client";

import { useEffect, useMemo } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";

import { updateEventGeneralSettingsAction } from "../_actions/update-event-general-settings";
import { ConfirmationControls } from "./confirmation-controls";
import { EventSlugEditor } from "./event-link";
import {
  EventCapacityField,
  EventConfirmationWindowFields,
} from "../../../_components/event-publication-fields";
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
  makeEventGeneralSettingsSchema,
  type EventGeneralSettingsFieldErrors,
  type EventGeneralSettingsFields,
} from "@/lib/event-schema";

const ID_PREFIX = "settings-general";

function generalDefaults(event: PainelEvent): EventGeneralSettingsFields {
  return {
    maxGuestCapacity: event.maxGuestCapacity?.toString() ?? "",
    confirmationStartsOn: event.confirmationStartsOn ?? "",
    confirmationEndsOn: event.confirmationEndsOn ?? "",
  };
}

export function EventGeneralSettingsCard({ event }: { event: PainelEvent }) {
  const router = useRouter();
  const schema = useMemo(
    () => makeEventGeneralSettingsSchema(event.eventDate),
    [event.eventDate]
  );

  const form = useForm<EventGeneralSettingsFields>({
    resolver: zodResolver(schema),
    defaultValues: generalDefaults(event),
  });

  const isDirty = form.formState.isDirty;

  useEffect(() => {
    if (!isDirty) {
      form.reset(generalDefaults(event));
    }
  }, [event, form, isDirty]);

  async function handleSubmit(values: EventGeneralSettingsFields) {
    const formData = new FormData();
    formData.set("maxGuestCapacity", values.maxGuestCapacity);
    formData.set("confirmationStartsOn", values.confirmationStartsOn);
    formData.set("confirmationEndsOn", values.confirmationEndsOn);

    const result = await updateEventGeneralSettingsAction(event.id, formData);

    if (!result.success) {
      applyGeneralErrors(form, result.errors);
      toast.error(result.message ?? "Não foi possível salvar. Tente de novo.");
      return;
    }

    if (result.message) {
      toast.success(result.message);
    }
    form.reset(values);
    router.refresh();
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Geral</CardTitle>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <EventSlugEditor eventId={event.id} slug={event.slug} />
        <form
          className="flex flex-col gap-6"
          onSubmit={form.handleSubmit(handleSubmit)}
        >
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
      </CardContent>
    </Card>
  );
}

function applyGeneralErrors(
  form: ReturnType<typeof useForm<EventGeneralSettingsFields>>,
  errors: EventGeneralSettingsFieldErrors | undefined
) {
  if (errors?.maxGuestCapacity) {
    form.setError("maxGuestCapacity", {
      message: errors.maxGuestCapacity[0],
    });
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
}
