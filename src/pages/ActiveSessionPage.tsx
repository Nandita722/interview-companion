import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Monitor,
  MoreVertical,
  Move,
  ChevronUp,
  X,
  Trash2,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ActiveSessionPage() {
  const navigate = useNavigate();
  const [autoScroll, setAutoScroll] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const [activePanel, setActivePanel] = useState<"transcript" | "ai" | "chat">("transcript");

  const mockTime = "9:43";
  const mockTranscript = [
    { time: "08:21 AM", speaker: "Client 1", text: "But I think." },
    { time: "08:21 AM", speaker: "Client 1", text: "Multiple requests or requests." },
    { time: "08:22 AM", speaker: "Client 1", text: "Do timeout." },
    { time: "08:22 AM", speaker: "Client 1", text: "Response. Timeout." },
    { time: "08:22 AM", speaker: "Client 1", text: "Or. Long polling." },
    { time: "08:22 AM", speaker: "Client 1", text: "Long polling. I think." },
    { time: "08:22 AM", speaker: "Client 1", text: "Timeout. That's it. Long polling. Example." },
    { time: "08:22 AM", speaker: "Client 1", text: "Interviews," },
  ];

  const mockAIAnswer = {
    question: "What is the difference between long polling and websockets?",
    answer: [
      "Long polling keeps connection open until server has data",
      "WebSockets provide full-duplex communication",
      "Long polling has higher latency than WebSockets",
      "WebSockets are better for real-time applications",
    ],
  };

  const handleClose = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-[520px] glass-strong rounded-2xl floating-shadow overflow-hidden animate-fade-in">
        
        {/* Top Action Bar */}
        <div className="flex items-center gap-2 px-3 py-2.5 bg-window-header/90 backdrop-blur-sm">
          {/* AI Answer Button */}
          <button
            onClick={() => setActivePanel(activePanel === "ai" ? "transcript" : "ai")}
            className={cn(
              "flex items-center gap-2 h-9 px-4 rounded-full text-sm font-medium transition-all border",
              activePanel === "ai"
                ? "bg-primary/20 text-primary border-primary/50"
                : "bg-transparent hover:bg-muted/40 text-foreground border-border"
            )}
          >
            AI Answer
            <Sparkles className="w-4 h-4" />
          </button>

          {/* Analyze Screen Button */}
          <button
            className="flex items-center gap-2 h-9 px-4 rounded-full text-sm font-medium transition-all border bg-transparent hover:bg-muted/40 text-foreground border-border"
          >
            Analyze Screen
            <Monitor className="w-4 h-4" />
          </button>

          {/* Chat Button */}
          <button
            onClick={() => setActivePanel(activePanel === "chat" ? "transcript" : "chat")}
            className={cn(
              "flex items-center h-9 px-4 rounded-full text-sm font-medium transition-all border border-dashed",
              activePanel === "chat"
                ? "bg-primary/20 text-primary border-primary/50"
                : "bg-transparent hover:bg-muted/40 text-foreground border-border"
            )}
          >
            Chat
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Timer */}
          <div className="flex items-center gap-1.5 h-9 px-3 rounded-lg bg-muted/60 text-sm font-mono text-foreground">
            <div className="w-4 h-4 rounded bg-foreground/80 flex items-center justify-center">
              <div className="w-2 h-2 rounded-sm bg-muted" />
            </div>
            <span>{mockTime}</span>
          </div>

          {/* More Menu */}
          <button className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted/60 text-foreground hover:bg-muted transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* Move Handle */}
          <button className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted/60 text-foreground hover:bg-muted transition-colors cursor-grab">
            <Move className="w-4 h-4" />
          </button>

          {/* Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center w-9 h-9 rounded-lg bg-muted/60 text-foreground hover:bg-muted transition-colors"
          >
            <ChevronUp className={cn("w-4 h-4 transition-transform", !isExpanded && "rotate-180")} />
          </button>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-muted/30">
          <div className="flex items-center gap-4">
            {/* Auto-scroll Toggle */}
            <label className="flex items-center gap-2.5 cursor-pointer">
              <button
                type="button"
                role="switch"
                aria-checked={autoScroll}
                onClick={() => setAutoScroll(!autoScroll)}
                className={cn(
                  "relative inline-flex h-5 w-10 flex-shrink-0 rounded-full transition-colors",
                  autoScroll ? "bg-primary" : "bg-muted-foreground/30"
                )}
              >
                <span
                  className={cn(
                    "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform",
                    "absolute top-0.5",
                    autoScroll ? "translate-x-5" : "translate-x-0.5"
                  )}
                />
              </button>
              <span className="text-sm font-medium text-foreground">Auto-scroll</span>
            </label>

            {/* Language */}
            <span className="text-sm text-muted-foreground">English</span>
          </div>

          {/* Right side controls */}
          <div className="flex items-center gap-1.5">
            {/* Clear Button */}
            <button 
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
              title="Clear transcript"
            >
              <Trash2 className="w-4 h-4" />
            </button>

            {/* Collapse */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            >
              <ChevronUp className={cn("w-4 h-4 transition-transform", !isExpanded && "rotate-180")} />
            </button>

            {/* Close */}
            <button
              onClick={handleClose}
              className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        {isExpanded && (
          <>
            {/* Transcript View */}
            {activePanel === "transcript" && (
              <div className="p-3">
                {/* Listening Input Bar */}
                <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/40 border border-border/50">
                  <span className="text-sm text-muted-foreground">Listening...</span>
                  <div className="flex-1" />
                </div>

                {/* Transcript Content */}
                {mockTranscript.length > 0 && (
                  <div className="mt-3 max-h-[250px] overflow-y-auto custom-scrollbar space-y-3">
                    {mockTranscript.map((item, idx) => (
                      <div key={idx} className="space-y-1">
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <span className="font-medium text-foreground/70">{item.speaker}</span>
                          <span>·</span>
                          <span>{item.time}</span>
                        </div>
                        <p className="text-sm text-foreground leading-relaxed">
                          {item.text}
                        </p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* AI Answer View */}
            {activePanel === "ai" && (
              <div className="p-4 max-h-[300px] overflow-y-auto custom-scrollbar animate-fade-in">
                <div className="space-y-4">
                  {/* Detected Question */}
                  <div className="p-3 rounded-xl bg-primary/10 border border-primary/20">
                    <div className="flex items-center gap-2 text-xs text-primary font-medium mb-2">
                      <Sparkles className="w-3.5 h-3.5" />
                      <span>Detected Question</span>
                    </div>
                    <p className="text-sm text-foreground italic">
                      "{mockAIAnswer.question}"
                    </p>
                  </div>

                  {/* Suggested Answer */}
                  <div className="space-y-2">
                    <span className="text-sm font-medium text-foreground">Suggested Answer:</span>
                    <ul className="space-y-2">
                      {mockAIAnswer.answer.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-3 text-sm text-muted-foreground">
                          <span className="text-primary font-bold mt-0.5">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Back to transcript */}
                  <button
                    onClick={() => setActivePanel("transcript")}
                    className="w-full mt-2 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Back to Transcript
                  </button>
                </div>
              </div>
            )}

            {/* Chat View */}
            {activePanel === "chat" && (
              <div className="p-4 max-h-[300px] overflow-y-auto custom-scrollbar animate-fade-in">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <MessageSquare className="w-10 h-10 text-muted-foreground/50 mb-3" />
                  <span className="text-sm text-muted-foreground">Chat with AI Assistant</span>
                  <p className="text-xs text-muted-foreground/70 mt-1 max-w-[200px]">
                    Ask follow-up questions or get clarifications
                  </p>
                  
                  {/* Back to transcript */}
                  <button
                    onClick={() => setActivePanel("transcript")}
                    className="mt-4 text-sm text-muted-foreground hover:text-foreground transition-colors"
                  >
                    ← Back to Transcript
                  </button>
                </div>
              </div>
            )}
          </>
        )}

        {/* Collapsed State */}
        {!isExpanded && (
          <div 
            className="px-4 py-3 cursor-pointer hover:bg-muted/20 transition-colors"
            onClick={() => setIsExpanded(true)}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/40 border border-border/50">
              <span className="text-sm text-muted-foreground">Listening...</span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
