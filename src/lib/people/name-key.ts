export function toNameKey(firstName: string, lastName: string) {
  return `${firstName.trim()} ${lastName.trim()}`.toLowerCase();
}

export function findDuplicateNameKey(
  names: Array<{ firstName: string; lastName: string }>
) {
  const seen = new Set<string>();

  for (const person of names) {
    const key = toNameKey(person.firstName, person.lastName);
    if (seen.has(key)) {
      return key;
    }
    seen.add(key);
  }

  return null;
}
