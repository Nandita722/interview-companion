import { Check, Lock, Info } from "lucide-react";
import { cn } from "@/lib/utils";

interface SessionTypeSelectorProps {
  value: "free" | "paid";
  onChange: (value: "free" | "paid") => void;
  hasCredits: boolean;
  className?: string;
}

export function SessionTypeSelector({
  value,
  onChange,
  hasCredits,
  className,
}: SessionTypeSelectorProps) {
  const options = [
    {
      id: "free" as const,
      title: "Free Session",
      description: "10 minutes max, limited features",
      disabled: false,
    },
    {
      id: "paid" as const,
      title: "Paid Session",
      description: "Unlimited duration, full features",
      disabled: !hasCredits,
    },
  ];

  return (
    <div className={cn("space-y-3", className)}>
      <div className="flex items-center gap-2">
        <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
          Select Session Type
        </span>
        <button 
          className="text-muted-foreground hover:text-foreground transition-colors"
          title="Free sessions are limited to 10 minutes and basic features"
        >
          <Info className="w-3.5 h-3.5" />
        </button>
      </div>
      
      <div className="space-y-2">
        {options.map((option) => (
          <button
            key={option.id}
            onClick={() => !option.disabled && onChange(option.id)}
            disabled={option.disabled}
            className={cn(
              "w-full flex items-center gap-3 p-3 rounded-lg border transition-all text-left",
              value === option.id
                ? "border-primary bg-primary/10"
                : "border-border hover:border-muted-foreground/50",
              option.disabled && "opacity-50 cursor-not-allowed hover:border-border"
            )}
          >
            <div
              className={cn(
                "w-5 h-5 rounded-full border-2 flex items-center justify-center flex-shrink-0",
                value === option.id
                  ? "border-primary bg-primary"
                  : "border-muted-foreground/50"
              )}
            >
              {value === option.id && (
                <Check className="w-3 h-3 text-primary-foreground" />
              )}
            </div>
            
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-foreground">
                  {option.title}
                </span>
                {option.disabled && (
                  <Lock className="w-3.5 h-3.5 text-muted-foreground" />
                )}
              </div>
              <span className="text-xs text-muted-foreground">
                {option.description}
              </span>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
