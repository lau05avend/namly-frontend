"use client";

import {
  useCallback,
  useEffect,
  useRef,
  useState,
  type ChangeEvent,
  type RefObject,
} from "react";
import { REGISTER_MEAL_COPY } from "@/features/meal-register/constants/register-meal-copy";
import { useResolvedMealPhotoUrl } from "@/features/meal-register/hooks/use-resolved-meal-photo-url";
import { validateMealPhotoFile, normalizeMealPhotoFile } from "@/features/meal-register/services/meal-photo-storage.service";
import {
  prepareMealPhotoFile,
  shouldShowMealPhotoPreparing,
} from "@/features/meal-register/utils/compress-meal-photo";
import { showMealPhotoPickError } from "@/features/meal-register/utils/meal-photo-feedback";
import { toast } from "sonner";

export const MEAL_PHOTO_ACCEPT =
  "image/jpeg,image/png,image/webp,image/gif" as const;

export type MealPhotoPickerRefs = {
  galleryInputRef: RefObject<HTMLInputElement | null>;
  cameraInputRef: RefObject<HTMLInputElement | null>;
};

export type MealPhotoPickerState = {
  previewUrl: string | null;
  pickError: string | null;
  isPreparing: boolean;
};

export type MealPhotoPickerActions = {
  openGallery: () => void;
  openCamera: () => void;
  handleFileChange: (event: ChangeEvent<HTMLInputElement>) => void;
  setFile: (file: File) => void;
  getPendingFile: () => File | null;
  getExistingMediaUrl: () => string | null;
  clearPickError: () => void;
  reset: () => void;
};

export type MealPhotoPickerInitialState = {
  initialFile?: File | null;
  initialRemoteMediaUrl?: string | null;
};

export type MealPhotoPicker = {
  refs: MealPhotoPickerRefs;
  state: MealPhotoPickerState;
  actions: MealPhotoPickerActions;
};

type InitialPhotoState = {
  file: File | null;
  previewUrl: string | null;
  objectUrl: string | null;
  pickError: string | null;
};

function buildInitialPhotoState(initialFile?: File | null): InitialPhotoState {
  if (!initialFile) {
    return {
      file: null,
      previewUrl: null,
      objectUrl: null,
      pickError: null,
    };
  }

  const normalizedFile = normalizeMealPhotoFile(initialFile);
  const pickError = validateMealPhotoFile(normalizedFile);
  if (pickError) {
    return {
      file: null,
      previewUrl: null,
      objectUrl: null,
      pickError,
    };
  }

  const objectUrl = URL.createObjectURL(normalizedFile);

  return {
    file: normalizedFile,
    previewUrl: objectUrl,
    objectUrl,
    pickError: null,
  };
}

export function useMealPhotoPicker(
  initial?: MealPhotoPickerInitialState,
): MealPhotoPicker {
  const initialFile = initial?.initialFile;
  const initialRemoteMediaUrl = initial?.initialRemoteMediaUrl?.trim()
    ? initial.initialRemoteMediaUrl.trim()
    : null;

  const [initialPhotoState] = useState(() =>
    buildInitialPhotoState(initialFile),
  );
  const galleryInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);
  const pendingFileRef = useRef<File | null>(initialPhotoState.file);
  const existingMediaUrlRef = useRef<string | null>(initialRemoteMediaUrl);
  const previewObjectUrlRef = useRef<string | null>(
    initialPhotoState.objectUrl,
  );
  const [previewUrl, setPreviewUrl] = useState(initialPhotoState.previewUrl);
  const [hasLocalFile, setHasLocalFile] = useState(Boolean(initialPhotoState.file));
  const [pickError, setPickError] = useState(initialPhotoState.pickError);
  const [isPreparing, setIsPreparing] = useState(false);
  const { displayUrl: resolvedRemoteUrl } = useResolvedMealPhotoUrl(
    initialRemoteMediaUrl ?? undefined,
  );
  const displayPreviewUrl =
    previewUrl ??
    (initialRemoteMediaUrl && !hasLocalFile ? (resolvedRemoteUrl ?? null) : null);

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

  const commitPreparedFile = useCallback(
    (file: File) => {
      const normalizedFile = normalizeMealPhotoFile(file);

      setPickError(null);
      revokePreview();

      const objectUrl = URL.createObjectURL(normalizedFile);
      previewObjectUrlRef.current = objectUrl;
      pendingFileRef.current = normalizedFile;
      setHasLocalFile(true);
      setPreviewUrl(objectUrl);
    },
    [revokePreview],
  );

  const applyFile = useCallback(
    async (file: File) => {
      const shouldShowPreparing = shouldShowMealPhotoPreparing(file);
      const toastId = shouldShowPreparing
        ? toast.loading(REGISTER_MEAL_COPY.photo.preparing)
        : undefined;

      if (shouldShowPreparing) {
        setIsPreparing(true);
      }

      try {
        const preparedFile = await prepareMealPhotoFile(file);
        commitPreparedFile(preparedFile);
        return true;
      } catch (error) {
        const message =
          error instanceof Error
            ? error.message
            : REGISTER_MEAL_COPY.photo.errors.prepareFailed;

        setPickError(message);
        showMealPhotoPickError(message);
        return false;
      } finally {
        if (toastId !== undefined) {
          toast.dismiss(toastId);
        }

        setIsPreparing(false);
      }
    },
    [commitPreparedFile],
  );

  const openGallery = useCallback(() => {
    galleryInputRef.current?.click();
  }, []);

  const openCamera = useCallback(() => {
    cameraInputRef.current?.click();
  }, []);

  const handleFileChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      const file = event.target.files?.[0];
      event.target.value = "";

      if (!file) {
        return;
      }

      applyFile(file);
    },
    [applyFile],
  );

  const setFile = useCallback(
    (file: File) => {
      applyFile(file);
    },
    [applyFile],
  );

  const getPendingFile = useCallback(() => pendingFileRef.current, []);

  const getExistingMediaUrl = useCallback(() => {
    if (hasLocalFile) {
      return null;
    }

    return existingMediaUrlRef.current;
  }, [hasLocalFile]);

  const reset = useCallback(() => {
    pendingFileRef.current = null;
    existingMediaUrlRef.current = null;
    setHasLocalFile(false);
    revokePreview();
    setPreviewUrl(null);
    setPickError(null);
    setIsPreparing(false);
  }, [revokePreview]);

  const clearPickError = useCallback(() => {
    setPickError(null);
  }, []);

  return {
    refs: {
      galleryInputRef,
      cameraInputRef,
    },
    state: {
      previewUrl: displayPreviewUrl,
      pickError,
      isPreparing,
    },
    actions: {
      openGallery,
      openCamera,
      handleFileChange,
      setFile,
      getPendingFile,
      getExistingMediaUrl,
      clearPickError,
      reset,
    },
  };
}
