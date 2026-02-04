"use client";

import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { ResumeContent } from "@/lib/resume-types";
import { Button } from "@/components/ui/button";
import { generateSummary } from "@/app/actions/ai";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles } from "lucide-react";

export function ImproveSummaryButton({
  form,
}: {
  form: UseFormReturn<ResumeContent>;
}) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { setValue, getValues } = form;

  async function handleClick() {
    setLoading(true);
    const { personalInfo, workExperience, skills, summary } = getValues();
    const result = await generateSummary({
      fullName: personalInfo.fullName || "Candidate",
      workTitles: workExperience.map((w) => w.jobTitle).filter(Boolean),
      skills: Array.isArray(skills) ? skills : [],
      rawSummary: summary,
    });
    setLoading(false);
    if ("error" in result) {
      toast({ title: "Error", description: result.error, variant: "destructive" });
      return;
    }
    setValue("summary", result.summary);
    toast({ title: "Summary updated", description: "AI-generated summary applied." });
  }

  return (
    <Button
      type="button"
      variant="outline"
      size="sm"
      onClick={handleClick}
      disabled={loading}
    >
      <Sparkles className="h-4 w-4 mr-1" />
      {loading ? "Generating…" : "Improve with AI"}
    </Button>
  );
}
