"use client";

import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { ResumeForm } from "./resume-form";
import type { ResumeContent } from "@/lib/resume-types";

export function ResumeEditor({
  resumeId,
  slug,
  initialContent,
  title,
}: {
  resumeId: string;
  slug: string;
  initialContent: ResumeContent;
  title: string;
}) {
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b bg-background/95 supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 min-w-0">
            <Link
              href="/dashboard"
              className="shrink-0 p-1 rounded-md hover:bg-accent"
              aria-label="Back to dashboard"
            >
              <ArrowLeft className="h-5 w-5" />
            </Link>
            <span className="font-semibold truncate">{title}</span>
          </div>
        </div>
      </header>
      <main className="flex-1 container mx-auto px-4 py-4 lg:py-6">
        <ResumeForm resumeId={resumeId} initialContent={initialContent} />
      </main>
    </div>
  );
}
