"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ResumeContent } from "@/lib/resume-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { ImproveSummaryButton } from "../improve-summary-button";

export function SummarySection({
  form,
}: {
  form: UseFormReturn<ResumeContent>;
}) {
  const { register } = form;
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Professional Summary</CardTitle>
        <ImproveSummaryButton form={form} />
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="summary">Summary</Label>
          <Textarea
            id="summary"
            {...register("summary")}
            placeholder="Brief overview of your experience and goals..."
            rows={4}
            className="resize-y min-h-[100px]"
          />
        </div>
      </CardContent>
    </Card>
  );
}
