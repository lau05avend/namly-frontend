import type { Metadata, Viewport } from "next";
import { Plus_Jakarta_Sans } from "next/font/google";
import { Toaster } from "sonner";
import {
  BRAND_ASSETS,
  BRAND_COLORS,
} from "@/components/brand/brand-assets";
import { AuthProvider } from "@/providers/auth-provider";
import { QueryProvider } from "@/providers/query-provider";
import { ProfileCacheSync } from "@/features/profile/components/profile-cache-sync";
import "./globals.css";

// Configure the font
const plusJakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-plus-jakarta',
});

export const metadata: Metadata = {
  title: {
    default: "Namly",
    template: "%s · Namly",
  },
  description: "Continuidad y organización de tus comidas, con calma.",
  applicationName: "Namly",
  appleWebApp: {
    capable: true,
    title: "Namly",
    statusBarStyle: "default",
  },
  icons: {
    icon: { url: BRAND_ASSETS.logo, type: "image/svg+xml" },
    shortcut: BRAND_ASSETS.logo,
    apple: BRAND_ASSETS.pwaIcon512,
  },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: BRAND_COLORS.background,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="es"
      className={`${plusJakarta.variable} h-full antialiased`}
      suppressHydrationWarning
    >
      <body className="flex min-h-full flex-col font-sans" suppressHydrationWarning>
        <QueryProvider>
          <AuthProvider>
            <ProfileCacheSync />
            {children}
            <Toaster position="top-center" richColors closeButton />
          </AuthProvider>
        </QueryProvider>
      </body>
    </html>
  );
}
