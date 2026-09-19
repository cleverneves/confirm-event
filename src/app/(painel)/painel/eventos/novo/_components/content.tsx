import Link from "next/link";

import { createEventAction } from "../_actions/create-event";
import { EventFieldsForm } from "../../../_components/event-fields-form";
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
      <nav className="flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
        <Link href="/painel" className="hover:text-foreground">
          Meus Eventos
        </Link>
        <span aria-hidden="true">/</span>
        <span className="text-foreground">Novo evento</span>
      </nav>

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
