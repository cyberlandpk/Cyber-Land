import Image from "next/image";
import Link from "next/link";
import { cn } from "@/utils";

type BrandLogoProps = {
  className?: string;
  href?: string;
  inverted?: boolean;
  onClick?: () => void;
};

export default function BrandLogo({
  className,
  href = "/",
  inverted = false,
  onClick,
}: BrandLogoProps) {
  const mark = (
    <span
      className={cn(
        "brand-logo",
        inverted && "brand-logo--inverted",
        className
      )}
      aria-label="Cyber Land"
    >
      <Image
        src="/brand/cyber-land-icon.png"
        alt="Cyber Land"
        width={54}
        height={54}
        className="brand-logo__icon"
        sizes="(max-width: 768px) 44px, 54px"
        priority
      />
      <span className="brand-logo__text">Cyber Land</span>
    </span>
  );

  if (!href) return mark;

  return (
    <Link
      href={href}
      className="site-logo-link brand-logo-link"
      aria-label="Cyber Land home"
      onClick={onClick}
    >
      {mark}
    </Link>
  );
}
