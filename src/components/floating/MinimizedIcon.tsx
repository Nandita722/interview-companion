import { useState, useRef, useEffect } from "react";
import { cn } from "@/lib/utils";
import parakeetIcon from "@/assets/parakeet-icon.png";

interface MinimizedIconProps {
  onRestore: () => void;
  variant?: "default" | "transcribe";
  isListening?: boolean;
}

export function MinimizedIcon({ onRestore, variant = "default", isListening = true }: MinimizedIconProps) {
  const [iconPosition, setIconPosition] = useState({ 
    x: (window.innerWidth - 56) / 2, 
    y: 20 
  });
  const [isDragging, setIsDragging] = useState(false);
  const dragOffset = useRef({ x: 0, y: 0 });
  const hasMoved = useRef(false);

  const handleMouseDown = (e: React.MouseEvent) => {
    setIsDragging(true);
    hasMoved.current = false;
    dragOffset.current = {
      x: e.clientX - iconPosition.x,
      y: e.clientY - iconPosition.y,
    };
  };

  const handleClick = () => {
    if (!hasMoved.current) {
      onRestore();
    }
  };

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!isDragging) return;
      hasMoved.current = true;
      setIconPosition({
        x: Math.max(0, Math.min(window.innerWidth - 56, e.clientX - dragOffset.current.x)),
        y: Math.max(0, Math.min(window.innerHeight - 56, e.clientY - dragOffset.current.y)),
      });
    };

    const handleMouseUp = () => {
      setIsDragging(false);
    };

    if (isDragging) {
      window.addEventListener("mousemove", handleMouseMove);
      window.addEventListener("mouseup", handleMouseUp);
    }

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };
  }, [isDragging]);

  return (
    <div className="min-h-screen bg-background">
      <div 
        className="fixed group z-[9999]"
        style={{ left: iconPosition.x, top: iconPosition.y }}
      >
        {/* Minimized floating icon */}
        <button
          onMouseDown={handleMouseDown}
          onClick={handleClick}
          className={cn(
            "flex items-center justify-center w-14 h-14 rounded-xl shadow-lg transition-all hover:scale-105",
            variant === "transcribe" 
              ? "bg-black border-2 border-green-500/50 shadow-green-500/20 hover:shadow-green-500/40"
              : "bg-[#1a1a2e] border border-primary/30 shadow-primary/20 hover:shadow-primary/40",
            isDragging ? "cursor-grabbing" : "cursor-grab"
          )}
        >
          {variant === "transcribe" ? (
            /* Audio wave icon for transcribe mode */
            <div className="flex items-center gap-0.5 h-6">
              {[3, 5, 4, 5, 3].map((height, i) => (
                <div 
                  key={i}
                  className={cn(
                    "w-1 rounded-full transition-all",
                    isListening ? "bg-green-400 animate-pulse" : "bg-green-400/40"
                  )}
                  style={{ 
                    height: `${height * 4}px`,
                    animationDelay: isListening ? `${i * 0.1}s` : undefined 
                  }}
                />
              ))}
            </div>
          ) : (
            /* Bird icon for default mode */
            <img 
              src={parakeetIcon} 
              alt="ParakeetAI" 
              className="w-8 h-8 object-contain"
              draggable={false}
            />
          )}
        </button>
        
        {/* Tooltip */}
        <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 px-3 py-1.5 rounded-lg bg-popover border border-border shadow-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap text-sm pointer-events-none">
          ParakeetAI (Ctrl + H)
        </div>
      </div>
    </div>
  );
}
