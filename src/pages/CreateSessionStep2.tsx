import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, Plus, Upload, Sparkles, ChevronDown } from "lucide-react";
import {
  FloatingWindow,
  TitleBar,
  FormTextarea,
  ToggleSwitch,
  ActionButton,
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

  return (
    <FloatingWindow width="medium">
      <TitleBar credits={credits} />

      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-lg font-semibold text-foreground">Create Session</h2>
        <p className="text-xs text-muted-foreground">Step 2 of 2 · AI Configuration</p>
      </div>

      {/* Form */}
      <div className="p-4 space-y-4 max-h-[360px] overflow-y-auto custom-scrollbar">
        {/* Language Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Language
          </label>
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
        <ToggleSwitch
          label="Simple Language"
          description="Use simpler vocabulary if English is not your first language"
          checked={simpleLanguage}
          onChange={setSimpleLanguage}
        />

        {/* Extra Context */}
        <FormTextarea
          label="Extra Context / Instructions"
          placeholder="Be more technical, use a casual tone..."
          rows={3}
          value={extraContext}
          onChange={(e) => setExtraContext(e.target.value)}
        />

        {/* Resume Upload */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            Resume (Optional)
          </label>
          <button className="w-full flex items-center justify-center gap-2 p-4 rounded-lg border border-dashed border-border hover:border-muted-foreground/50 transition-colors">
            <Upload className="w-4 h-4 text-muted-foreground" />
            <span className="text-sm text-muted-foreground">Upload Resume</span>
          </button>
        </div>

        {/* AI Model Selector */}
        <div className="space-y-1.5">
          <label className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
            AI Model
          </label>
          <div className="grid grid-cols-2 gap-2">
            {[
              { id: "gpt-4-mini", name: "GPT-4.1 Mini", badges: ["Fast", "Recommended"] },
              { id: "gpt-4", name: "GPT-4.1", badges: ["Powerful"] },
            ].map((model) => (
              <button
                key={model.id}
                onClick={() => setAiModel(model.id)}
                className={cn(
                  "flex flex-col items-start p-3 rounded-lg border transition-all text-left",
                  aiModel === model.id
                    ? "border-primary bg-primary/10"
                    : "border-border hover:border-muted-foreground/50"
                )}
              >
                <span className="text-sm font-medium text-foreground">{model.name}</span>
                <div className="flex gap-1 mt-1">
                  {model.badges.map((badge) => (
                    <span
                      key={badge}
                      className="px-1.5 py-0.5 text-[10px] font-medium rounded bg-muted text-muted-foreground"
                    >
                      {badge}
                    </span>
                  ))}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Auto Generate Toggle */}
        <ToggleSwitch
          label="Auto Generate AI Response"
          description="Automatically detect questions and generate answers"
          checked={autoGenerate}
          onChange={setAutoGenerate}
          badge="New"
        />

        {/* Save Transcript Toggle */}
        <ToggleSwitch
          label="Save Transcript"
          description="Store session transcript for later review"
          checked={saveTranscript}
          onChange={setSaveTranscript}
        />
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
  );
}
