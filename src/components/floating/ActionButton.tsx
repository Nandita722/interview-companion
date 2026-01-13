import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface ActionButtonProps {
  children: ReactNode;
  variant?: "primary" | "secondary" | "ghost" | "outline";
  size?: "sm" | "md" | "lg";
  disabled?: boolean;
  fullWidth?: boolean;
  icon?: ReactNode;
  className?: string;
  onClick?: () => void;
}

export function ActionButton({
  children,
  variant = "primary",
  size = "md",
  disabled = false,
  fullWidth = false,
  icon,
  className,
  onClick,
}: ActionButtonProps) {
  const variantClasses = {
    primary: "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm",
    secondary: "bg-secondary text-secondary-foreground hover:bg-secondary/80",
    ghost: "text-foreground hover:bg-muted",
    outline: "border border-border text-foreground hover:bg-muted",
  };

  const sizeClasses = {
    sm: "px-3 py-1.5 text-xs",
    md: "px-4 py-2 text-sm",
    lg: "px-5 py-2.5 text-sm",
  };

  return (
    <button
      onClick={onClick}
      disabled={disabled}
      className={cn(
        "inline-flex items-center justify-center gap-2 rounded-lg font-medium transition-all",
        "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
        "disabled:opacity-50 disabled:cursor-not-allowed",
        variantClasses[variant],
        sizeClasses[size],
        fullWidth && "w-full",
        className
      )}
    >
      {icon && <span className="flex-shrink-0">{icon}</span>}
      {children}
    </button>
  );
}
