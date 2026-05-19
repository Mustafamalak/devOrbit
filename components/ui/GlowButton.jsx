import Link from "next/link";
import { cn } from "@/lib/utils";

export default function GlowButton({
  href,
  children,
  variant = "primary",
  className,
}) {
  const base =
    "group relative inline-flex items-center justify-center overflow-hidden rounded-full px-5 py-3 text-sm font-semibold transition duration-300 active:scale-95";

  const variants = {
    primary:
      "bg-gradient-to-r from-pink-400 via-orange-400 to-violet-600 text-white shadow-lg shadow-pink-500/25 hover:scale-105 hover:shadow-orange-500/25",
    secondary:
      "border border-white/15 bg-white/5 text-white backdrop-blur hover:scale-105 hover:border-pink-300/50 hover:bg-white/10",
  };

  const content = (
    <>
      <span className="absolute inset-0 -translate-x-full bg-linear-to-r from-transparent via-white/25 to-transparent transition duration-700 group-hover:translate-x-full" />
      <span className="relative z-10 inline-flex items-center gap-2">
        {children}
      </span>
    </>
  );

  if (href) {
    return (
      <Link href={href} className={cn(base, variants[variant], className)}>
        {content}
      </Link>
    );
  }

  return (
    <button className={cn(base, variants[variant], className)}>
      {content}
    </button>
  );
}