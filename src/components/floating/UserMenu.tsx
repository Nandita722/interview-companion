import { useState } from "react";
import { ChevronDown, ExternalLink, ZoomIn, ZoomOut, LogOut, User } from "lucide-react";
import { cn } from "@/lib/utils";

interface UserMenuProps {
  email: string;
  onLogout?: () => void;
  onDashboard?: () => void;
  className?: string;
}

export function UserMenu({ email, onLogout, onDashboard, className }: UserMenuProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className={cn("relative", className)}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 p-1.5 rounded-lg hover:bg-muted/50 transition-colors"
      >
        <div className="w-7 h-7 rounded-full bg-muted flex items-center justify-center">
          <User className="w-4 h-4 text-muted-foreground" />
        </div>
        <ChevronDown className={cn(
          "w-3.5 h-3.5 text-muted-foreground transition-transform",
          isOpen && "rotate-180"
        )} />
      </button>

      {isOpen && (
        <>
          <div 
            className="fixed inset-0 z-40" 
            onClick={() => setIsOpen(false)} 
          />
          <div className="absolute right-0 top-full mt-2 w-56 py-1 rounded-lg glass-strong border border-border shadow-floating z-50 animate-fade-in">
            {/* Email */}
            <div className="px-3 py-2 border-b border-border">
              <p className="text-xs text-muted-foreground">Signed in as</p>
              <p className="text-sm font-medium text-foreground truncate">{email}</p>
            </div>

            {/* Actions */}
            <div className="py-1">
              <button
                onClick={() => {
                  onDashboard?.();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-foreground hover:bg-muted/50 transition-colors"
              >
                <ExternalLink className="w-4 h-4 text-muted-foreground" />
                Dashboard
              </button>
              
              <div className="flex items-center gap-1 px-3 py-2">
                <span className="text-sm text-muted-foreground flex-1">Zoom</span>
                <button className="p-1.5 rounded hover:bg-muted/50 transition-colors">
                  <ZoomOut className="w-4 h-4 text-foreground" />
                </button>
                <button className="p-1.5 rounded hover:bg-muted/50 transition-colors">
                  <ZoomIn className="w-4 h-4 text-foreground" />
                </button>
              </div>
            </div>

            {/* Logout */}
            <div className="border-t border-border py-1">
              <button
                onClick={() => {
                  onLogout?.();
                  setIsOpen(false);
                }}
                className="w-full flex items-center gap-2 px-3 py-2 text-sm text-destructive hover:bg-destructive/10 transition-colors"
              >
                <LogOut className="w-4 h-4" />
                Logout
              </button>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
