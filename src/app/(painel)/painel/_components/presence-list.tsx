"use client";

import { useRouter } from "next/navigation";

import { PARTY_LABEL, ROLE_LABEL } from "@/lib/party";
import type { Party } from "@/lib/supabase/database.types";
import type { PresencePerson } from "../_data-access/get-presences";
import { Badge } from "@/components/ui/badge";
import {
  Empty,
  EmptyDescription,
  EmptyHeader,
  EmptyTitle,
} from "@/components/ui/empty";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ToggleGroup, ToggleGroupItem } from "@/components/ui/toggle-group";

type FilterValue = "todas" | Party;

export function PresenceList({
  people,
  filter,
}: {
  people: PresencePerson[];
  filter: FilterValue;
}) {
  const router = useRouter();
  const filtered =
    filter === "todas"
      ? people
      : people.filter((person) => person.party === filter);

  return (
    <section className="flex flex-col gap-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <h2 className="font-heading text-xl">Quem confirmou</h2>
        <ToggleGroup
          value={[filter]}
          onValueChange={(value) => {
            const next = value[0] as FilterValue | undefined;
            if (!next) {
              return;
            }
            const href =
              next === "todas" ? "/painel" : `/painel?festa=${next}`;
            router.push(href);
          }}
          spacing={2}
          variant="outline"
        >
          <ToggleGroupItem value="todas">Todas</ToggleGroupItem>
          <ToggleGroupItem value="mariana">Mariana</ToggleGroupItem>
          <ToggleGroupItem value="victor">Victor</ToggleGroupItem>
        </ToggleGroup>
      </div>

      {filtered.length === 0 ? (
        <Empty className="border">
          <EmptyHeader>
            <EmptyTitle>
              {people.length === 0
                ? "Ninguém confirmou ainda"
                : "Ninguém nesta festa"}
            </EmptyTitle>
            <EmptyDescription>
              {people.length === 0
                ? "As confirmações da página pública aparecem aqui."
                : "O total geral continua visível acima."}
            </EmptyDescription>
          </EmptyHeader>
        </Empty>
      ) : (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Nome</TableHead>
              <TableHead>Sobrenome</TableHead>
              <TableHead>Festa</TableHead>
              <TableHead>Papel</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filtered.map((person) => (
              <TableRow key={person.id}>
                <TableCell>{person.firstName}</TableCell>
                <TableCell>{person.lastName}</TableCell>
                <TableCell>{PARTY_LABEL[person.party]}</TableCell>
                <TableCell>
                  <Badge variant="secondary">{ROLE_LABEL[person.role]}</Badge>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </section>
  );
}
