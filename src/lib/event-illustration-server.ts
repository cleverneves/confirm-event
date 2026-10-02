import {
  detectIllustrationContentType,
  ILLUSTRATION_INVALID_TYPE_MESSAGE,
  ILLUSTRATION_MAX_BYTES,
  ILLUSTRATION_TOO_LARGE_MESSAGE,
  type IllustrationContentType,
} from "@/lib/event-illustration";

export type IllustrationFormChange =
  | { kind: "unchanged" }
  | { kind: "remove" }
  | {
      kind: "replace";
      bytes: Uint8Array;
      contentType: IllustrationContentType;
    }
  | { kind: "invalid"; message: string };

export function encodeIllustrationForDb(bytes: Uint8Array) {
  return `\\x${Buffer.from(bytes).toString("hex")}`;
}

export function decodeIllustrationFromDb(value: string) {
  if (!value) {
    return null;
  }

  const candidates: Buffer[] = [];

  if (value.startsWith("\\x")) {
    const hex = value.slice(2);

    if (hex.length > 0 && hex.length % 2 === 0) {
      candidates.push(Buffer.from(hex, "hex"));
    }
  } else {
    candidates.push(Buffer.from(value, "base64"));

    if (/^[0-9a-fA-F]+$/.test(value) && value.length % 2 === 0) {
      candidates.push(Buffer.from(value, "hex"));
    }
  }

  return (
    candidates.find((bytes) => detectIllustrationContentType(bytes) !== null) ??
    candidates[0] ??
    null
  );
}

export async function readIllustrationFromFormData(
  formData: FormData
): Promise<IllustrationFormChange> {
  const file = formData.get("illustration");
  const shouldRemove = formData.get("removeIllustration") === "true";

  if (file instanceof File && file.size > 0) {
    if (file.size > ILLUSTRATION_MAX_BYTES) {
      return { kind: "invalid", message: ILLUSTRATION_TOO_LARGE_MESSAGE };
    }

    const bytes = new Uint8Array(await file.arrayBuffer());
    const contentType = detectIllustrationContentType(bytes);

    if (!contentType) {
      return { kind: "invalid", message: ILLUSTRATION_INVALID_TYPE_MESSAGE };
    }

    return { kind: "replace", bytes, contentType };
  }

  if (shouldRemove) {
    return { kind: "remove" };
  }

  return { kind: "unchanged" };
}

export function illustrationColumns(change: IllustrationFormChange) {
  if (change.kind === "replace") {
    return {
      illustration: encodeIllustrationForDb(change.bytes),
      illustration_content_type: change.contentType,
    };
  }

  if (change.kind === "remove") {
    return {
      illustration: null,
      illustration_content_type: null,
    };
  }

  return {};
}
