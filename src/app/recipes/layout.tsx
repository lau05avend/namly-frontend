import { RouteGuard } from "@/components/auth/route-guard";

export default function RecipesLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RouteGuard>{children}</RouteGuard>;
}
