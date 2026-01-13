import { Bird } from "lucide-react";
import { CreditsBadge } from "./CreditsBadge";
import { WindowControls } from "./WindowControls";
import { cn } from "@/lib/utils";

interface TitleBarProps {
  credits?: number;
  showCredits?: boolean;
  showControls?: boolean;
  rightContent?: React.ReactNode;
  className?: string;
  onMinimize?: () => void;
  onClose?: () => void;
}

export function TitleBar({
  credits = 0,
  showCredits = true,
  showControls = true,
  rightContent,
  className,
  onMinimize,
  onClose,
}: TitleBarProps) {
  return (
    <div
      className={cn(
        "flex items-center justify-between px-4 py-3 bg-window-header border-b border-border/50",
        className
      )}
    >
      {/* Logo & Name */}
      <div className="flex items-center gap-2">
        <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
          <Bird className="w-4 h-4 text-primary" />
        </div>
        <span className="font-semibold text-sm text-foreground">ParakeetAI</span>
      </div>

      {/* Center - Credits Badge */}
      <div className="flex items-center gap-3">
        {showCredits && <CreditsBadge credits={credits} />}
        {rightContent}
      </div>

      {/* Right - Window Controls */}
      {showControls && (
        <WindowControls onMinimize={onMinimize} onClose={onClose} />
      )}
    </div>
  );
}
