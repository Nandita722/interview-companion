import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Upload, Sparkles, ChevronDown, Info } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import {
  FloatingWindow,
  TitleBar,
  FormTextarea,
  ToggleSwitch,
  ActionButton,
  MinimizedIcon,
} from "@/components/floating";
import { cn } from "@/lib/utils";

export default function CreateSessionStep2() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("english");
  const [simpleLanguage, setSimpleLanguage] = useState(false);
  const [extraContext, setExtraContext] = useState("");
  const [aiModel, setAiModel] = useState("gpt-4-mini");
  const [autoGenerate, setAutoGenerate] = useState(true);
  const [saveTranscript, setSaveTranscript] = useState(true);
  const [isMinimized, setIsMinimized] = useState(false);

  const credits = 0;

  const handleBack = () => {
    navigate("/create-session/step1");
  };

  const handleCreateFreeSession = () => {
    navigate("/create-session/activate");
  };

  const handleCreatePaidSession = () => {
    // Would start paid session directly
    navigate("/session");
  };

  if (isMinimized) {
    return <MinimizedIcon onRestore={() => setIsMinimized(false)} />;
  }

  return (
    <TooltipProvider delayDuration={200}>
      <FloatingWindow width="medium">
        <TitleBar credits={credits} onMinimize={() => setIsMinimized(true)} />

        {/* Header */}
        <div className="px-4 pt-4 pb-2">
          <h2 className="text-lg font-semibold text-foreground">Create Session</h2>
          <p className="text-xs text-muted-foreground">Step 2 of 2 · AI Configuration</p>
        </div>

        {/* Form */}
        <div className="p-4 space-y-4 max-h-[360px] overflow-y-auto custom-scrollbar">
          {/* Language Selector */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Language
              </label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[220px]">
                  <p className="text-xs">Select the language that will be used during the interview for transcription and AI responses.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <select
                value={language}
                onChange={(e) => setLanguage(e.target.value)}
                className="w-full px-3 py-2.5 pr-8 rounded-lg text-sm bg-input border border-border text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <option value="english">English</option>
                <option value="spanish">Spanish</option>
                <option value="french">French</option>
                <option value="german">German</option>
                <option value="chinese">Chinese</option>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Simple Language Toggle */}
          <div className="flex items-center justify-between gap-3 py-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-foreground">Simple Language</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[260px]">
                    <p className="text-xs">If English is not your first language, enable this to get simpler vocabulary and clearer explanations in AI responses.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Use simpler vocabulary if English is not your first language</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={simpleLanguage}
              onClick={() => setSimpleLanguage(!simpleLanguage)}
              className={cn(
                "relative inline-flex h-5 w-9 flex-shrink-0 rounded-full transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                simpleLanguage ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform",
                  "absolute top-0.5",
                  simpleLanguage ? "translate-x-4" : "translate-x-0.5"
                )}
              />
            </button>
          </div>

          {/* Extra Context */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Extra Context / Instructions
              </label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[240px]">
                  <p className="text-xs">Add any specific instructions for the AI, like "be more technical" or "use a casual tone".</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <textarea
              placeholder="Be more technical, use a casual tone..."
              rows={3}
              value={extraContext}
              onChange={(e) => setExtraContext(e.target.value)}
              className="w-full px-3 py-2.5 rounded-lg text-sm bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {/* Resume Upload */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                Resume (Optional)
              </label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[240px]">
                  <p className="text-xs">Upload your resume so the AI can reference your experience when generating responses.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <button className="w-full flex items-center justify-center gap-2 p-4 rounded-lg border border-dashed border-border hover:border-muted-foreground/50 transition-colors">
              <Upload className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm text-muted-foreground">Upload Resume</span>
            </button>
          </div>

          {/* AI Model Selector */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                AI Model
              </label>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[260px]">
                  <p className="text-xs">Select the AI model for generating interview responses. Faster models are recommended for real-time use.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <select
                value={aiModel}
                onChange={(e) => setAiModel(e.target.value)}
                className="w-full px-3 py-2.5 pr-8 rounded-lg text-sm bg-input border border-border text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring"
              >
                <optgroup label="Recommended">
                  <option value="gpt-4-mini">GPT-4.1 Mini (Fast)</option>
                  <option value="gemini-flash">Gemini 2.5 Flash (Balanced)</option>
                </optgroup>
                <optgroup label="Powerful">
                  <option value="gpt-4">GPT-4.1 (Powerful)</option>
                  <option value="gemini-pro">Gemini 2.5 Pro (Advanced)</option>
                  <option value="claude-sonnet">Claude Sonnet (Intelligent)</option>
                </optgroup>
                <optgroup label="Budget">
                  <option value="gpt-4-nano">GPT-4.1 Nano (Economy)</option>
                  <option value="gemini-lite">Gemini 2.5 Flash Lite (Fast)</option>
                </optgroup>
              </select>
              <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
            </div>
          </div>

          {/* Auto Generate Toggle */}
          <div className="flex items-center justify-between gap-3 py-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-foreground">Auto Generate AI Response</span>
                <span className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-primary/20 text-primary uppercase">
                  New
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[280px]">
                    <p className="text-xs">If you check this option, the AI will automatically detect when the interviewer asks you a question and generate a response. If you don't check this option, you will need to click the "AI Answer" button to generate a response.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Automatically detect questions and generate answers</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={autoGenerate}
              onClick={() => setAutoGenerate(!autoGenerate)}
              className={cn(
                "relative inline-flex h-5 w-9 flex-shrink-0 rounded-full transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                autoGenerate ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform",
                  "absolute top-0.5",
                  autoGenerate ? "translate-x-4" : "translate-x-0.5"
                )}
              />
            </button>
          </div>

          {/* Save Transcript Toggle */}
          <div className="flex items-center justify-between gap-3 py-2">
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5">
                <span className="text-sm font-medium text-foreground">Save Transcript</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-muted-foreground hover:text-foreground cursor-help transition-colors" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[260px]">
                    <p className="text-xs">Enable this to save a full transcript of your session for later review. The transcript will be stored securely.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <p className="text-xs text-muted-foreground mt-0.5">Store session transcript for later review</p>
            </div>
            <button
              type="button"
              role="switch"
              aria-checked={saveTranscript}
              onClick={() => setSaveTranscript(!saveTranscript)}
              className={cn(
                "relative inline-flex h-5 w-9 flex-shrink-0 rounded-full transition-colors",
                "focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 focus:ring-offset-background",
                saveTranscript ? "bg-primary" : "bg-muted"
              )}
            >
              <span
                className={cn(
                  "pointer-events-none inline-block h-4 w-4 transform rounded-full bg-white shadow-sm transition-transform",
                  "absolute top-0.5",
                  saveTranscript ? "translate-x-4" : "translate-x-0.5"
                )}
              />
            </button>
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
          <div className="flex gap-2">
            <ActionButton
              variant="primary"
              onClick={handleCreateFreeSession}
              icon={<Sparkles className="w-4 h-4" />}
            >
              Create Free Session
            </ActionButton>
            <ActionButton
              variant="outline"
              onClick={handleCreatePaidSession}
              disabled={credits === 0}
            >
              Create Paid Session
            </ActionButton>
          </div>
        </div>
      </FloatingWindow>
    </TooltipProvider>
  );
}
