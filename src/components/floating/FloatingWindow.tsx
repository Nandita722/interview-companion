import { ReactNode } from "react";
import { cn } from "@/lib/utils";

interface FloatingWindowProps {
  children: ReactNode;
  className?: string;
  width?: "compact" | "medium" | "wide";
}

export function FloatingWindow({ 
  children, 
  className,
  width = "compact" 
}: FloatingWindowProps) {
  const widthClasses = {
    compact: "w-[400px]",
    medium: "w-[480px]",
    wide: "w-[520px]",
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div
        className={cn(
          widthClasses[width],
          "glass-strong rounded-xl floating-shadow overflow-hidden",
          "flex flex-col",
          className
        )}
      >
        {children}
      </div>
    </div>
  );
}
