"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ResumeContent } from "@/lib/resume-types";
import { Controller } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function SkillsSection({
  form,
}: {
  form: UseFormReturn<ResumeContent>;
}) {
  const { control } = form;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Skills</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-2">
          <Label htmlFor="skills">
            Comma-separated skills (e.g. JavaScript, React, Node.js)
          </Label>
          <Controller
            control={control}
            name="skills"
            render={({ field }) => (
              <Input
                id="skills"
                value={Array.isArray(field.value) ? field.value.join(", ") : ""}
                onChange={(e) =>
                  field.onChange(
                    e.target.value
                      .split(",")
                      .map((s) => s.trim())
                      .filter(Boolean)
                  )
                }
                placeholder="TypeScript, React, Node.js, PostgreSQL"
              />
            )}
          />
          <p className="text-xs text-muted-foreground">
            Enter skills separated by commas. They will be stored as a list.
          </p>
        </div>
      </CardContent>
    </Card>
  );
}
