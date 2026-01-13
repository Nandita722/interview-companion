import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, History, Coins, Package } from "lucide-react";
import {
  FloatingWindow,
  TitleBar,
  TabNavigation,
  SessionTypeSelector,
  ActionButton,
  SessionCard,
  UserMenu,
} from "@/components/floating";

export default function DashboardPage() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("create");
  const [sessionType, setSessionType] = useState<"free" | "paid">("free");
  const credits = 0; // Mock: no credits

  const tabs = [
    { id: "create", label: "Create", icon: <Plus className="w-4 h-4" /> },
    { id: "history", label: "Past Sessions", icon: <History className="w-4 h-4" /> },
  ];

  const mockSessions = [
    {
      company: "Google",
      role: "Senior Engineer",
      date: "Jan 10",
      duration: "45:30",
      status: "completed" as const,
    },
  ];

  const handleStartSession = () => {
    navigate("/create-session/step1");
  };

  const handleBuyCredits = () => {
    // Open buy credits flow
    console.log("Buy credits");
  };

  const handleLogout = () => {
    navigate("/");
  };

  return (
    <FloatingWindow width="medium">
      {/* Title Bar with User Menu */}
      <TitleBar
        credits={credits}
        rightContent={
          <UserMenu
            email="user@example.com"
            onLogout={handleLogout}
            onDashboard={() => console.log("Open web dashboard")}
          />
        }
      />

      {/* Tab Navigation */}
      <TabNavigation tabs={tabs} activeTab={activeTab} onTabChange={setActiveTab} />

      {/* Content */}
      <div className="p-4 space-y-4 min-h-[320px]">
        {activeTab === "create" && (
          <>
            <SessionTypeSelector
              value={sessionType}
              onChange={setSessionType}
              hasCredits={credits > 0}
            />

            <div className="flex gap-3 pt-2">
              <ActionButton
                variant="primary"
                fullWidth
                onClick={handleStartSession}
              >
                Free Session
              </ActionButton>
              <ActionButton
                variant="outline"
                fullWidth
                onClick={handleBuyCredits}
                icon={<Coins className="w-4 h-4" />}
              >
                Buy Credits
              </ActionButton>
            </div>
          </>
        )}

        {activeTab === "history" && (
          <div className="space-y-3">
            {credits === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3">
                  <Package className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground max-w-[240px] mb-4">
                  You don't have any interview credits. Buy some to start a paid session.
                </p>
                <ActionButton
                  variant="primary"
                  onClick={handleBuyCredits}
                  icon={<Coins className="w-4 h-4" />}
                >
                  Buy Credits
                </ActionButton>
              </div>
            )}

            {credits > 0 && mockSessions.length > 0 && (
              <div className="space-y-2">
                {mockSessions.map((session, idx) => (
                  <SessionCard key={idx} {...session} />
                ))}
              </div>
            )}

            {credits > 0 && mockSessions.length === 0 && (
              <div className="flex flex-col items-center justify-center py-8 text-center">
                <div className="w-12 h-12 rounded-xl bg-muted flex items-center justify-center mb-3">
                  <History className="w-6 h-6 text-muted-foreground" />
                </div>
                <p className="text-sm text-muted-foreground">
                  No past sessions yet
                </p>
              </div>
            )}
          </div>
        )}
      </div>
    </FloatingWindow>
  );
}
