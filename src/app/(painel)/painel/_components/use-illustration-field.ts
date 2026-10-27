"use client";

import { useEffect, useRef, useState } from "react";

import {
  hasLayoutAspect,
  ILLUSTRATION_INVALID_TYPE_MESSAGE,
  validateIllustrationFile,
  type EventPageLayout,
} from "@/lib/event-illustration";

function readImageSize(file: File) {
  return new Promise<{ width: number; height: number } | null>((resolve) => {
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();

    image.onload = () => {
      URL.revokeObjectURL(objectUrl);
      resolve({ width: image.naturalWidth, height: image.naturalHeight });
    };
    image.onerror = () => {
      URL.revokeObjectURL(objectUrl);
      resolve(null);
    };
    image.src = objectUrl;
  });
}

export function useIllustrationField({
  selectedLayout,
  savedImageUrl,
  persistedLayout,
  previewAlt,
  inputId,
}: {
  selectedLayout: EventPageLayout;
  savedImageUrl?: string | null;
  persistedLayout?: EventPageLayout | null;
  previewAlt: string;
  inputId: string;
}) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [objectUrl, setObjectUrl] = useState<string | null>(null);
  const [imageSize, setImageSize] = useState<{
    width: number;
    height: number;
  } | null>(null);
  const [shouldRemoveIllustration, setShouldRemoveIllustration] = useState(false);
  const [fileError, setFileError] = useState<string | null>(null);

  useEffect(() => {
    return () => {
      if (objectUrl) {
        URL.revokeObjectURL(objectUrl);
      }
    };
  }, [objectUrl]);

  const canUseSavedImage =
    Boolean(savedImageUrl) &&
    persistedLayout === selectedLayout &&
    !shouldRemoveIllustration;
  const previewUrl = objectUrl ?? (canUseSavedImage ? savedImageUrl ?? null : null);
  const hasAspectWarning =
    imageSize !== null &&
    !hasLayoutAspect(selectedLayout, imageSize.width, imageSize.height);

  function clearSelectedFile() {
    setSelectedFile(null);
    setImageSize(null);
    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }
    setObjectUrl(null);
  }

  async function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const selectionError = validateIllustrationFile(file);

    if (selectionError) {
      setFileError(selectionError);
      clearSelectedFile();
      event.target.value = "";
      return;
    }

    const size = await readImageSize(file);

    if (!size) {
      setFileError(ILLUSTRATION_INVALID_TYPE_MESSAGE);
      clearSelectedFile();
      event.target.value = "";
      return;
    }

    if (objectUrl) {
      URL.revokeObjectURL(objectUrl);
    }

    setFileError(null);
    setSelectedFile(file);
    setImageSize(size);
    setShouldRemoveIllustration(false);
    setObjectUrl(URL.createObjectURL(file));
  }

  function handleRemoveIllustration() {
    clearSelectedFile();
    setFileError(null);
    setShouldRemoveIllustration(true);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  }

  function appendIllustrationToFormData(formData: FormData) {
    if (selectedFile) {
      formData.set("illustration", selectedFile);
    }

    if (shouldRemoveIllustration) {
      formData.set("removeIllustration", "true");
    }
  }

  function validateImageOnlyLayout(layout: EventPageLayout, message: string) {
    const keepsSavedImage =
      persistedLayout === layout &&
      Boolean(savedImageUrl) &&
      !shouldRemoveIllustration;

    if (layout === "image_only" && !selectedFile && !keepsSavedImage) {
      setFileError(message);
      return false;
    }

    return true;
  }

  return {
    fileInputRef,
    fileError,
    setFileError,
    previewUrl,
    previewAlt,
    hasAspectWarning,
    inputId,
    isImageRequired: selectedLayout === "image_only",
    handleFileChange,
    handleRemoveIllustration,
    appendIllustrationToFormData,
    validateImageOnlyLayout,
  };
}
