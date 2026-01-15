import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";
import type { KeyboardEvent } from "react";
import { useNavigate } from "react-router-dom";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {
  Sparkles,
  Monitor,
  MoreVertical,
  Move,
  ChevronUp,
  ChevronLeft,
  ChevronRight,
  ChevronDown,
  X,
  Trash2,
  Mic,
  Star,
  LayoutGrid,
  Plus,
  Minus,
  RotateCcw,
  Globe,
  LogOut,
  StopCircle,
  Send,
  MessageSquare,
} from "lucide-react";
import { cn } from "@/lib/utils";
import { MinimizedIcon } from "@/components/floating";

type TranscriptItem = {
  time: string;
  speaker: string;
  text: string;
};

type OutputItem = {
  type: "ai" | "chat" | "screen";
  question?: string;
  answer?: string | string[];
  timestamp: string;
};

const MOCK_TIME = "9:43";
const MOCK_TRANSCRIPT: TranscriptItem[] = [
  { time: "08:21 AM", speaker: "Client 1", text: "But I think." },
  { time: "08:21 AM", speaker: "Client 1", text: "Multiple requests or requests." },
  // { time: "08:22 AM", speaker: "Client 1", text: "Do timeout." },
  // { time: "08:22 AM", speaker: "Client 1", text: "Response. Timeout." },
  // { time: "08:22 AM", speaker: "Client 1", text: "Or. Long polling." },
  // { time: "08:22 AM", speaker: "Client 1", text: "Long polling. I think." },
];
const MOCK_AI_ANSWER = {
  question: "What programming language do you know?",
  answer: [
    "I know JavaScript.",
    "I am comfortable using JavaScript for web development and scripting.",
    "I can write code to create interactive web pages and handle client-side logic.",
    "I am familiar with JavaScript basics like variables, functions, loops, and events.",
    "I can also work with JavaScript frameworks and libraries if needed.",
  ],
};

type TopBarProps = {
  showTranscript: boolean;
  onToggleTranscript: () => void;
  computerAudioEnabled: boolean;
  onToggleComputerAudio: () => void;
  microphoneEnabled: boolean;
  onToggleMicrophone: () => void;
  showAIAnswer: boolean;
  onToggleAIAnswer: () => void;
  showAnalyzeScreen: boolean;
  onToggleAnalyzeScreen: () => void;
  showChatInput: boolean;
  onOpenChatInput: () => void;
  onCancelChatInput: () => void;
  chatMessage: string;
  onChatMessageChange: (value: string) => void;
  onChatInputKeyDown: (event: KeyboardEvent<HTMLInputElement>) => void;
  onSubmitChat: () => void;
  showMoreMenu: boolean;
  onToggleMoreMenu: () => void;
  onCloseMoreMenu: () => void;
  onNavigateDashboard: () => void;
  autoGenerate: boolean;
  onToggleAutoGenerate: () => void;
  selectedLanguage: string;
  mockTime: string;
  onMinimize: () => void;
  onRequestEndSession: () => void;
  isListening: boolean;
};

