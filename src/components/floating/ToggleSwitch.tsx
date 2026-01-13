import { cn } from "@/lib/utils";

interface ToggleSwitchProps {
  label?: string;
  description?: string;
  checked: boolean;
  onChange: (checked: boolean) => void;
  badge?: string;
  disabled?: boolean;
  className?: string;
}

export function ToggleSwitch({
  label,
  description,
  checked,
  onChange,
  badge,
  disabled = false,
  className,
}: ToggleSwitchProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between gap-3 py-2",
        disabled && "opacity-50",
        className
      )}
    >
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          {label && (
            <span className="text-sm font-medium text-foreground">{label}</span>
          )}
          {badge && (
            <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-primary/20 text-primary uppercase">
              {badge}
            </span>
          )}
        </div>
        {description && (
          <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
        )}
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        disabled={disabled}
        onClick={() => onChange(!checked)}
        className={cn(
          "relative inline-flex h-5 w-9 flex-shrink-0 rounded-full transition-colors",
          "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
          checked ? "bg-primary" : "bg-muted",
          disabled && "cursor-not-allowed"
        )}
      >
        <span
          className={cn(
            "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform",
            "absolute top-0.5",
            checked ? "translate-x-4" : "translate-x-0.5"
          )}
        />
      </button>
    </div>
  );
}
