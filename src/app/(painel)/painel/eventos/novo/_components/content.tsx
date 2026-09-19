"use client";

import Link from "next/link";

import { createEventAction } from "../_actions/create-event";
import { EventFieldsForm } from "../../../_components/event-fields-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export function CreateEventContent() {
  return (
    <div className="flex flex-col gap-6">
      <Button
        variant="ghost"
        size="sm"
        className="w-fit"
        render={<Link href="/painel" />}
        nativeButton={false}
      >
        Voltar aos eventos
      </Button>

      <Card>
        <CardHeader>
          <CardTitle>Novo evento</CardTitle>
          <CardDescription>
            Título, data, horário e local são obrigatórios. Os detalhes são
            opcionais.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <EventFieldsForm
            defaultValues={{
              title: "",
              details: "",
              eventDate: "",
              eventTime: "",
              location: "",
            }}
            submitLabel="Criar evento"
            onSubmit={createEventAction}
          />
        </CardContent>
      </Card>
    </div>
  );
}
