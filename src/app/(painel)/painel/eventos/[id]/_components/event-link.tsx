"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { z } from "zod";

import { updateEventSlugAction } from "../_actions/update-event-slug";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Field,
  FieldError,
  FieldGroup,
  FieldLabel,
} from "@/components/ui/field";
import { Input } from "@/components/ui/input";
import { Spinner } from "@/components/ui/spinner";
import { isValidSlug, normalizeSlug } from "@/lib/slug";

const formSchema = z.object({
  slug: z
    .string()
    .trim()
    .min(1, "Informe o trecho do link")
    .transform(normalizeSlug)
    .refine((slug) => isValidSlug(slug), {
      message: "Use letras, números e hífen. Não pode ser vazio nem só hífens.",
    }),
});

type FormValues = z.input<typeof formSchema>;

export function EventLink({
  eventId,
  slug,
}: {
  eventId: number;
  slug: string;
}) {
  const [origin, setOrigin] = useState("");
  const router = useRouter();
  const form = useForm<FormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      slug,
    },
  });

  useEffect(() => {
    setOrigin(window.location.origin);
  }, []);

  useEffect(() => {
    form.reset({ slug });
  }, [form, slug]);

  const currentUrl = origin ? `${origin}/${slug}` : `/${slug}`;

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(`${window.location.origin}/${slug}`);
      toast.success("Link copiado.");
    } catch {
      toast.error("Não foi possível copiar o link.");
    }
  }

  async function handleSubmit(values: z.output<typeof formSchema>) {
    const result = await updateEventSlugAction(eventId, values);

    if (!result.success) {
      if (result.errors?.slug) {
        form.setError("slug", { message: result.errors.slug[0] });
      }
      toast.error(result.message ?? "Não foi possível alterar o link.");
      return;
    }

    toast.success(result.message ?? "Link atualizado.");
    router.refresh();
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Link do evento</CardTitle>
        <CardDescription>
          Copie o endereço atual para enviar aos convidados. Trechos antigos
          deste evento passam a abrir o atual.
        </CardDescription>
      </CardHeader>
      <CardContent className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <p className="text-sm text-muted-foreground">Endereço atual</p>
          <p className="break-all font-medium">{currentUrl}</p>
          <Button type="button" variant="outline" className="w-fit" onClick={handleCopy}>
            Copiar link
          </Button>
        </div>

        <form onSubmit={form.handleSubmit(handleSubmit)}>
          <FieldGroup>
            <Controller
              name="slug"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="event-slug">Trecho do link</FieldLabel>
                  <Input
                    {...field}
                    id="event-slug"
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
              Alterar trecho
            </Button>
          </FieldGroup>
        </form>
      </CardContent>
    </Card>
  );
}
