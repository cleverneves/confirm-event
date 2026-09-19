"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CopyIcon, ExternalLinkIcon } from "lucide-react";
import { toast } from "sonner";
import { z } from "zod";

import { updateEventSlugAction } from "../_actions/update-event-slug";
import { Button } from "@/components/ui/button";
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
  const [isEditingSlug, setIsEditingSlug] = useState(false);
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
    setIsEditingSlug(false);
    router.refresh();
  }

  const isSubmitting = form.formState.isSubmitting;

  return (
    <div className="flex flex-col gap-4 border-t border-border pt-6">
      <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex min-w-0 flex-col gap-1 sm:flex-row sm:items-center sm:gap-2">
          <p className="text-sm text-muted-foreground">Link personalizado:</p>
          <p className="truncate font-medium">{currentUrl}</p>
        </div>
        <div className="flex flex-wrap gap-2">
          <Button type="button" onClick={handleCopy}>
            <CopyIcon data-icon="inline-start" />
            Copiar Link do Convite
          </Button>
          <Button
            type="button"
            variant="outline"
            render={<Link href={`/${slug}`} target="_blank" rel="noreferrer" />}
            nativeButton={false}
          >
            <ExternalLinkIcon data-icon="inline-start" />
            Visualizar Página
          </Button>
        </div>
      </div>

      {isEditingSlug ? (
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
            <div className="flex flex-wrap gap-2">
              <Button type="submit" disabled={isSubmitting}>
                {isSubmitting ? <Spinner data-icon="inline-start" /> : null}
                Alterar trecho
              </Button>
              <Button
                type="button"
                variant="outline"
                onClick={() => {
                  form.reset({ slug });
                  setIsEditingSlug(false);
                }}
              >
                Cancelar
              </Button>
            </div>
          </FieldGroup>
        </form>
      ) : (
        <Button
          type="button"
          variant="ghost"
          className="w-fit"
          onClick={() => setIsEditingSlug(true)}
        >
          Alterar trecho do link
        </Button>
      )}
    </div>
  );
}
