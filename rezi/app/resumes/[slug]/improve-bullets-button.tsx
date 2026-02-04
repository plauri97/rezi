"use client";

import { useState } from "react";
import type { UseFormReturn } from "react-hook-form";
import type { ResumeContent } from "@/lib/resume-types";
import { Button } from "@/components/ui/button";
import { improveBullets } from "@/app/actions/ai";
import { useToast } from "@/components/ui/use-toast";
import { Sparkles } from "lucide-react";

type SectionKey = "workExperience" | "projects";

export function ImproveBulletsButton({
  form,
  section,
  index,
}: {
  form: UseFormReturn<ResumeContent>;
  section: SectionKey;
  index: number;
}) {
  const [loading, setLoading] = useState(false);
  const { toast } = useToast();
  const { setValue, getValues } = form;

  async function handleClick() {
    setLoading(true);
    const entry = getValues(`${section}.${index}`);
    const bullets =
      "bullets" in entry && Array.isArray(entry.bullets)
        ? (entry.bullets as string[])
        : [];
    const context =
      section === "workExperience"
        ? {
            role: (entry as ResumeContent["workExperience"][0]).jobTitle,
            company: (entry as ResumeContent["workExperience"][0]).company,
          }
        : { role: (entry as ResumeContent["projects"][0]).name, company: "" };
    const result = await improveBullets(bullets, context);
    setLoading(false);
    if ("error" in result) {
      toast({ title: "Error", description: result.error, variant: "destructive" });
      return;
    }
    setValue(`${section}.${index}.bullets`, result.bullets);
    toast({ title: "Bullets updated", description: "AI-improved bullets applied." });
  }

  return (
    <Button
      type="button"
      variant="ghost"
      size="sm"
      onClick={handleClick}
      disabled={loading}
      className="text-primary"
    >
      <Sparkles className="h-3.5 w-3.5 mr-1" />
      {loading ? "Improving…" : "Improve with AI"}
    </Button>
  );
}
