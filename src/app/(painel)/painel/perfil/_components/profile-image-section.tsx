"use client";

import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

import {
  removeProfileImageAction,
  saveProfileImageAction,
} from "../_actions/update-profile-image";
import { ProfileAvatar } from "../../_components/profile-avatar";
import { Button } from "@/components/ui/button";
import { FieldDescription } from "@/components/ui/field";
import { Spinner } from "@/components/ui/spinner";
import {
  PROFILE_IMAGE_INVALID_MESSAGE,
  validateProfileImageFile,
} from "@/lib/profile-image";

export function ProfileImageSection({
  initialImageUrl,
  displayName,
}: {
  initialImageUrl: string | null;
  displayName: string;
}) {
  const router = useRouter();
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [savedImageUrl, setSavedImageUrl] = useState(initialImageUrl);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pendingFile, setPendingFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isRemoving, setIsRemoving] = useState(false);

  useEffect(() => {
    setSavedImageUrl(initialImageUrl);
  }, [initialImageUrl]);

  useEffect(() => {
    return () => {
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl);
      }
    };
  }, [previewUrl]);

  function clearPendingPreview() {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setPreviewUrl(null);
    setPendingFile(null);
  }

  function handleChooseFile() {
    fileInputRef.current?.click();
  }

  function handleFileChange(event: React.ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];

    if (!file) {
      return;
    }

    const validationError = validateProfileImageFile(file);

    if (validationError) {
      setFileError(validationError);
      clearPendingPreview();
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      toast.error(validationError);
      return;
    }

    setFileError(null);
    clearPendingPreview();
    const objectUrl = URL.createObjectURL(file);
    setPreviewUrl(objectUrl);
    setPendingFile(file);
  }

  async function handleSaveImage() {
    if (!pendingFile) {
      return;
    }

    setIsSaving(true);
    const formData = new FormData();
    formData.set("profileImage", pendingFile);
    const result = await saveProfileImageAction(formData);
    setIsSaving(false);

    if (!result.success) {
      toast.error(result.message ?? PROFILE_IMAGE_INVALID_MESSAGE);
      return;
    }

    clearPendingPreview();
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    if (result.imageUrl !== undefined) {
      setSavedImageUrl(result.imageUrl);
    }

    toast.success(result.message ?? "Imagem salva.");
    router.refresh();
  }

  async function handleRemoveImage() {
    setIsRemoving(true);
    const result = await removeProfileImageAction();
    setIsRemoving(false);

    if (!result.success) {
      toast.error(result.message ?? "Não foi possível remover a imagem. Tente de novo.");
      return;
    }

    clearPendingPreview();
    setSavedImageUrl(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }

    toast.success(result.message ?? "Imagem removida.");
    router.refresh();
  }

  const displaySrc = previewUrl ?? savedImageUrl;
  const hasSavedImage = Boolean(savedImageUrl);
  const canSave = Boolean(pendingFile);
  const isBusy = isSaving || isRemoving;

  return (
    <div className="flex flex-col gap-4">
      <div className="flex flex-wrap items-center gap-4">
        <ProfileAvatar
          src={displaySrc}
          alt={displayName}
          className="size-24"
        />
        <div className="flex min-w-0 flex-col gap-2">
          <input
            ref={fileInputRef}
            type="file"
            accept=".jpg,.jpeg,.png,image/jpeg,image/png"
            className="sr-only"
            onChange={handleFileChange}
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleChooseFile}
            disabled={isBusy}
          >
            Escolher imagem
          </Button>
          <FieldDescription>
            jpg ou png, até 2 MB. A imagem aparece em círculo no menu e na lista
            de organizadores.
          </FieldDescription>
          {fileError ? (
            <p className="text-sm text-destructive" role="alert">
              {fileError}
            </p>
          ) : null}
        </div>
      </div>
      <div className="flex flex-wrap gap-2">
        {canSave ? (
          <Button type="button" onClick={handleSaveImage} disabled={isBusy}>
            {isSaving ? <Spinner data-icon="inline-start" /> : null}
            Salvar imagem
          </Button>
        ) : null}
        {hasSavedImage ? (
          <Button
            type="button"
            variant="outline"
            onClick={handleRemoveImage}
            disabled={isBusy}
          >
            {isRemoving ? <Spinner data-icon="inline-start" /> : null}
            Remover imagem
          </Button>
        ) : null}
      </div>
    </div>
  );
}
