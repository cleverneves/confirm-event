const SLUG_PATTERN = /^[a-z0-9]+(?:-[a-z0-9]+)*$/;

const RESERVED_SLUGS = new Set([
  "login",
  "painel",
  "recuperar-senha",
  "redefinir-senha",
  "auth",
]);

export function normalizeSlug(input: string) {
  return input
    .normalize("NFD")
    .replace(/\p{M}/gu, "")
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function slugify(input: string) {
  return normalizeSlug(input) || "evento";
}

export function isReservedSlug(slug: string) {
  return RESERVED_SLUGS.has(slug);
}

export function isValidSlug(slug: string) {
  return SLUG_PATTERN.test(slug) && !isReservedSlug(slug);
}

export async function nextAvailableSlug(
  title: string,
  isTaken: (slug: string) => Promise<boolean>
) {
  const slugified = normalizeSlug(title);
  const base = SLUG_PATTERN.test(slugified) ? slugified : "evento";

  for (let n = 1; n <= 1000; n++) {
    const candidate = n === 1 ? base : `${base}-${n}`;

    if (!isValidSlug(candidate)) {
      continue;
    }

    if (!(await isTaken(candidate))) {
      return candidate;
    }
  }

  return null;
}
