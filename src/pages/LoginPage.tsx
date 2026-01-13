import { useState } from "react";
import { Bird } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { FloatingWindow, ActionButton, WindowControls, CreditsBadge, MinimizedIcon } from "@/components/floating";

export default function LoginPage() {
  const navigate = useNavigate();
  const [isMinimized, setIsMinimized] = useState(false);

  const handleLogin = () => {
    navigate("/dashboard");
  };

  if (isMinimized) {
    return <MinimizedIcon onRestore={() => setIsMinimized(false)} />;
  }

  return (
    <FloatingWindow width="compact">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-window-header border-b border-border/50">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg bg-primary/20 flex items-center justify-center">
            <Bird className="w-4 h-4 text-primary" />
          </div>
          <span className="font-semibold text-sm text-foreground">ParakeetAI</span>
        </div>
        <CreditsBadge credits={0} />
        <WindowControls showGrip={true} onMinimize={() => setIsMinimized(true)} />
      </div>

      {/* Content */}
      <div className="flex flex-col items-center justify-center p-8 space-y-6">
        {/* Large Logo */}
        <div className="w-20 h-20 rounded-2xl bg-primary/20 flex items-center justify-center">
          <Bird className="w-10 h-10 text-primary" />
        </div>

        {/* Branding */}
        <div className="text-center space-y-2">
          <h1 className="text-xl font-bold text-foreground">ParakeetAI</h1>
          <p className="text-sm text-muted-foreground max-w-[280px]">
            Login to your ParakeetAI account to start your interview
          </p>
        </div>

        {/* Login Button */}
        <ActionButton
          variant="primary"
          size="lg"
          fullWidth
          onClick={handleLogin}
          className="max-w-[200px]"
        >
          Login
        </ActionButton>
      </div>
    </FloatingWindow>
  );
}
