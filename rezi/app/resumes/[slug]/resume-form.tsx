"use client";

import { useEffect, useCallback, useRef } from "react";
import { useForm } from "react-hook-form";
import type { ResumeContent } from "@/lib/resume-types";
import { updateResume } from "@/app/actions/resume";
import { ResumePreview } from "./resume-preview";
import { PersonalInfoSection } from "./sections/personal-info-section";
import { SummarySection } from "./sections/summary-section";
import { WorkExperienceSection } from "./sections/work-experience-section";
import { EducationSection } from "./sections/education-section";
import { SkillsSection } from "./sections/skills-section";
import { ProjectsSection } from "./sections/projects-section";
import { ExportPdfButton } from "./export-pdf-button";
import { useToast } from "@/components/ui/use-toast";

const AUTOSAVE_DELAY_MS = 1500;

export function ResumeForm({
  resumeId,
  initialContent,
}: {
  resumeId: string;
  initialContent: ResumeContent;
}) {
  const { toast } = useToast();
  const form = useForm<ResumeContent>({
    defaultValues: initialContent,
  });

  const watched = form.watch();
  const isFirstRun = useRef(true);

  const save = useCallback(
    async (content: ResumeContent) => {
      const result = await updateResume(resumeId, content);
      if (result.error) {
        toast({ title: "Save failed", description: result.error, variant: "destructive" });
      }
    },
    [resumeId, toast]
  );

  useEffect(() => {
    if (isFirstRun.current) {
      isFirstRun.current = false;
      return;
    }
    const timer = setTimeout(() => {
      save(watched);
    }, AUTOSAVE_DELAY_MS);
    return () => clearTimeout(timer);
  }, [watched, save]);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-8">
      <div className="space-y-6 order-2 lg:order-1">
        <form className="space-y-6" onSubmit={(e) => e.preventDefault()}>
          <PersonalInfoSection form={form} />
          <SummarySection form={form} />
          <WorkExperienceSection form={form} />
          <EducationSection form={form} />
          <SkillsSection form={form} />
          <ProjectsSection form={form} />
        </form>
        <div className="flex flex-wrap gap-2 pt-4">
          <ExportPdfButton content={watched} />
        </div>
      </div>
      <div className="order-1 lg:order-2 sticky top-[calc(3.5rem+1rem)] self-start hidden lg:block">
        <ResumePreview content={watched} className="resume-preview-a4" />
      </div>
      <div className="order-3 lg:hidden">
        <ResumePreview content={watched} className="resume-preview-a4 mt-6" />
      </div>
    </div>
  );
}
