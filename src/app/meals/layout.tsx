import { RouteGuard } from "@/components/auth/route-guard";

export default function MealsLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RouteGuard>{children}</RouteGuard>;
}
