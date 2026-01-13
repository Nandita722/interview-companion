import { Coins } from "lucide-react";
import { cn } from "@/lib/utils";

interface CreditsBadgeProps {
  credits: number;
  className?: string;
}

export function CreditsBadge({ credits, className }: CreditsBadgeProps) {
  const hasCredits = credits > 0;

  return (
    <div
      className={cn(
        "flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium",
        hasCredits 
          ? "bg-primary/20 text-primary border border-primary/30" 
          : "bg-muted text-muted-foreground border border-border",
        className
      )}
    >
      <Coins className="w-3.5 h-3.5" />
      <span>{hasCredits ? `${credits} Credits` : "No Credits"}</span>
    </div>
  );
}
