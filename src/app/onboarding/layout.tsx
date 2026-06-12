import { RouteGuard } from "@/components/auth/route-guard";

export default function OnboardingLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return <RouteGuard>{children}</RouteGuard>;
}
