"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { prepareMealPhotoFile } from "@/features/meal-register/utils/compress-meal-photo";
import { PROFILE_COPY } from "@/features/profile/constants/profile-copy";
import {
  AVATAR_IMAGE_ACCEPT,
} from "@/features/profile/services/avatar-storage.service";

export { AVATAR_IMAGE_ACCEPT };

export function useAvatarPicker() {
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const pendingFileRef = useRef<File | null>(null);
  const previewObjectUrlRef = useRef<string | null>(null);

  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [pickError, setPickError] = useState<string | null>(null);
  const [isPreparing, setIsPreparing] = useState(false);

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

  const openGallery = useCallback(() => {
    galleryInputRef.current?.click();
  }, []);

  const openCamera = useCallback(() => {
    cameraInputRef.current?.click();
  }, []);

  const applyFile = useCallback(
    async (file: File) => {
      setIsPreparing(true);

      try {
        const preparedFile = await prepareMealPhotoFile(file);

        setPickError(null);
        revokePreview();

        const objectUrl = URL.createObjectURL(preparedFile);
        previewObjectUrlRef.current = objectUrl;
        pendingFileRef.current = preparedFile;
        setPreviewUrl(objectUrl);
        return true;
      } catch (error) {
        const message =
          error instanceof Error ? error.message : PROFILE_COPY.uploadError;

        setPickError(message);
        return false;
      } finally {
        setIsPreparing(false);
      }
    },
    [revokePreview],
  );

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";

      if (!file) {
        return;
      }

      void applyFile(file);
    },
    [applyFile],
  );

  /** Clears a local selection and restores the persisted avatar preview. */
  const clearSelection = useCallback(() => {
    pendingFileRef.current = null;
    revokePreview();
    setPreviewUrl(null);
    setPickError(null);
    setIsPreparing(false);
  }, [revokePreview]);

  const getPendingFile = useCallback(() => pendingFileRef.current, []);

  const reset = useCallback(() => {
    pendingFileRef.current = null;
    revokePreview();
    setPreviewUrl(null);
    setPickError(null);
    setIsPreparing(false);
  }, [revokePreview]);

  return {
    galleryInputRef,
    cameraInputRef,
    previewUrl,
    pickError,
    isPreparing,
    openGallery,
    openCamera,
    handleFileChange,
    clearSelection,
    getPendingFile,
    clearPickError: () => setPickError(null),
    reset,
  };
}

export type AvatarPicker = ReturnType<typeof useAvatarPicker>;
