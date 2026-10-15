type OrganizerIdentity = {
  firstName: string | null;
  lastName: string | null;
  email: string;
};

/**
 * Nome exibido de uma conta organizadora: nome e sobrenome gravados em Meu perfil,
 * nesta ordem. Faltando um dos dois, usa o e-mail da conta (o texto nunca fica vazio).
 */
export function organizerDisplayName({
  firstName,
  lastName,
  email,
}: OrganizerIdentity) {
  const first = firstName?.trim();
  const last = lastName?.trim();

  return first && last ? `${first} ${last}` : email;
}
