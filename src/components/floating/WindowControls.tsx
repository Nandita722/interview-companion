import { Minus, X, GripVertical } from "lucide-react";
import { cn } from "@/lib/utils";

interface WindowControlsProps {
  onMinimize?: () => void;
  onClose?: () => void;
  className?: string;
  showGrip?: boolean;
}

export function WindowControls({ 
  onMinimize, 
  onClose, 
  className,
  showGrip = true 
}: WindowControlsProps) {
  return (
    <div className={cn("flex items-center gap-1", className)}>
      {showGrip && (
        <button
          className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-grab active:cursor-grabbing"
          title="Move window"
        >
          <GripVertical className="w-4 h-4" />
        </button>
      )}
      <button
        onClick={onMinimize}
        className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
        title="Minimize"
      >
        <Minus className="w-4 h-4" />
      </button>
      <button
        onClick={onClose}
        className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
        title="Close"
      >
        <X className="w-4 h-4" />
      </button>
    </div>
  );
}
