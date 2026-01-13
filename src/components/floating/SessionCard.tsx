import { Clock, Building2, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SessionCardProps {
  company: string;
  role: string;
  date: string;
  duration: string;
  status: "completed" | "in-progress";
  onClick?: () => void;
  className?: string;
}

export function SessionCard({
  company,
  role,
  date,
  duration,
  status,
  onClick,
  className,
}: SessionCardProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "w-full flex items-center gap-3 p-3 rounded-lg border border-border",
        "hover:border-muted-foreground/50 hover:bg-muted/30 transition-all text-left",
        className
      )}
    >
      <div className="w-9 h-9 rounded-lg bg-muted flex items-center justify-center flex-shrink-0">
        <Building2 className="w-4 h-4 text-muted-foreground" />
      </div>
      
      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-foreground truncate">
            {company}
          </span>
          {status === "in-progress" && (
            <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-success/20 text-success uppercase">
              Live
            </span>
          )}
        </div>
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="truncate">{role}</span>
          <span>·</span>
          <span>{date}</span>
        </div>
      </div>

      <div className="flex items-center gap-2 text-xs text-muted-foreground">
        <Clock className="w-3.5 h-3.5" />
        <span>{duration}</span>
        <ChevronRight className="w-4 h-4" />
      </div>
    </button>
  );
}
