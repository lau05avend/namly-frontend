"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { OnboardingEmpty } from "@/features/onboarding/components/onboarding-empty";
import { OnboardingLoading } from "@/features/onboarding/components/onboarding-loading";
import { useOnboardingResponsesEditor } from "@/features/onboarding/hooks/use-onboarding-responses-editor";
import { useOnboardingQuestions } from "@/features/onboarding/queries/use-onboarding-questions";
import { useOnboardingResponses } from "@/features/onboarding/queries/use-onboarding-responses";
import { usePatchOnboardingResponses } from "@/features/onboarding/queries/use-patch-onboarding-responses";
import {
  countAnsweredQuestions,
  findFirstUnansweredQuestionId,
  getInvalidChangedQuestionIds,
  getResponseDraft,
  hasRemovedSavedAnswers,
} from "@/features/onboarding/utils/onboarding-response.utils";
import { EditProfileHeader } from "@/features/profile/components/edit-profile-header";
import { OnboardingPreferenceItem } from "@/features/profile/components/onboarding-preference-item";
import { OnboardingPreferencesStatus } from "@/features/profile/components/onboarding-preferences-status";
import { PROFILE_COPY } from "@/features/profile/constants/profile-copy";
import { PROFILE_SURFACES } from "@/features/profile/constants/profile-surfaces";
import { getUserFacingErrorMessage } from "@/lib/api/get-user-facing-error-message";
import { cn } from "@/lib/utils";

export function OnboardingPreferencesScreen() {
  const router = useRouter();
  const questionsQuery = useOnboardingQuestions();
  const responsesQuery = useOnboardingResponses();
  const patchMutation = usePatchOnboardingResponses();
  const [expandedQuestionId, setExpandedQuestionId] = useState<string | null>(
    null,
  );
  const [saveError, setSaveError] = useState<string | null>(null);
  const hasInitializedExpansionRef = useRef(false);

  const questions = questionsQuery.data;
  const isReady =
    questionsQuery.isSuccess && responsesQuery.isSuccess && Boolean(questions);

  const editor = useOnboardingResponsesEditor({
    questions,
    savedResponses: responsesQuery.data,
    isReady,
  });

  useEffect(() => {
    if (
      !isReady ||
      !questions?.length ||
      hasInitializedExpansionRef.current
    ) {
      return;
    }

    const defaultExpandedId = findFirstUnansweredQuestionId(
      questions,
      editor.responses,
    );

    setExpandedQuestionId(defaultExpandedId ?? questions[0]?.id ?? null);
    hasInitializedExpansionRef.current = true;
  }, [isReady, questions, editor.responses]);

  const answeredCount = questions
    ? countAnsweredQuestions(questions, editor.responses)
    : 0;
  const totalCount = questions?.length ?? 0;
  const invalidChangedQuestionIds = getInvalidChangedQuestionIds(
    editor.responses,
    editor.initialResponses,
  );
  const hasInvalidChanges = invalidChangedQuestionIds.length > 0;

  const handleCancel = () => {
    router.push("/profile");
  };

  const handleSave = async () => {
    setSaveError(null);

    if (hasInvalidChanges) {
      setSaveError(PROFILE_COPY.preferences.saveValidationError);
      toast.error(PROFILE_COPY.preferences.saveValidationError);
      return;
    }

    const hadRemovals = hasRemovedSavedAnswers(
      editor.responses,
      editor.initialResponses,
    );

    try {
      await patchMutation.mutateAsync({
        current: editor.responses,
        previous: editor.initialResponses,
      });
      toast.success(PROFILE_COPY.preferences.saveSuccess);

      if (hadRemovals) {
        toast.info(PROFILE_COPY.preferences.saveClearedWarning);
      }

      router.push("/profile");
    } catch (error) {
      setSaveError(
        getUserFacingErrorMessage(error, PROFILE_COPY.preferences.saveError),
      );
    }
  };

  const isLoading = questionsQuery.isPending || responsesQuery.isPending;
  const isError = questionsQuery.isError || responsesQuery.isError;

  if (isLoading) {
    return (
      <div className="mx-auto min-h-dvh max-w-lg bg-background px-4 pt-safe">
        <OnboardingLoading />
      </div>
    );
  }

  if (isError) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col bg-background px-4 pt-safe">
        <EditProfileHeader
          title={PROFILE_COPY.preferences.title}
          onCancel={handleCancel}
        />
        <div className="flex flex-1 flex-col items-center justify-center gap-3 py-10 text-center">
          <p className="text-sm text-foreground/60">
            {PROFILE_COPY.preferences.loadError}
          </p>
          <button
            type="button"
            onClick={() => {
              void questionsQuery.refetch();
              void responsesQuery.refetch();
            }}
            className="cursor-pointer text-sm font-semibold text-primary underline-offset-2 hover:underline"
          >
            Reintentar
          </button>
        </div>
      </div>
    );
  }

  if (!questions?.length) {
    return (
      <div className="mx-auto min-h-dvh max-w-lg bg-background px-4 pt-safe">
        <EditProfileHeader
          title={PROFILE_COPY.preferences.title}
          onCancel={handleCancel}
        />
        <OnboardingEmpty />
      </div>
    );
  }

  return (
    <div className="mx-auto flex min-h-dvh w-full max-w-lg flex-col bg-background px-4 pb-8">
      <EditProfileHeader
        title={PROFILE_COPY.preferences.title}
        onCancel={handleCancel}
      />

      <div className="flex flex-1 flex-col gap-4 pt-4">
        <OnboardingPreferencesStatus
          status={editor.status}
          answeredCount={answeredCount}
          totalCount={totalCount}
        />

        <section className={cn(PROFILE_SURFACES.preferencesPanel)}>
          {questions.map((question, index) => {
            const draft = getResponseDraft(editor.responses, question.id);

            return (
              <OnboardingPreferenceItem
                key={question.id}
                question={question}
                draft={draft}
                isExpanded={expandedQuestionId === question.id}
                isLast={index === questions.length - 1}
                onToggle={() =>
                  setExpandedQuestionId((current) =>
                    current === question.id ? null : question.id,
                  )
                }
                onSelectOption={(optionId) =>
                  editor.selectOption(question, optionId)
                }
                onCustomValueChange={(value) =>
                  editor.setCustomValue(question.id, value)
                }
              />
            );
          })}
        </section>

        <div className="mt-auto flex flex-col gap-3 pt-2">
          <Button
            type="button"
            onClick={() => void handleSave()}
            disabled={
              !editor.isDirty || hasInvalidChanges || patchMutation.isPending
            }
            aria-busy={patchMutation.isPending}
          >
            {patchMutation.isPending
              ? PROFILE_COPY.preferences.saving
              : PROFILE_COPY.preferences.save}
          </Button>

          {hasInvalidChanges && editor.isDirty ? (
            <p className="text-center text-sm text-cta" role="alert">
              {PROFILE_COPY.preferences.saveValidationError}
            </p>
          ) : saveError ? (
            <p className="text-center text-sm text-cta" role="alert">
              {saveError}
            </p>
          ) : null}
        </div>
      </div>
    </div>
  );
}
