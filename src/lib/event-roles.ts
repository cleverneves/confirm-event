/**
 * Papel da conta no evento:
 * - `creator`: criou o evento;
 * - `organizer`: foi incluída pelo criador;
 * - `legacy`: evento antigo sem criador, ainda aberto a toda conta autenticada.
 */
export type EventRole = "creator" | "organizer" | "legacy";

export const NO_EVENT_ACCESS_MESSAGE = "Você não tem acesso a este evento.";
export const ORGANIZERS_FORBIDDEN_MESSAGE =
  "Você não pode alterar os organizadores deste evento.";

/** Só o criador (ou qualquer conta, no evento legado sem criador) exclui o evento. */
export function canDeleteEvent(role: EventRole) {
  return role === "creator" || role === "legacy";
}

/** Só o criador inclui e remove organizadores. */
export function canManageOrganizers(role: EventRole) {
  return role === "creator";
}

/** Só o organizador incluído pode sair do evento. */
export function canLeaveEvent(role: EventRole) {
  return role === "organizer";
}