const TopBar = memo(function TopBar({
  showTranscript,
  onToggleTranscript,
  computerAudioEnabled,
  onToggleComputerAudio,
  microphoneEnabled,
  onToggleMicrophone,
  showAIAnswer,
  onToggleAIAnswer,
  showAnalyzeScreen,
  onToggleAnalyzeScreen,
  showChatInput,
  onOpenChatInput,
  onCancelChatInput,
  chatMessage,
  onChatMessageChange,
  onChatInputKeyDown,
  onSubmitChat,
  showMoreMenu,
  onToggleMoreMenu,
  onCloseMoreMenu,
  onNavigateDashboard,
  autoGenerate,
  onToggleAutoGenerate,
  selectedLanguage,
  mockTime,
  onMinimize,
  onRequestEndSession,
  isListening,
}: TopBarProps) {
  return (
    <div className="relative z-[200] w-full max-w-[680px] mx-auto glass-strong backdrop-blur-sm border-b border-border/30 pointer-events-auto overflow-visible">
      <div className="flex w-full flex-nowrap items-center justify-center gap-2 px-2.5 py-2 overflow-visible">
        <button
          onClick={onToggleTranscript}
          className={cn(
            "relative flex items-center justify-center w-9 h-9 rounded-lg transition-all",
            showTranscript ? "bg-green-500/20" : "bg-muted/60 hover:bg-muted",
          )}
          title="Toggle Transcript"
        >
          <div className="flex items-center gap-0.5 h-4">
            <div
              className={cn(
                "w-0.5 rounded-full transition-all",
                showTranscript ? "bg-green-400 h-2 animate-pulse" : "bg-muted-foreground h-2",
              )}
            />
            <div
              className={cn(
                "w-0.5 rounded-full transition-all",
                showTranscript ? "bg-green-400 h-4 animate-pulse" : "bg-muted-foreground h-3",
              )}
              style={{ animationDelay: "0.1s" }}
            />
            <div
              className={cn(
                "w-0.5 rounded-full transition-all",
                showTranscript ? "bg-green-400 h-3 animate-pulse" : "bg-muted-foreground h-2",
              )}
              style={{ animationDelay: "0.2s" }}
            />
            <div
              className={cn(
                "w-0.5 rounded-full transition-all",
                showTranscript ? "bg-green-400 h-4 animate-pulse" : "bg-muted-foreground h-3",
              )}
              style={{ animationDelay: "0.3s" }}
            />
            <div
              className={cn(
                "w-0.5 rounded-full transition-all",
                showTranscript ? "bg-green-400 h-2 animate-pulse" : "bg-muted-foreground h-2",
              )}
              style={{ animationDelay: "0.4s" }}
            />
          </div>
        </button>

        <button
          onClick={onToggleComputerAudio}
          className={cn(
            "flex items-center justify-center w-9 h-9 rounded-lg transition-all",
            computerAudioEnabled
              ? "bg-orange-500/20 text-orange-400"
              : "bg-muted/60 text-muted-foreground hover:bg-muted",
          )}
          title="Computer audio capture"
        >
          <Monitor className="w-4 h-4" />
        </button>

        <button
          onClick={onToggleMicrophone}
          className={cn(
            "flex items-center justify-center w-9 h-9 rounded-lg transition-all",
            microphoneEnabled ? "bg-yellow-500/20 text-yellow-400" : "bg-muted/60 text-muted-foreground hover:bg-muted",
          )}
          title="Microphone capture"
        >
          <Mic className="w-4 h-4" />
        </button>

        <div className="w-px h-6 bg-border/50 mx-1" />

        <button
          onClick={onToggleAIAnswer}
          className={cn(
            "flex items-center gap-1.5 h-8 px-3 rounded-full text-sm font-medium transition-all",
            showAIAnswer ? "bg-primary/20 text-primary" : "bg-muted/60 hover:bg-muted text-foreground",
          )}
        >
          AI Answer
          <Sparkles className="w-3.5 h-3.5" />
        </button>

        <button
          onClick={onToggleAnalyzeScreen}
          className={cn(
            "flex items-center gap-1.5 h-8 px-3 rounded-full text-sm font-medium transition-all",
            showAnalyzeScreen ? "bg-primary/20 text-primary" : "bg-muted/60 hover:bg-muted text-foreground",
          )}
        >
          Analyze Screen
          <Monitor className="w-3.5 h-3.5" />
        </button>

        {!showChatInput ? (
          <button
            onClick={onOpenChatInput}
            className="flex items-center h-8 px-4 rounded-full text-sm font-medium transition-all border bg-muted/60 hover:bg-muted text-foreground border-transparent"
          >
            Chat
          </button>
        ) : (
          <button
            onClick={onCancelChatInput}
            className="flex items-center h-8 px-4 rounded-full text-sm font-medium bg-primary text-primary-foreground hover:bg-primary/90 transition-all"
          >
            Cancel
          </button>
        )}

        <div className="flex-1" />

        <div className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-muted/60 text-sm font-mono text-foreground">
          <div className="w-4 h-4 rounded bg-foreground/80 flex items-center justify-center">
            <div className="w-2 h-2 rounded-sm bg-muted" />
          </div>
          <span>{mockTime}</span>
        </div>

        <div className="relative">
          <button
            onClick={onToggleMoreMenu}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60 text-foreground hover:bg-muted transition-colors"
          >
            <MoreVertical className="w-4 h-4" />
          </button>

          {showMoreMenu && (
            <div className="absolute right-0 top-full mt-2 w-56 rounded-xl bg-popover border border-border shadow-xl z-[9999] overflow-y-auto max-h-[300px] animate-fade-in pointer-events-auto">
              <div className="px-3 py-2 border-b border-border/50 text-xs text-muted-foreground">
                More <span className="text-foreground">user@email.com</span>
              </div>

              <button
                onClick={onNavigateDashboard}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted/50 transition-colors text-sm text-foreground"
              >
                <LayoutGrid className="w-4 h-4" />
                Dashboard
              </button>

              <div className="flex items-center justify-between px-3 py-2.5 border-t border-border/30">
                <span className="text-sm text-foreground">Zoom</span>
                <div className="flex items-center gap-1">
                  <button className="flex items-center justify-center w-7 h-7 rounded bg-muted/60 text-foreground hover:bg-muted transition-colors">
                    <Plus className="w-3.5 h-3.5" />
                  </button>
                  <button className="flex items-center justify-center w-7 h-7 rounded bg-muted/60 text-foreground hover:bg-muted transition-colors">
                    <Minus className="w-3.5 h-3.5" />
                  </button>
                  <button className="flex items-center justify-center w-7 h-7 rounded bg-muted/60 text-foreground hover:bg-muted transition-colors">
                    <RotateCcw className="w-3.5 h-3.5" />
                  </button>
                </div>
              </div>

              <div className="flex items-center justify-between px-3 py-2.5 border-t border-border/30">
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4 text-foreground" />
                  <span className="text-sm text-foreground">{selectedLanguage}</span>
                </div>
                <ChevronDown className="w-4 h-4 text-muted-foreground" />
              </div>

              <div className="flex items-center justify-between px-3 py-2.5 border-t border-border/30">
                <span className="text-sm text-foreground">Auto Generate</span>
                <button
                  onClick={onToggleAutoGenerate}
                  className={cn(
                    "relative inline-flex h-5 w-9 flex-shrink-0 rounded-full transition-colors",
                    autoGenerate ? "bg-primary" : "bg-muted-foreground/30",
                  )}
                >
                  <span
                    className={cn(
                      "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform",
                      "absolute top-0.5",
                      autoGenerate ? "translate-x-4" : "translate-x-0.5",
                    )}
                  />
                </button>
              </div>

              <button
                onClick={onCloseMoreMenu}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-muted/50 transition-colors text-sm text-foreground border-t border-border/30"
              >
                <X className="w-4 h-4" />
                Exit
              </button>

              <button
                onClick={onRequestEndSession}
                className="w-full flex items-center gap-3 px-3 py-2.5 hover:bg-destructive/10 transition-colors text-sm text-destructive border-t border-border/30"
              >
                <StopCircle className="w-4 h-4" />
                End Session
              </button>
            </div>
          )}
        </div>

        <button className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60 text-foreground hover:bg-muted transition-colors cursor-grab">
          <Move className="w-4 h-4" />
        </button>

        <button
          onClick={onMinimize}
          className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60 text-foreground hover:bg-muted transition-colors"
          title="Minimize (Ctrl + H)"
        >
          <ChevronUp className="w-4 h-4" />
        </button>
      </div>

      {showChatInput && (
        <div className="flex items-center gap-2 px-2.5 pb-2 mx-auto w-full max-w-[680px] pointer-events-auto">
          <input
            type="text"
            placeholder="Enter a message"
            value={chatMessage}
            onChange={(event) => onChatMessageChange(event.target.value)}
            onKeyDown={onChatInputKeyDown}
            className="w-full h-8 px-4 rounded-full bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-1 focus:ring-ring text-sm"
            autoFocus
          />
          <button
            onClick={onSubmitChat}
            disabled={!chatMessage.trim()}
            className={cn(
              "flex items-center justify-center w-8 h-8 rounded-full transition-all",
              chatMessage.trim()
                ? "bg-foreground text-background hover:bg-foreground/90"
                : "bg-muted/60 text-muted-foreground",
            )}
          >
            <Send className="w-3.5 h-3.5" />
          </button>
        </div>
      )}
    </div>
  );
});

