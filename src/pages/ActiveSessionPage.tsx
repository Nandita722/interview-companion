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
  Mic,
  Star,
} from "lucide-react";
import { cn } from "@/lib/utils";

export default function ActiveSessionPage() {
  const navigate = useNavigate();
  const [autoScroll, setAutoScroll] = useState(true);
  const [isExpanded, setIsExpanded] = useState(true);
  const [showTranscript, setShowTranscript] = useState(true);
  const [showAIAnswer, setShowAIAnswer] = useState(false);
  const [showAnalyzeScreen, setShowAnalyzeScreen] = useState(false);
  const [showChat, setShowChat] = useState(false);
  
  // Recording controls
  const [transcribeEnabled, setTranscribeEnabled] = useState(true);
  const [computerAudioEnabled, setComputerAudioEnabled] = useState(true);
  const [microphoneEnabled, setMicrophoneEnabled] = useState(true);

  const mockTime = "9:43";
  const mockTranscript = [
    { time: "08:21 AM", speaker: "Client 1", text: "But I think." },
    { time: "08:21 AM", speaker: "Client 1", text: "Multiple requests or requests." },
    { time: "08:22 AM", speaker: "Client 1", text: "Do timeout." },
    { time: "08:22 AM", speaker: "Client 1", text: "Response. Timeout." },
    { time: "08:22 AM", speaker: "Client 1", text: "Or. Long polling." },
    { time: "08:22 AM", speaker: "Client 1", text: "Long polling. I think." },
  ];

  const mockAIAnswer = {
    question: "What programming language do you know?",
    answer: [
      "I know JavaScript.",
      "I am comfortable using JavaScript for web development and scripting.",
      "I can write code to create interactive web pages and handle client-side logic.",
      "I am familiar with JavaScript basics like variables, functions, loops, and events.",
      "I can also work with JavaScript frameworks and libraries if needed.",
    ],
  };

  const handleClose = () => {
    navigate("/dashboard");
  };

  // If both audio sources are disabled, transcribe is also disabled
  const isListening = transcribeEnabled && (computerAudioEnabled || microphoneEnabled);

  // Handle transcribe toggle - show/hide the transcript panel
  const handleTranscribeToggle = () => {
    setShowTranscript(!showTranscript);
  };

  // When audio sources change, auto-disable transcribe if both are off
  const handleComputerAudioToggle = () => {
    const newValue = !computerAudioEnabled;
    setComputerAudioEnabled(newValue);
    if (!newValue && !microphoneEnabled) {
      setTranscribeEnabled(false);
    }
  };

  const handleMicrophoneToggle = () => {
    const newValue = !microphoneEnabled;
    setMicrophoneEnabled(newValue);
    if (!newValue && !computerAudioEnabled) {
      setTranscribeEnabled(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      {/* Top Action Bar - Full width, auto-fit content */}
      <div className="w-full glass-strong backdrop-blur-sm border-b border-border/30">
        <div className="flex items-center gap-1.5 px-2.5 py-2 w-fit mx-auto">
          {/* All buttons in one row, width auto-fits */}
          {/* Transcribe Button */}
          <button
            onClick={handleTranscribeToggle}
            className={cn(
              "relative flex items-center justify-center w-9 h-9 rounded-lg transition-all",
              transcribeEnabled && isListening
                ? "bg-green-500/20"
                : "bg-muted/60 hover:bg-muted"
            )}
            title="Toggle Transcript"
          >
            {/* Audio wave icon */}
            <div className="flex items-center gap-0.5 h-4">
              <div className={cn(
                "w-0.5 rounded-full transition-all",
                showTranscript && isListening ? "bg-green-400 h-2 animate-pulse" : "bg-muted-foreground h-2"
              )} />
              <div className={cn(
                "w-0.5 rounded-full transition-all",
                showTranscript && isListening ? "bg-green-400 h-4 animate-pulse" : "bg-muted-foreground h-3"
              )} style={{ animationDelay: "0.1s" }} />
              <div className={cn(
                "w-0.5 rounded-full transition-all",
                showTranscript && isListening ? "bg-green-400 h-3 animate-pulse" : "bg-muted-foreground h-2"
              )} style={{ animationDelay: "0.2s" }} />
              <div className={cn(
                "w-0.5 rounded-full transition-all",
                showTranscript && isListening ? "bg-green-400 h-4 animate-pulse" : "bg-muted-foreground h-3"
              )} style={{ animationDelay: "0.3s" }} />
              <div className={cn(
                "w-0.5 rounded-full transition-all",
                showTranscript && isListening ? "bg-green-400 h-2 animate-pulse" : "bg-muted-foreground h-2"
              )} style={{ animationDelay: "0.4s" }} />
            </div>
          </button>

          {/* Computer Audio Button */}
          <button
            onClick={handleComputerAudioToggle}
            className={cn(
              "flex items-center justify-center w-9 h-9 rounded-lg transition-all",
              computerAudioEnabled
                ? "bg-orange-500/20 text-orange-400"
                : "bg-muted/60 text-muted-foreground hover:bg-muted"
            )}
            title="Computer audio capture"
          >
            <Monitor className="w-4 h-4" />
          </button>

          {/* Microphone Button */}
          <button
            onClick={handleMicrophoneToggle}
            className={cn(
              "flex items-center justify-center w-9 h-9 rounded-lg transition-all",
              microphoneEnabled
                ? "bg-yellow-500/20 text-yellow-400"
                : "bg-muted/60 text-muted-foreground hover:bg-muted"
            )}
            title="Microphone capture"
          >
            <Mic className="w-4 h-4" />
          </button>

          {/* Separator */}
          <div className="w-px h-6 bg-border/50 mx-1" />

          {/* AI Answer Button */}
          <button
            onClick={() => {
              setShowAIAnswer(!showAIAnswer);
              if (!showAIAnswer) {
                setShowAnalyzeScreen(false);
                setShowChat(false);
              }
            }}
            className={cn(
              "flex items-center gap-1.5 h-8 px-3 rounded-full text-sm font-medium transition-all",
              showAIAnswer
                ? "bg-primary/20 text-primary"
                : "bg-muted/60 hover:bg-muted text-foreground"
            )}
          >
            AI Answer
            <Sparkles className="w-3.5 h-3.5" />
          </button>

          {/* Analyze Screen Button */}
          <button
            onClick={() => {
              setShowAnalyzeScreen(!showAnalyzeScreen);
              if (!showAnalyzeScreen) {
                setShowAIAnswer(false);
                setShowChat(false);
              }
            }}
            className={cn(
              "flex items-center gap-1.5 h-8 px-3 rounded-full text-sm font-medium transition-all",
              showAnalyzeScreen
                ? "bg-primary/20 text-primary"
                : "bg-muted/60 hover:bg-muted text-foreground"
            )}
          >
            Analyze Screen
            <Monitor className="w-3.5 h-3.5" />
          </button>

          {/* Chat Button */}
          <button
            onClick={() => {
              setShowChat(!showChat);
              if (!showChat) {
                setShowAIAnswer(false);
                setShowAnalyzeScreen(false);
              }
            }}
            className={cn(
              "flex items-center h-8 px-4 rounded-full text-sm font-medium transition-all border",
              showChat
                ? "bg-primary/20 text-primary border-primary/50"
                : "bg-muted/60 hover:bg-muted text-foreground border-transparent"
            )}
          >
            Chat
          </button>

          {/* Spacer */}
          <div className="flex-1" />

          {/* Timer */}
          <div className="flex items-center gap-1.5 h-8 px-2.5 rounded-lg bg-muted/60 text-sm font-mono text-foreground">
            <div className="w-4 h-4 rounded bg-foreground/80 flex items-center justify-center">
              <div className="w-2 h-2 rounded-sm bg-muted" />
            </div>
            <span>{mockTime}</span>
          </div>

          {/* More Menu */}
          <button className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60 text-foreground hover:bg-muted transition-colors">
            <MoreVertical className="w-4 h-4" />
          </button>

          {/* Move Handle */}
          <button className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60 text-foreground hover:bg-muted transition-colors cursor-grab">
            <Move className="w-4 h-4" />
          </button>

          {/* Collapse Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="flex items-center justify-center w-8 h-8 rounded-lg bg-muted/60 text-foreground hover:bg-muted transition-colors"
          >
            <ChevronUp className={cn("w-4 h-4 transition-transform", !isExpanded && "rotate-180")} />
          </button>
        </div>
      </div>

      {/* Main Content Container - Only show if transcript or any panel is visible */}
      {(showTranscript || showAIAnswer || showAnalyzeScreen || showChat) && (
      <div className="flex-1 flex items-start justify-center p-4">
        <div className={cn(
          "glass-strong rounded-2xl floating-shadow overflow-hidden animate-fade-in transition-all duration-300",
          showAIAnswer || showAnalyzeScreen || showChat 
            ? "w-full max-w-[95vw] lg:max-w-[900px]" 
            : "w-full max-w-[95vw] sm:max-w-[520px]"
        )}>
        
        {/* Status Bar */}
        <div className="flex items-center justify-between px-3 py-2 bg-muted/30 border-t border-border/30">
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
          <div className={cn(
            "flex",
            (showAIAnswer || showAnalyzeScreen || showChat) && "divide-x divide-border/30"
          )}>
            {/* Transcript Panel - Visible when showTranscript is true */}
            {showTranscript && (
            <div className={cn(
              "p-3 flex-1 min-w-0",
              (showAIAnswer || showAnalyzeScreen || showChat) ? "w-1/2" : "w-full"
            )}>
              {/* Listening Input Bar */}
              <div className="flex items-center gap-2 px-4 py-3 rounded-xl bg-muted/40 border border-border/50">
                <span className={cn(
                  "text-sm",
                  isListening ? "text-muted-foreground" : "text-muted-foreground/50"
                )}>
                  {isListening ? "Listening..." : "Listening off"}
                </span>
                <div className="flex-1" />
              </div>

              {/* Transcript Content */}
              <div className="mt-3 max-h-[280px] overflow-y-auto custom-scrollbar space-y-3">
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
            </div>
            )}

            {/* AI Answer Panel */}
            {showAIAnswer && (
              <div className="w-1/2 p-4 max-h-[340px] overflow-y-auto custom-scrollbar animate-fade-in">
                <div className="space-y-4">
                  {/* Question */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <div className="w-4 h-4 rounded-full bg-primary/20 flex items-center justify-center">
                        <div className="w-2 h-2 rounded-full bg-primary" />
                      </div>
                      <span className="text-sm font-medium text-foreground">Question:</span>
                      <span className="text-sm text-foreground">{mockAIAnswer.question}</span>
                    </div>
                  </div>

                  {/* Answer */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-2">
                      <Star className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                      <span className="text-sm font-medium text-foreground">Answer:</span>
                    </div>
                    <ul className="space-y-1.5 pl-6">
                      {mockAIAnswer.answer.map((point, idx) => (
                        <li key={idx} className="flex items-start gap-2 text-sm text-foreground">
                          <span className="text-foreground mt-1.5">•</span>
                          <span>{point}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div className="pt-2 text-xs text-muted-foreground">
                    AI Answer · 04:21 AM
                  </div>
                </div>
              </div>
            )}

            {/* Analyze Screen Panel */}
            {showAnalyzeScreen && (
              <div className="w-1/2 p-4 max-h-[340px] overflow-y-auto custom-scrollbar animate-fade-in">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Monitor className="w-10 h-10 text-muted-foreground/50 mb-3" />
                  <span className="text-sm text-muted-foreground">Screen Analysis</span>
                  <p className="text-xs text-muted-foreground/70 mt-1 max-w-[200px]">
                    Capture and analyze your screen content
                  </p>
                </div>
              </div>
            )}

            {/* Chat Panel */}
            {showChat && (
              <div className="w-1/2 p-4 max-h-[340px] overflow-y-auto custom-scrollbar animate-fade-in">
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <Sparkles className="w-10 h-10 text-muted-foreground/50 mb-3" />
                  <span className="text-sm text-muted-foreground">Chat with AI</span>
                  <p className="text-xs text-muted-foreground/70 mt-1 max-w-[200px]">
                    Ask follow-up questions or get clarifications
                  </p>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Collapsed State */}
        {!isExpanded && (
          <div 
            className="px-4 py-3 cursor-pointer hover:bg-muted/20 transition-colors"
            onClick={() => setIsExpanded(true)}
          >
            <div className="flex items-center gap-2 px-4 py-2 rounded-xl bg-muted/40 border border-border/50">
              <span className={cn(
                "text-sm",
                isListening ? "text-muted-foreground" : "text-muted-foreground/50"
              )}>
                {isListening ? "Listening..." : "Listening off"}
              </span>
            </div>
          </div>
        )}
        </div>
      </div>
      )}
    </div>
  );
}
