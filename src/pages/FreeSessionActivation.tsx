import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Clock, AlertTriangle, ArrowLeft, Zap } from "lucide-react";
import { FloatingWindow, TitleBar, ActionButton, MinimizedIcon } from "@/components/floating";

export default function FreeSessionActivation() {
  const navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(false);

  const handleBack = () => {
    navigate("/create-session/step2");
  };

  const handleActivate = () => {
    navigate("/session");
  };

  if (isMinimized) {
    return <MinimizedIcon onRestore={() => setIsMinimized(false)} />;
  }

  return (
    <FloatingWindow width="compact">
      <TitleBar credits={0} onMinimize={() => setIsMinimized(true)} />

      {/* Content */}
      <div className="flex flex-col items-center justify-center p-8 space-y-6">
        {/* Icon */}
        <div className="w-16 h-16 rounded-2xl bg-warning/20 flex items-center justify-center">
          <Clock className="w-8 h-8 text-warning" />
        </div>

        {/* Title */}
        <div className="text-center space-y-2">
          <h2 className="text-lg font-semibold text-foreground">
            Activate Interview Session
          </h2>
        </div>

        {/* Info Cards */}
        <div className="w-full space-y-3">
          <div className="flex items-start gap-3 p-3 rounded-lg bg-muted/50 border border-border">
            <Clock className="w-5 h-5 text-primary flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                This is a 10 minute free session
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                Session will automatically end after 10 minutes
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3 p-3 rounded-lg bg-warning/10 border border-warning/30">
            <AlertTriangle className="w-5 h-5 text-warning flex-shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-medium text-foreground">
                Cooldown period applies
              </p>
              <p className="text-xs text-muted-foreground mt-0.5">
                You won't be able to create another free session for the next 15 minutes
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="flex items-center justify-between gap-3 p-4 border-t border-border">
        <ActionButton
          variant="ghost"
          onClick={handleBack}
          icon={<ArrowLeft className="w-4 h-4" />}
        >
          Back
        </ActionButton>
        <ActionButton
          variant="primary"
          onClick={handleActivate}
          icon={<Zap className="w-4 h-4" />}
        >
          Activate (Free)
        </ActionButton>
      </div>
    </FloatingWindow>
  );
}