type TranscriptPanelProps = {
  autoScroll: boolean;
  onToggleAutoScroll: () => void;
  isExpanded: boolean;
  onToggleExpanded: () => void;
  onClose: () => void;
  isListening: boolean;
  transcript: TranscriptItem[];
  languageLabel: string;
};

const TranscriptPanel = memo(function TranscriptPanel({
  autoScroll,
  onToggleAutoScroll,
  isExpanded,
  onToggleExpanded,
  onClose,
  isListening,
  transcript,
  languageLabel,
}: TranscriptPanelProps) {
  return (
    <div className="glass-strong rounded-2xl floating-shadow overflow-hidden animate-fade-in w-[350px] shrink-0 pointer-events-auto">
      <div className="flex items-center justify-between px-3 py-2 bg-muted/30">
        <div className="flex items-center gap-4">
          <label className="flex items-center gap-2.5 cursor-pointer">
            <button
              type="button"
              role="switch"
              aria-checked={autoScroll}
              onClick={onToggleAutoScroll}
              className={cn(
                "relative inline-flex h-5 w-10 flex-shrink-0 rounded-full transition-colors",
                autoScroll ? "bg-primary" : "bg-muted-foreground/30",
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform",
                  "absolute top-0.5",
                  autoScroll ? "translate-x-5" : "translate-x-0.5",
                )}
              />
            </button>
            <span className="text-sm font-medium text-foreground">Auto-scroll</span>
          </label>
          <span className="text-sm text-muted-foreground">{languageLabel}</span>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Clear transcript"
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onToggleExpanded}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
          >
            <ChevronUp className={cn("w-4 h-4 transition-transform", !isExpanded && "rotate-180")} />
          </button>
          <button
            onClick={onClose}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      {isExpanded ? (
        <div className="p-3">
          <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/40 border border-border/50">
            <span className={cn("text-sm", isListening ? "text-muted-foreground" : "text-muted-foreground/50")}>
              {isListening ? "Listening..." : "Listening off"}
            </span>
            <div className="flex-1" />
          </div>

          {/* Max height tied to viewport to keep desktop floating windows safe */}
          <div className="mt-3 max-h-[60vh] overflow-y-auto space-y-3 custom-scrollbar scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/40">
            {transcript.map((item, idx) => (
              <div key={idx} className="space-y-1">
                <div className="flex items-center gap-2 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/70">{item.speaker}</span>
                  <span>·</span>
                  <span>{item.time}</span>
                </div>
                <p className="text-sm text-foreground leading-relaxed">{item.text}</p>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="px-4 py-3 cursor-pointer hover:bg-muted/20 transition-colors" onClick={onToggleExpanded}>
          <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/40 border border-border/50">
            <span className={cn("text-sm", isListening ? "text-muted-foreground" : "text-muted-foreground/50")}>
              {isListening ? "Listening..." : "Listening off"}
            </span>
          </div>
        </div>
      )}
    </div>
  );
});

type OutputPanelProps = {
  outputHistory: OutputItem[];
  currentOutputIndex: number;
  onNavigateHistory: (direction: "left" | "right") => void;
  onDeleteCurrent: () => void;
  onClearAll: () => void;
};

const OutputPanel = memo(function OutputPanel({
  outputHistory,
  currentOutputIndex,
  onNavigateHistory,
  onDeleteCurrent,
  onClearAll,
}: OutputPanelProps) {
  const panelRef = useRef<HTMLDivElement | null>(null);
  const resizingRef = useRef(false);
  const startStateRef = useRef({ x: 0, y: 0, width: 480, height: 320 });
  const sizeRef = useRef<{ width: number; height?: number }>({ width: 480 });
  const [size, setSize] = useState<{ width: number; height?: number }>({ width: 480 });
  const moveHandlerRef = useRef<(event: MouseEvent) => void>();
  const upHandlerRef = useRef<(event: MouseEvent) => void>();

  useEffect(() => {
    return () => {
      if (moveHandlerRef.current) {
        window.removeEventListener("mousemove", moveHandlerRef.current);
      }
      if (upHandlerRef.current) {
        window.removeEventListener("mouseup", upHandlerRef.current);
      }
    };
  }, []);

  useEffect(() => {
    sizeRef.current = size;
  }, [size]);

  const handleResizeStart = useCallback((event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (!panelRef.current) return;

    const currentSize = sizeRef.current;
    const currentHeight = currentSize.height ?? panelRef.current.offsetHeight ?? startStateRef.current.height;

    startStateRef.current = {
      x: event.clientX,
      y: event.clientY,
      width: currentSize.width,
      height: currentHeight,
    };
    resizingRef.current = true;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      if (!resizingRef.current) return;

      const deltaX = moveEvent.clientX - startStateRef.current.x;
      const deltaY = moveEvent.clientY - startStateRef.current.y;

      const nextWidth = Math.max(360, startStateRef.current.width + deltaX);
      const nextHeight = Math.max(240, startStateRef.current.height + deltaY);

      setSize((prev) => {
        if (prev.width === nextWidth && prev.height === nextHeight) {
          return prev;
        }
        const next = { width: nextWidth, height: nextHeight };
        sizeRef.current = next;
        return next;
      });
    };

    const handleMouseUp = () => {
      resizingRef.current = false;
      if (moveHandlerRef.current) {
        window.removeEventListener("mousemove", moveHandlerRef.current);
      }
      if (upHandlerRef.current) {
        window.removeEventListener("mouseup", upHandlerRef.current);
      }
    };

    moveHandlerRef.current = handleMouseMove;
    upHandlerRef.current = handleMouseUp;

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  }, []);

  const panelStyle = useMemo(() => {
    // Inline width/height keeps resizing scoped to this panel only
    return {
      width: `${size.width}px`,
      ...(size.height ? { height: `${size.height}px` } : {}),
    };
  }, [size]);

  const currentOutput = outputHistory[currentOutputIndex];

  return (
    <div
      ref={panelRef}
      style={panelStyle}
      className="glass-strong rounded-2xl floating-shadow overflow-hidden animate-fade-in shrink-0 flex flex-col relative pointer-events-auto min-w-[360px] min-h-[240px]"
    >
      <div className="flex items-center justify-between shrink-0 px-3 py-2 bg-muted/30">
        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onNavigateHistory("left")}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            disabled={outputHistory.length <= 1}
          >
            <ChevronLeft className="w-4 h-4" />
          </button>
          <span className="text-xs text-muted-foreground px-2">
            {currentOutputIndex + 1} / {outputHistory.length}
          </span>
          <button
            onClick={() => onNavigateHistory("right")}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            disabled={outputHistory.length <= 1}
          >
            <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="flex items-center gap-1.5">
          <button
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60 text-muted-foreground hover:text-foreground hover:bg-muted transition-colors"
            title="Delete answer"
            onClick={onDeleteCurrent}
          >
            <Trash2 className="w-4 h-4" />
          </button>
          <button
            onClick={onClearAll}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60 text-muted-foreground hover:text-destructive hover:bg-destructive/10 transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      </div>

      <div className="flex-1 p-4 overflow-y-auto min-h-0 custom-scrollbar space-y-4 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-muted-foreground/40">
        {currentOutput && currentOutput.type === "ai" && (
          <>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center mt-0.5">
                <div className="w-2 h-2 rounded-full bg-primary" />
              </div>
              <div>
                <span className="text-sm font-medium text-foreground">Question: </span>
                <span className="text-sm text-foreground">{currentOutput.question}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium text-foreground">Answer:</span>
              </div>
              <ul className="space-y-1.5 pl-6">
                {Array.isArray(currentOutput.answer) ? (
                  currentOutput.answer.map((point, idx) => (
                    <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                      <span className="text-foreground mt-1.5">•</span>
                      <span>{point}</span>
                    </li>
                  ))
                ) : (
                  <li className="flex items-start gap-2 text-sm text-foreground">
                    <span className="text-foreground mt-1.5">•</span>
                    <span>{currentOutput.answer}</span>
                  </li>
                )}
              </ul>
            </div>

            <div className="pt-2 text-xs text-muted-foreground">AI Answer · {currentOutput.timestamp}</div>
          </>
        )}

        {currentOutput && currentOutput.type === "chat" && (
          <>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-green-500/20 flex items-center justify-center mt-0.5">
                <MessageSquare className="w-2.5 h-2.5 text-green-400" />
              </div>
              <div>
                <span className="text-sm font-medium text-foreground">Question: </span>
                <span className="text-sm text-foreground">{currentOutput.question}</span>
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                <span className="text-sm font-medium text-foreground">Answer:</span>
              </div>
              <p className="text-sm text-foreground pl-6 leading-relaxed">
                {Array.isArray(currentOutput.answer) ? currentOutput.answer.join(" ") : currentOutput.answer}
              </p>
            </div>

            <div className="pt-2 text-xs text-muted-foreground">Chat Response · {currentOutput.timestamp}</div>
          </>
        )}

        {currentOutput && currentOutput.type === "screen" && (
          <>
            <div className="flex items-start gap-2">
              <div className="w-4 h-4 rounded-full bg-blue-500/20 flex items-center justify-center mt-0.5">
                <Monitor className="w-2.5 h-2.5 text-blue-400" />
              </div>
              <div>
                <span className="text-sm font-medium text-foreground">Screen Analysis</span>
              </div>
            </div>

            <div className="mt-3 p-4 rounded-lg bg-muted/30 border border-border/50">
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <Monitor className="w-8 h-8 text-muted-foreground/50 mb-2" />
                <span className="text-sm text-muted-foreground">Capture and analyze your screen content</span>
                <p className="text-xs text-muted-foreground/70 mt-1">Click &quot;Analyze Screen&quot; to capture</p>
              </div>
            </div>

            <div className="pt-2 text-xs text-muted-foreground">Screen Analysis · {currentOutput.timestamp}</div>
          </>
        )}
      </div>

      <div
        onMouseDown={handleResizeStart}
        className="absolute bottom-1 right-1 w-4 h-4 cursor-nwse-resize opacity-40 hover:opacity-80 transition"
      >
        <svg viewBox="0 0 16 16" className="w-full h-full text-muted-foreground">
          <path d="M2 14h12v-2H2v2zm4-4h8V8H6v2zm4-4h4V4h-4v2z" fill="currentColor" />
        </svg>
      </div>
    </div>
  );
});

