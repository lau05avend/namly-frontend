"use client";

import { useState } from "react";
import { BottomNav } from "@/components/navigation/bottom-nav";
import { TabBar } from "@/components/navigation/tab-bar";
import { FloatingActionButton } from "@/components/ui/floating-action-button";
import { HomeHeader } from "@/features/home/components/home-header";
import { HomeLoading } from "@/features/home/components/home-loading";
import { HomeTodayView } from "@/features/home/components/home-today-view";
import { useHomeGreeting } from "@/features/home/hooks/use-home-greeting";
import { HOME_COPY } from "@/features/home/constants/home-copy";
import { useHomeSummary } from "@/features/home/queries/use-home-summary";
import type { HomeTabId } from "@/features/home/types/home.types";
import { useRegisterMealLaunch } from "@/features/meal-register/hooks/use-register-meal-launch";
import { RhythmView } from "@/features/rhythm/components/rhythm-view";
// import { Activity, Sun } from "lucide-react";

const HOME_TABS = [
  { id: "today" as const, label: HOME_COPY.tabs.today },
  { id: "rhythm" as const, label: HOME_COPY.tabs.rhythm },
];

export function HomeScreen() {
  const [activeTab, setActiveTab] = useState<HomeTabId>("today");
  const { data, isPending, isError } = useHomeSummary();
  const greeting = useHomeGreeting();
  const { openRegisterWithCamera, launchUi } = useRegisterMealLaunch();

  const handleFabClick = () => {
    openRegisterWithCamera();
  };

  return (
    <div className="relative min-h-dvh bg-background pb-28">
      <main className="mx-auto flex w-full max-w-lg flex-col gap-6 px-4">
        {isPending ? <HomeLoading /> : null}

        {isError ? (
          <p className="pt-8 text-center text-sm text-foreground/60">
            No pudimos cargar tu día. Intenta de nuevo.
          </p>
        ) : null}

        {data ? (
          <>
            <HomeHeader displayDate={data.displayDate} greeting={greeting} />

            <TabBar
              items={HOME_TABS}
              activeId={activeTab}
              onChange={setActiveTab}
              align="stretch"
              className="-mx-4"
            />

            {activeTab === "today" ? (
              <HomeTodayView summary={data} />
            ) : (
              <RhythmView />
            )}
          </>
        ) : null}
      </main>

      <FloatingActionButton
        label={HOME_COPY.fabLabel}
        onClick={handleFabClick}
      />
      {launchUi}
      <BottomNav activeId="home" />
    </div>
  );
}
