import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Sparkles, ChevronDown, Info, BookOpen, Bot } from "lucide-react";
import {
  FloatingWindow,
  TitleBar,
  TabNavigation,
  ActionButton,
} from "@/components/floating";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export default function CreateSessionStep2() {
  const navigate = useNavigate();
  const [language, setLanguage] = useState("english");
  const [simpleLanguage, setSimpleLanguage] = useState(false);
  const [extraContext, setExtraContext] = useState("");
  const [aiModel, setAiModel] = useState("gpt-4-mini");
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [saveTranscript, setSaveTranscript] = useState(true);

  const credits = 0;

  const handleBack = () => {
    navigate("/create-session/step1");
  };

  const handleCreateFreeSession = () => {
    navigate("/create-session/activate");
  };

  const handleCreatePaidSession = () => {
    navigate("/session");
  };

  return (
    <TooltipProvider delayDuration={200}>
      <FloatingWindow width="medium">
        <TitleBar credits={credits} />
        
        {/* Tab Navigation */}
        <TabNavigation
          tabs={[
            { id: "create", label: "Create" },
            { id: "past", label: "Past Sessions" },
          ]}
          activeTab="create"
          onTabChange={() => {}}
        />

        {/* Form */}
        <div className="p-4 space-y-4 max-h-[400px] overflow-y-auto custom-scrollbar">
          
          {/* Row 1: Language (left half) + Simple Language (right half) */}
          <div className="grid grid-cols-2 gap-4">
            {/* Language Selector */}
            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-foreground">Language</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[250px]">
                    <p>Select the language for your interview session.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="relative">
                <select
                  value={language}
                  onChange={(e) => setLanguage(e.target.value)}
                  className="w-full px-3 py-2 pr-8 rounded-lg text-sm bg-input border border-border text-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring"
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
            <div className="space-y-1.5">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-foreground">Simple Language</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[250px]">
                    <p>If English is not your first language, you can use this option to make sure the AI doesn't use complex words.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center h-[38px]">
                <button
                  onClick={() => setSimpleLanguage(!simpleLanguage)}
                  className={cn(
                    "relative w-11 h-6 rounded-full transition-colors",
                    simpleLanguage ? "bg-primary" : "bg-muted"
                  )}
                >
                  <div
                    className={cn(
                      "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                      simpleLanguage ? "translate-x-6" : "translate-x-1"
                    )}
                  />
                </button>
              </div>
            </div>
          </div>

          {/* Extra Context/Instructions */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-foreground">Extra Context/Instructions</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[250px]">
                  <p>Extra context/instructions for the AI to follow.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <textarea
              value={extraContext}
              onChange={(e) => setExtraContext(e.target.value)}
              placeholder="Be more technical, use a more casual tone, etc."
              rows={3}
              className="w-full px-3 py-2.5 rounded-lg text-sm bg-input border border-border text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          {/* Resume */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1">
              <BookOpen className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">Resume</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[250px]">
                  <p>Select a resume to use for the interview. This helps the AI provide relevant suggestions and answers.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="flex items-center gap-2">
              <div className="relative flex-1">
                <select
                  className="w-full px-3 py-2 pr-8 rounded-lg text-sm bg-input border border-border text-muted-foreground appearance-none focus:outline-none focus:ring-2 focus:ring-ring"
                >
                  <option value="">No resumes found</option>
                </select>
                <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
              </div>
              <button className="p-2 rounded-lg border border-border hover:bg-muted transition-colors">
                <Plus className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
          </div>

          {/* AI Model */}
          <div className="space-y-1.5">
            <div className="flex items-center gap-1">
              <Bot className="w-4 h-4 text-muted-foreground" />
              <span className="text-sm font-medium text-foreground">AI Model</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[250px]">
                  <p>Choose which AI model to use for generating responses. Different models may have varying capabilities and response styles.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <div className="relative">
              <div className="flex items-center gap-2 px-3 py-2 rounded-lg bg-input border border-border">
                <Sparkles className="w-4 h-4 text-muted-foreground" />
                <span className="text-sm text-foreground">GPT-4.1 Mini</span>
                <span className="px-2 py-0.5 text-[10px] font-medium rounded-full bg-foreground text-background">
                  Recommended
                </span>
                <span className="text-xs text-muted-foreground">Fast</span>
                <ChevronDown className="ml-auto w-4 h-4 text-muted-foreground" />
              </div>
            </div>
          </div>

          {/* Auto Generate AI Response */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-foreground">Auto Generate AI Response</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[280px]">
                  <p>If you check this option, the AI will automatically detect when the interviewer asks you a question and generate a response. If you don't check this option, you will need to click the "AI Answer" button to generate a response.</p>
                </TooltipContent>
              </Tooltip>
              <span className="ml-2 px-2 py-0.5 text-[10px] font-medium rounded-full bg-green-500/20 text-green-400 border border-green-500/30">
                New
              </span>
            </div>
            <button
              onClick={() => setAutoGenerate(!autoGenerate)}
              className={cn(
                "relative w-11 h-6 rounded-full transition-colors",
                autoGenerate ? "bg-primary" : "bg-muted"
              )}
            >
              <div
                className={cn(
                  "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                  autoGenerate ? "translate-x-6" : "translate-x-1"
                )}
              />
            </button>
          </div>

          {/* Save Transcript */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <span className="text-sm font-medium text-foreground">Save Transcript</span>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Info className="w-3.5 h-3.5 text-muted-foreground cursor-help" />
                </TooltipTrigger>
                <TooltipContent side="top" className="max-w-[280px]">
                  <p>Enable this to save a transcript of your interview for later review and analysis. Legal Disclaimer: You must comply with all applicable recording laws. Many jurisdictions require consent from all parties being recorded.</p>
                </TooltipContent>
              </Tooltip>
            </div>
            <button
              onClick={() => setSaveTranscript(!saveTranscript)}
              className={cn(
                "relative w-11 h-6 rounded-full transition-colors",
                saveTranscript ? "bg-primary" : "bg-muted"
              )}
            >
              <div
                className={cn(
                  "absolute top-1 w-4 h-4 rounded-full bg-white transition-transform",
                  saveTranscript ? "translate-x-6" : "translate-x-1"
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
          >
            Back
          </ActionButton>
          <ActionButton
            variant="primary"
            onClick={handleCreateFreeSession}
          >
            Create Free Session
          </ActionButton>
        </div>
      </FloatingWindow>
    </TooltipProvider>
  );
}
