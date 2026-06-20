import { RegisterMealScreen } from "@/features/meal-register/components/register-meal-screen";

export const metadata = {
  title: "Registrar comida · Namly",
  description: "Registra lo que comiste con calma y claridad.",
};

type RegisterMealPageProps = {
  searchParams: Promise<{ date?: string; edit?: string }>;
};

export default async function RegisterMealPage({
  searchParams,
}: RegisterMealPageProps) {
  const params = await searchParams;
  return (
    <RegisterMealScreen
      initialDate={params.date}
      editLogId={params.edit}
    />
  );
}
