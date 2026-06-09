import Image from "next/image";
import { cn } from "@/lib/utils";
import { BRAND_ASSETS } from "@/components/brand/brand-assets";

type NamlyLogoProps = {
  className?: string;
  size?: number;
  priority?: boolean;
};

export function NamlyLogo({
  className,
  size = 120,
  priority = false,
}: NamlyLogoProps) {
  return (
    <Image
      src={BRAND_ASSETS.logo}
      alt="Namly"
      width={size}
      height={size}
      priority={priority}
      className={cn("h-auto object-contain", className)}
    />
  );
}
