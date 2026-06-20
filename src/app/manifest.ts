import type { MetadataRoute } from "next";
import {
  BRAND_ASSETS,
  BRAND_COLORS,
} from "@/components/brand/brand-assets";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Namly",
    short_name: "Namly",
    description: "Continuidad y organización de tus comidas, con calma.",
    start_url: "/home",
    display: "standalone",
    background_color: BRAND_COLORS.background,
    theme_color: BRAND_COLORS.theme,
    orientation: "portrait",
    icons: [
      {
        src: BRAND_ASSETS.pwaIcon192,
        sizes: "192x192",
        type: "image/png",
        purpose: "any",
      },
      {
        src: BRAND_ASSETS.pwaIcon512,
        sizes: "512x512",
        type: "image/png",
        purpose: "any",
      },
      {
        src: BRAND_ASSETS.pwaIcon512Maskable,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
    screenshots: [
      {
        src: BRAND_ASSETS.pwaScreenshotMobile,
        sizes: "390x844",
        type: "image/png",
        form_factor: "narrow",
        label: "Tu día a día, con calma",
      },
      {
        src: BRAND_ASSETS.pwaScreenshotWide,
        sizes: "1280x720",
        type: "image/png",
        form_factor: "wide",
        label: "Organiza tus comidas desde el escritorio",
      },
    ],
  };
}
