import { MealTypesManagementScreen } from "@/features/profile/components/meal-types-management-screen";
import { MEAL_TYPES_COPY } from "@/features/planner/constants/meal-types-copy";

export const metadata = {
  title: MEAL_TYPES_COPY.management.title,
};

type MealTypesManagementPageProps = {
  searchParams: Promise<{
    returnTo?: string;
  }>;
};

export default async function MealTypesManagementPage({
  searchParams,
}: MealTypesManagementPageProps) {
  const { returnTo } = await searchParams;

  return <MealTypesManagementScreen returnTo={returnTo} />;
}
