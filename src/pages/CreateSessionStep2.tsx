import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Plus, ChevronDown, Info, BookOpen, Bot, Sparkles } from "lucide-react";
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
  const [autoGenerate, setAutoGenerate] = useState(false);
  const [saveTranscript, setSaveTranscript] = useState(true);

  const handleBack = () => {
    navigate("/create-session/step1");
  };

  const handleCreateFreeSession = () => {
    navigate("/create-session/activate");
  };

  return (
    <TooltipProvider delayDuration={200}>
      <div className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        {/* Floating Window - Light Theme */}
        <div className="w-[420px] bg-[#f5f5f5] rounded-2xl shadow-2xl overflow-hidden">
          
          {/* Title Bar */}
          <div className="flex items-center justify-between px-4 py-3 bg-[#f0f0f0] border-b border-gray-200">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center">
                <span className="text-white text-lg">🦜</span>
              </div>
              <span className="font-semibold text-gray-800 text-lg">ParakeetAI</span>
            </div>
            
            {/* Credits Badge */}
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-gray-200 text-gray-600 text-sm font-medium">
              <span className="text-gray-400">◎</span>
              <span>No Credits</span>
            </div>
            
            {/* Window Controls */}
            <div className="flex items-center gap-2">
              <button className="text-gray-400 hover:text-gray-600">⋮</button>
              <button className="text-gray-400 hover:text-gray-600">⊕</button>
              <button className="text-gray-400 hover:text-gray-600">∧</button>
              <button className="w-6 h-6 rounded bg-red-500 hover:bg-red-600 text-white text-xs flex items-center justify-center">✕</button>
            </div>
          </div>

          {/* Tab Navigation */}
          <div className="flex border-b border-gray-200 bg-[#f0f0f0]">
            <button className="flex-1 py-3 text-sm font-medium text-gray-800 border-b-2 border-gray-800">
              Create
            </button>
            <button className="flex-1 py-3 text-sm font-medium text-gray-400 hover:text-gray-600">
              Past Sessions
            </button>
          </div>

          {/* Form Content */}
          <div className="p-4 space-y-4 max-h-[450px] overflow-y-auto [&::-webkit-scrollbar]:w-1.5 [&::-webkit-scrollbar-track]:bg-gray-100 [&::-webkit-scrollbar-thumb]:bg-gray-300 [&::-webkit-scrollbar-thumb]:rounded-full">
            
            {/* Row 1: Language + Simple Language */}
            <div className="grid grid-cols-2 gap-6">
              {/* Language */}
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-700">Language</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[220px] bg-gray-900 text-white text-xs p-2 rounded-lg">
                      <p>Select the language for your interview session.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="relative">
                  <select
                    value={language}
                    onChange={(e) => setLanguage(e.target.value)}
                    className="w-full px-3 py-2.5 pr-8 rounded-lg text-sm bg-white border border-gray-300 text-gray-700 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-400"
                  >
                    <option value="english">English</option>
                    <option value="spanish">Spanish</option>
                    <option value="french">French</option>
                    <option value="german">German</option>
                    <option value="chinese">Chinese</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
              </div>

              {/* Simple Language */}
              <div className="space-y-2">
                <div className="flex items-center gap-1">
                  <span className="text-sm font-medium text-gray-700">Simple Language</span>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                    </TooltipTrigger>
                    <TooltipContent side="top" className="max-w-[220px] bg-gray-900 text-white text-xs p-2 rounded-lg">
                      <p>If English is not your first language, you can use this option to make sure the AI doesn't use complex words.</p>
                    </TooltipContent>
                  </Tooltip>
                </div>
                <div className="flex items-center h-[42px]">
                  <button
                    onClick={() => setSimpleLanguage(!simpleLanguage)}
                    className={cn(
                      "relative w-12 h-6 rounded-full transition-colors",
                      simpleLanguage ? "bg-gray-800" : "bg-gray-300"
                    )}
                  >
                    <div
                      className={cn(
                        "absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform",
                        simpleLanguage ? "translate-x-7" : "translate-x-1"
                      )}
                    />
                  </button>
                </div>
              </div>
            </div>

            {/* Extra Context/Instructions */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-700">Extra Context/Instructions</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[220px] bg-gray-900 text-white text-xs p-2 rounded-lg">
                    <p>Extra context/instructions for the AI to follow.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <textarea
                value={extraContext}
                onChange={(e) => setExtraContext(e.target.value)}
                placeholder="Be more technical, use a more casual tone, etc."
                rows={3}
                className="w-full px-3 py-2.5 rounded-lg text-sm bg-white border border-gray-300 text-gray-700 placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-gray-400 resize-none"
              />
            </div>

            {/* Resume */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <BookOpen className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">Resume</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[220px] bg-gray-900 text-white text-xs p-2 rounded-lg">
                    <p>Select a resume to use for the interview. This helps the AI provide relevant suggestions and answers.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="flex items-center gap-2">
                <div className="relative flex-1">
                  <select className="w-full px-3 py-2.5 pr-8 rounded-lg text-sm bg-white border border-gray-300 text-gray-400 appearance-none focus:outline-none focus:ring-2 focus:ring-gray-400">
                    <option value="">No resumes found</option>
                  </select>
                  <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                </div>
                <button className="p-2.5 rounded-lg border border-gray-300 bg-white hover:bg-gray-50 transition-colors">
                  <Plus className="w-4 h-4 text-gray-500" />
                </button>
              </div>
            </div>

            {/* AI Model */}
            <div className="space-y-2">
              <div className="flex items-center gap-1">
                <Bot className="w-4 h-4 text-gray-500" />
                <span className="text-sm font-medium text-gray-700">AI Model</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[250px] bg-gray-900 text-white text-xs p-2 rounded-lg">
                    <p>Choose which AI model to use for generating responses. Different models may have varying capabilities and response styles.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <div className="relative">
                <div className="flex items-center gap-2 px-3 py-2.5 rounded-lg bg-white border border-gray-300 cursor-pointer hover:bg-gray-50">
                  <Sparkles className="w-4 h-4 text-gray-500" />
                  <span className="text-sm text-gray-700">GPT-4.1 Mini</span>
                  <span className="px-2 py-0.5 text-[10px] font-semibold rounded-full bg-gray-800 text-white">
                    Recommended
                  </span>
                  <span className="text-xs text-gray-400">Fast</span>
                  <ChevronDown className="ml-auto w-4 h-4 text-gray-400" />
                </div>
              </div>
            </div>

            {/* Auto Generate AI Response */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-700">Auto Generate AI Response</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[280px] bg-gray-900 text-white text-xs p-2 rounded-lg">
                    <p>If you check this option, the AI will automatically detect when the interviewer asks you a question and generate a response. If you don't check this option, you will need to click the "AI Answer" button to generate a response.</p>
                  </TooltipContent>
                </Tooltip>
                <span className="ml-1 px-2 py-0.5 text-[10px] font-semibold rounded-full bg-green-100 text-green-600 border border-green-200">
                  New
                </span>
              </div>
              <button
                onClick={() => setAutoGenerate(!autoGenerate)}
                className={cn(
                  "relative w-12 h-6 rounded-full transition-colors",
                  autoGenerate ? "bg-gray-800" : "bg-gray-300"
                )}
              >
                <div
                  className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform",
                    autoGenerate ? "translate-x-7" : "translate-x-1"
                  )}
                />
              </button>
            </div>

            {/* Save Transcript */}
            <div className="flex items-center justify-between py-1">
              <div className="flex items-center gap-1">
                <span className="text-sm font-medium text-gray-700">Save Transcript</span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Info className="w-3.5 h-3.5 text-gray-400 cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent side="top" className="max-w-[280px] bg-gray-900 text-white text-xs p-2 rounded-lg">
                    <p>Enable this to save a transcript of your interview for later review and analysis. Legal Disclaimer: You must comply with all applicable recording laws. Many jurisdictions require consent from all parties being recorded.</p>
                  </TooltipContent>
                </Tooltip>
              </div>
              <button
                onClick={() => setSaveTranscript(!saveTranscript)}
                className={cn(
                  "relative w-12 h-6 rounded-full transition-colors",
                  saveTranscript ? "bg-gray-800" : "bg-gray-300"
                )}
              >
                <div
                  className={cn(
                    "absolute top-1 w-4 h-4 rounded-full bg-white shadow transition-transform",
                    saveTranscript ? "translate-x-7" : "translate-x-1"
                  )}
                />
              </button>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between p-4 border-t border-gray-200 bg-[#f0f0f0]">
            <button
              onClick={handleBack}
              className="px-6 py-2.5 text-sm font-medium text-gray-600 hover:text-gray-800 transition-colors"
            >
              Back
            </button>
            <button
              onClick={handleCreateFreeSession}
              className="px-6 py-2.5 text-sm font-medium text-white bg-gray-800 hover:bg-gray-900 rounded-lg transition-colors"
            >
              Create Free Session
            </button>
          </div>
        </div>
      </div>
    </TooltipProvider>
  );
}
