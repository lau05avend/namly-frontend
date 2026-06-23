import { NamlySplashScreen } from "@/components/brand/namly-splash-screen";
import { BRAND_SPLASH_COPY } from "@/components/brand/brand-assets";

type AuthLoadingProps = {
  message?: string;
};

export function AuthLoading({
  message = BRAND_SPLASH_COPY.sessionLoading,
}: AuthLoadingProps) {
  return <NamlySplashScreen message={message} />;
}
