import { cn } from "@/lib/utils";

export default function GlassCard({ children, className }) {
  return (
    <div
      className={cn(
        "premium-card ember-border rounded-3xl p-5 transition duration-300 hover:shadow-pink-500/10",
        className
      )}
    >
      {children}
    </div>
  );
}