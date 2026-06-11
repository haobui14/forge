import Link from "next/link";
import type { ReactNode } from "react";

type Variant = "amber" | "terracotta" | "ghost-dark" | "dark";
type Size = "md" | "lg";

const VARIANTS: Record<Variant, string> = {
  amber:
    "bg-amber text-dark shadow-[0_4px_0_#9c6708] hover:-translate-y-0.5",
  terracotta:
    "bg-terracotta text-cream shadow-[0_3px_0_#7e3014] hover:-translate-y-px",
  "ghost-dark":
    "border border-[rgba(250,244,235,.3)] bg-transparent text-paper hover:border-amber hover:text-amber",
  dark: "bg-ink text-paper hover:bg-terracotta",
};

const SIZES: Record<Size, string> = {
  md: "text-[13px] px-5 py-3 rounded-[11px]",
  lg: "text-sm px-[26px] py-4 rounded-xl",
};

interface Props {
  variant: Variant;
  size?: Size;
  href?: string;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  children: ReactNode;
}

export function Button({
  variant,
  size = "lg",
  href,
  onClick,
  disabled,
  className = "",
  children,
}: Props) {
  const cls = `inline-block font-mono font-bold cursor-pointer transition-all duration-150 ${
    variant === "ghost-dark" ? "font-normal" : ""
  } ${VARIANTS[variant]} ${SIZES[size]} ${className}`;

  if (href) {
    return (
      <Link href={href} className={cls}>
        {children}
      </Link>
    );
  }
  return (
    <button onClick={onClick} disabled={disabled} className={cls}>
      {children}
    </button>
  );
}
