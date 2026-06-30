import { NamlyLogoMark } from "@/components/brand/namly-logo-mark";
import { cn } from "@/lib/utils";

type NamlyLogoProps = {
  className?: string;
  size?: number;
  /** @deprecated Inline SVG renders immediately; kept for API compatibility. */
  priority?: boolean;
};

export function NamlyLogo({
  className,
  size = 120,
}: NamlyLogoProps) {
  return <NamlyLogoMark className={className} size={size} />;
}
