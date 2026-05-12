import { cn } from "@/lib/utils";

export default function GlassCard({ children, className }) {
  return (
    <div
      className={cn(
        "glass-panel rounded-3xl p-5 transition duration-300 hover:border-cyan-300/30 hover:shadow-cyan-500/10",
        className
      )}
    >
      {children}
    </div>
  );
}