export default function ActiveSessionPage() {
  const navigate = useNavigate();

  const [autoScroll, setAutoScroll] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);
  const [showTranscript, setShowTranscript] = useState(true);
  const [showAIAnswer, setShowAIAnswer] = useState(false);
  const [showAnalyzeScreen, setShowAnalyzeScreen] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const [transcribeEnabled, setTranscribeEnabled] = useState(true);
  const [computerAudioEnabled, setComputerAudioEnabled] = useState(true);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(true);

  const [showMoreMenu, setShowMoreMenu] = useState(false);
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [selectedLanguage] = useState("English");
  const [showEndSessionDialog, setShowEndSessionDialog] = useState(false);

  const [showChatInput, setShowChatInput] = useState(false);
  const [chatMessage, setChatMessage] = useState("");

  const [outputHistory, setOutputHistory] = useState<OutputItem[]>([]);
  const [currentOutputIndex, setCurrentOutputIndex] = useState(0);

  const isListening = computerAudioEnabled || microphoneEnabled;

  const addToHistory = useCallback((item: OutputItem) => {
    setOutputHistory((prev) => {
      const next = [...prev, item];
      setCurrentOutputIndex(next.length - 1);
      return next;
    });
  }, []);

  const handleToggleAIAnswer = useCallback(() => {
    setShowAIAnswer((prev) => {
      const next = !prev;
      if (!prev) {
        addToHistory({
          type: "ai",
          question: MOCK_AI_ANSWER.question,
          answer: MOCK_AI_ANSWER.answer,
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        });
      }
      return next;
    });
  }, [addToHistory]);

  const handleToggleAnalyzeScreen = useCallback(() => {
    setShowAnalyzeScreen((prev) => {
      const next = !prev;
      if (!prev) {
        addToHistory({
          type: "screen",
          question: "Screen Analysis",
          answer: "Capture and analyze your screen content",
          timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
        });
      }
      return next;
    });
  }, [addToHistory]);

  const handleNavigateHistory = useCallback(
    (direction: "left" | "right") => {
      setCurrentOutputIndex((prev) => {
        if (outputHistory.length === 0) return 0;
        const lastIndex = outputHistory.length - 1;
        if (direction === "left") {
          return prev > 0 ? prev - 1 : lastIndex;
        }
        return prev < lastIndex ? prev + 1 : 0;
      });
    },
    [outputHistory],
  );

  const handleDeleteCurrentOutput = useCallback(() => {
    setOutputHistory((prev) => {
      if (prev.length === 0) return prev;
      const filtered = prev.filter((_, index) => index !== currentOutputIndex);
      const nextIndex = filtered.length === 0 ? 0 : Math.min(currentOutputIndex, filtered.length - 1);
      setCurrentOutputIndex(nextIndex);
      return filtered;
    });
  }, [currentOutputIndex]);

  const handleClearOutputHistory = useCallback(() => {
    setOutputHistory([]);
    setCurrentOutputIndex(0);
    setShowAIAnswer(false);
    setShowAnalyzeScreen(false);
    setShowChat(false);
  }, []);

  const handleTranscribeToggle = useCallback(() => {
    setShowTranscript((prev) => !prev);
  }, []);

  const handleComputerAudioToggle = useCallback(() => {
    setComputerAudioEnabled((prev) => {
      const next = !prev;
      if (!next && !microphoneEnabled) {
        setTranscribeEnabled(false);
      }
      return next;
    });
  }, [microphoneEnabled]);

  const handleMicrophoneToggle = useCallback(() => {
    setMicrophoneEnabled((prev) => {
      const next = !prev;
      if (!next && !computerAudioEnabled) {
        setTranscribeEnabled(false);
      }
      return next;
    });
  }, [computerAudioEnabled]);

  const handleAutoScrollToggle = useCallback(() => {
    setAutoScroll((prev) => !prev);
  }, []);

  const handleTranscriptExpandToggle = useCallback(() => {
    setIsExpanded((prev) => !prev);
  }, []);

  const handleTranscriptClose = useCallback(() => {
    setShowTranscript(false);
  }, []);

  const handleOpenChatInput = useCallback(() => {
    setShowChatInput(true);
  }, []);

  const handleCancelChatInput = useCallback(() => {
    setShowChatInput(false);
    setChatMessage("");
  }, []);

  const handleChatMessageChange = useCallback((value: string) => {
    setChatMessage(value);
  }, []);

  const submitChatMessage = useCallback(() => {
    const trimmed = chatMessage.trim();
    if (!trimmed) return;
    addToHistory({
      type: "chat",
      question: trimmed,
      answer:
        "This is a simulated AI response to your question. In a real implementation, this would call the AI API and return an actual response based on your message.",
      timestamp: new Date().toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" }),
    });
    setChatMessage("");
    setShowChatInput(false);
    setShowChat(true);
  }, [chatMessage, addToHistory]);

  const handleChatInputKeyDown = useCallback(
    (event: KeyboardEvent<HTMLInputElement>) => {
      if (event.key === "Enter") {
        event.preventDefault();
        submitChatMessage();
      }
    },
    [submitChatMessage],
  );

  const handleToggleMoreMenu = useCallback(() => {
    setShowMoreMenu((prev) => !prev);
  }, []);

  const handleCloseMoreMenu = useCallback(() => {
    setShowMoreMenu(false);
  }, []);

  const handleNavigateDashboard = useCallback(() => {
    navigate("/dashboard");
    setShowMoreMenu(false);
  }, [navigate]);

  const handleToggleAutoGenerate = useCallback(() => {
    setAutoGenerate((prev) => !prev);
  }, []);

  const handleMinimize = useCallback(() => {
    setIsMinimized(true);
  }, []);

  const handleRequestEndSession = useCallback(() => {
    setShowEndSessionDialog(true);
    setShowMoreMenu(false);
  }, []);

  useEffect(() => {
    requestAnimationFrame(() => {
      window.dispatchEvent(new Event("resize"));
    });
  }, [showTranscript, showAIAnswer, showAnalyzeScreen, outputHistory.length]);

  const currentOutput = useMemo(() => outputHistory[currentOutputIndex], [outputHistory, currentOutputIndex]);

  if (isMinimized) {
    return <MinimizedIcon onRestore={() => setIsMinimized(false)} variant="transcribe" isListening={isListening} />;
  }

  return (
    <div className="h-full w-full flex flex-col overflow-hidden bg-transparent">
      <TopBar
        showTranscript={showTranscript}
        onToggleTranscript={handleTranscribeToggle}
        computerAudioEnabled={computerAudioEnabled}
        onToggleComputerAudio={handleComputerAudioToggle}
        microphoneEnabled={microphoneEnabled}
        onToggleMicrophone={handleMicrophoneToggle}
        showAIAnswer={showAIAnswer}
        onToggleAIAnswer={handleToggleAIAnswer}
        showAnalyzeScreen={showAnalyzeScreen}
        onToggleAnalyzeScreen={handleToggleAnalyzeScreen}
        showChatInput={showChatInput}
        onOpenChatInput={handleOpenChatInput}
        onCancelChatInput={handleCancelChatInput}
        chatMessage={chatMessage}
        onChatMessageChange={handleChatMessageChange}
        onChatInputKeyDown={handleChatInputKeyDown}
        onSubmitChat={submitChatMessage}
        showMoreMenu={showMoreMenu}
        onToggleMoreMenu={handleToggleMoreMenu}
        onCloseMoreMenu={handleCloseMoreMenu}
        onNavigateDashboard={handleNavigateDashboard}
        autoGenerate={autoGenerate}
        onToggleAutoGenerate={handleToggleAutoGenerate}
        selectedLanguage={selectedLanguage}
        mockTime={MOCK_TIME}
        onMinimize={handleMinimize}
        onRequestEndSession={handleRequestEndSession}
        isListening={isListening}
      />

      {/* flex-nowrap prevents wrapping so panels resize independently */}
      <div
        data-active-session-layout
        className="relative z-0 flex-1 flex flex-row flex-nowrap items-start justify-start gap-4 p-4 w-full overflow-visible bg-transparent pointer-events-none"
      >
        {showTranscript && (
          <TranscriptPanel
            autoScroll={autoScroll}
            onToggleAutoScroll={handleAutoScrollToggle}
            isExpanded={isExpanded}
            onToggleExpanded={handleTranscriptExpandToggle}
            onClose={handleTranscriptClose}
            isListening={isListening}
            transcript={MOCK_TRANSCRIPT}
            languageLabel={selectedLanguage}
          />
        )}

        {outputHistory.length > 0 && currentOutput && (
          <OutputPanel
            outputHistory={outputHistory}
            currentOutputIndex={currentOutputIndex}
            onNavigateHistory={handleNavigateHistory}
            onDeleteCurrent={handleDeleteCurrentOutput}
            onClearAll={handleClearOutputHistory}
          />
        )}
      </div>

      {/* End Session Confirmation Dialog */}
      <AlertDialog open={showEndSessionDialog} onOpenChange={setShowEndSessionDialog}>
        <AlertDialogContent className="max-w-md">
          <AlertDialogHeader>
            <AlertDialogTitle>End Session</AlertDialogTitle>
            <AlertDialogDescription>
              Are you sure you want to end the session? You won&apos;t be able to restart it and your credits will be
              lost.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Close</AlertDialogCancel>
            <AlertDialogAction
              onClick={() => navigate("/dashboard")}
              className="bg-foreground text-background hover:bg-foreground/90"
            >
              End Session
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}
