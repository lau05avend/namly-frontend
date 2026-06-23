import { notFound } from "next/navigation";
import { DevSplashPreview } from "@/app/dev/splash/dev-splash-preview";

export default function DevSplashPage() {
  if (process.env.NODE_ENV !== "development") {
    notFound();
  }

  return <DevSplashPreview />;
}
