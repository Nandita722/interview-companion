import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Sparkles,
  Monitor,
  MessageSquare,
  MoreVertical,
  GripVertical,
  Minus,
  X,
  Trash2,
  ChevronUp,
  Globe,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { ToggleSwitch } from "@/components/floating";

export default function ActiveSessionPage() {
  const navigate = useNavigate();
  const [autoScroll, setAutoScroll] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showAIPanel, setShowAIPanel] = useState(false);

  const mockTime = "9:43";
  const mockTranscript = [
    { time: "08:21 AM", speaker: "Interviewer", text: "Can you tell me about your experience with distributed systems?" },
    { time: "08:22 AM", speaker: "You", text: "Yes, I've worked extensively with microservices architecture..." },
    { time: "08:23 AM", speaker: "Interviewer", text: "What challenges did you face when scaling those systems?" },
  ];

  const mockAIAnswer = {
    question: "What challenges did you face when scaling those systems?",
    answer: [
      "Handled database sharding for horizontal scaling",
      "Implemented circuit breakers for fault tolerance",
      "Used message queues for async processing",
      "Managed service discovery with Consul",
    ],
  };

  const handleClose = () => {
    navigate("/dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-background">
      <div className="w-[420px] glass-strong rounded-xl floating-shadow overflow-hidden animate-fade-in">
        {/* Top Action Bar */}
        <div className="flex items-center gap-2 px-3 py-2 bg-window-header border-b border-border/50">
          {/* Listening Indicator */}
          <div className="flex items-center gap-2 mr-2">
            <div className="w-2 h-2 rounded-full bg-success pulse-dot" />
            <span className="text-xs font-medium text-muted-foreground">Listening</span>
          </div>

          {/* Action Buttons */}
          <button
            onClick={() => setShowAIPanel(!showAIPanel)}
            className={cn(
              "flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium transition-all",
              showAIPanel
                ? "bg-primary text-primary-foreground"
                : "bg-muted hover:bg-muted/80 text-foreground"
            )}
          >
            <Sparkles className="w-3.5 h-3.5" />
            AI Answer
          </button>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted hover:bg-muted/80 text-foreground transition-colors">
            <Monitor className="w-3.5 h-3.5" />
            Analyze
          </button>

          <button className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium bg-muted hover:bg-muted/80 text-foreground transition-colors">
            <MessageSquare className="w-3.5 h-3.5" />
            Chat
          </button>

          {/* Timer */}
          <div className="ml-auto flex items-center gap-1 text-sm font-mono text-muted-foreground">
            <span>{mockTime}</span>
          </div>

          {/* More Menu */}
          <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* Window Controls */}
          <div className="flex items-center gap-0.5 ml-1 border-l border-border pl-2">
            <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors cursor-grab">
              <GripVertical className="w-4 h-4" />
            </button>
            <button className="p-1.5 rounded-md text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors">
              <Minus className="w-4 h-4" />
            </button>
            <button
              onClick={handleClose}
              className="p-1.5 rounded-md text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Status Bar */}
        <div className="flex items-center justify-between px-3 py-1.5 bg-muted/30 border-b border-border/30">
          <div className="flex items-center gap-3">
            <ToggleSwitch
              label="Auto-scroll"
              checked={autoScroll}
              onChange={setAutoScroll}
              className="py-0"
            />
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Globe className="w-3.5 h-3.5" />
              <span>English</span>
            </div>
          </div>

          <div className="flex items-center gap-1">
            <button className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors" title="Clear transcript">
              <Trash2 className="w-3.5 h-3.5" />
            </button>
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1 rounded text-muted-foreground hover:text-foreground hover:bg-muted/50 transition-colors"
              title={isExpanded ? "Collapse" : "Expand"}
            >
              <ChevronUp className={cn("w-3.5 h-3.5 transition-transform", !isExpanded && "rotate-180")} />
            </button>
          </div>
        </div>

        {/* Main Content Area */}
        {isExpanded && (
          <div className="flex">
            {/* Transcript Panel */}
            <div className={cn(
              "flex-1 p-3 max-h-[280px] overflow-y-auto custom-scrollbar",
              showAIPanel && "border-r border-border/30"
            )}>
              {mockTranscript.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full py-8">
                  <div className="flex items-center gap-2 text-muted-foreground">
                    <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                    <span className="text-sm">Listening...</span>
                  </div>
                </div>
              ) : (
                <div className="space-y-3">
                  {mockTranscript.map((item, idx) => (
                    <div key={idx} className="space-y-1">
                      <div className="flex items-center gap-2 text-xs text-muted-foreground">
                        <span className="font-medium">{item.speaker}</span>
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

            {/* AI Answer Panel */}
            {showAIPanel && (
              <div className="w-[200px] p-3 max-h-[280px] overflow-y-auto custom-scrollbar animate-fade-in">
                <div className="space-y-3">
                  <div className="space-y-1">
                    <div className="flex items-center gap-1 text-xs text-primary font-medium">
                      <Sparkles className="w-3 h-3" />
                      <span>Detected Question</span>
                    </div>
                    <p className="text-xs text-muted-foreground italic">
                      "{mockAIAnswer.question}"
                    </p>
                  </div>

                  <div className="space-y-2">
                    <span className="text-xs font-medium text-foreground">Suggested Answer:</span>
                    <ul className="space-y-1.5">
                      {mockAIAnswer.answer.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-xs text-muted-foreground">
                          <span className="text-primary mt-0.5">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Collapsed State Indicator */}
        {!isExpanded && (
          <div className="px-3 py-2 text-center">
            <span className="text-xs text-muted-foreground">Click to expand transcript</span>
          </div>
        )}
      </div>
    </div>
  );
}
