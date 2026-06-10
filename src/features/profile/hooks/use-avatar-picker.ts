"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { validateAvatarFile } from "@/features/profile/services/avatar-storage.service";

export function useAvatarPicker() {
  const inputRef = useRef<HTMLInputElement>(null);
  const pendingFileRef = useRef<File | null>(null);
  const previewObjectUrlRef = useRef<string | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pickError, setPickError] = useState<string | null>(null);

  const revokePreview = useCallback(() => {
    if (previewObjectUrlRef.current) {
      URL.revokeObjectURL(previewObjectUrlRef.current);
      previewObjectUrlRef.current = null;
    }
  }, []);

  useEffect(() => {
    return () => {
      revokePreview();
    };
  }, [revokePreview]);

  const openFilePicker = useCallback(() => {
    inputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";

      if (!file) {
        return;
      }

      const validationError = validateAvatarFile(file);
      if (validationError) {
        setPickError(validationError);
        return;
      }

      setPickError(null);
      revokePreview();

      const objectUrl = URL.createObjectURL(file);
      previewObjectUrlRef.current = objectUrl;
      pendingFileRef.current = file;
      setPreviewUrl(objectUrl);
    },
    [revokePreview],
  );

  /** Clears a local selection and restores the persisted avatar preview. */
  const clearSelection = useCallback(() => {
    pendingFileRef.current = null;
    revokePreview();
    setPreviewUrl(null);
    setPickError(null);
  }, [revokePreview]);

  const getPendingFile = useCallback(() => pendingFileRef.current, []);

  const reset = useCallback(() => {
    pendingFileRef.current = null;
    revokePreview();
    setPreviewUrl(null);
    setPickError(null);
  }, [revokePreview]);

  return {
    inputRef,
    previewUrl,
    pickError,
    openFilePicker,
    handleFileChange,
    clearSelection,
    getPendingFile,
    clearPickError: () => setPickError(null),
    reset,
  };
}

export type AvatarPicker = ReturnType<typeof useAvatarPicker>;
