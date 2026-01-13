import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, ArrowRight } from "lucide-react";
import {
  FloatingWindow,
  TitleBar,
  FormInput,
  FormTextarea,
  ActionButton,
} from "@/components/floating";

export default function CreateSessionStep1() {
  const navigate = useNavigate();
  const [company, setCompany] = useState("");
  const [jobDescription, setJobDescription] = useState("");

  const handleBack = () => {
    navigate("/dashboard");
  };

  const handleNext = () => {
    navigate("/create-session/step2");
  };

  const isValid = company.trim().length > 0;

  return (
    <FloatingWindow width="medium">
      <TitleBar credits={0} />

      {/* Header */}
      <div className="px-4 pt-4 pb-2">
        <h2 className="text-lg font-semibold text-foreground">Create Session</h2>
        <p className="text-xs text-muted-foreground">Step 1 of 2 · Basic Details</p>
      </div>

      {/* Form */}
      <div className="p-4 space-y-4">
        <FormInput
          label="Company"
          placeholder="Microsoft"
          value={company}
          onChange={(e) => setCompany(e.target.value)}
        />

        <FormTextarea
          label="Job Description"
          placeholder="Software Engineer with experience in distributed systems..."
          rows={5}
          value={jobDescription}
          onChange={(e) => setJobDescription(e.target.value)}
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
        <ActionButton
          variant="primary"
          onClick={handleNext}
          disabled={!isValid}
          icon={<ArrowRight className="w-4 h-4" />}
        >
          Next
        </ActionButton>
      </div>
    </FloatingWindow>
  );
}
