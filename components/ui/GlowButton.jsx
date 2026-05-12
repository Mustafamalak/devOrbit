import Link from "next/link";
import { cn } from "@/lib/utils";

export default function GlowButton({
  href,
  children,
  variant = "primary",
  className,
}) {
  const base =
    "inline-flex items-center justify-center rounded-full px-5 py-3 text-sm font-semibold transition duration-300";

  const variants = {
    primary:
      "bg-cyan-400 text-slate-950 shadow-lg shadow-cyan-500/25 hover:scale-105 hover:bg-cyan-300",
    secondary:
      "border border-white/15 bg-white/5 text-white backdrop-blur hover:scale-105 hover:border-cyan-300/50 hover:bg-white/10",
  };

  if (href) {
    return (
      <Link href={href} className={cn(base, variants[variant], className)}>
        {children}
      </Link>
    );
  }

  return (
    <button className={cn(base, variants[variant], className)}>
      {children}
    </button>
  );
}