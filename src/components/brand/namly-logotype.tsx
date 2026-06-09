import Image from "next/image";
import { cn } from "@/lib/utils";
import { BRAND_ASSETS } from "@/components/brand/brand-assets";

type NamlyLogotypeProps = {
  className?: string;
  width?: number;
  height?: number;
  priority?: boolean;
};

export function NamlyLogotype({
  className,
  width = 160,
  height = 48,
  priority = false,
}: NamlyLogotypeProps) {
  return (
    <Image
      src={BRAND_ASSETS.logotype}
      alt="namly"
      width={width}
      height={height}
      priority={priority}
      className={cn("h-auto max-w-full object-contain", className)}
    />
  );
}
