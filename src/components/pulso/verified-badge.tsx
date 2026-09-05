import { BadgeCheck } from "lucide-react";

export function VerifiedBadge({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-center gap-1 rounded-full bg-primary/95 px-2.5 py-1 text-xs font-semibold text-primary-foreground shadow-soft ${className}`}
    >
      <BadgeCheck className="h-3.5 w-3.5 text-leaf" />
      Pulso Verified
    </span>
  );
}
