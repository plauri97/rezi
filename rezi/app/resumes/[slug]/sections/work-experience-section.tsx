"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ResumeContent } from "@/lib/resume-types";
import { useFieldArray } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";
import { ImproveBulletsButton } from "../improve-bullets-button";

export function WorkExperienceSection({
  form,
}: {
  form: UseFormReturn<ResumeContent>;
}) {
  const { control, register } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "workExperience",
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Work Experience</CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              id: crypto.randomUUID(),
              company: "",
              jobTitle: "",
              location: "",
              startDate: "",
              endDate: "",
              current: false,
              bullets: [""],
            })
          }
        >
          <Plus className="h-4 w-4 mr-1" />
          Add
        </Button>
      </CardHeader>
      <CardContent className="space-y-6">
        {fields.length === 0 ? (
          <p className="text-sm text-muted-foreground">
            No work experience yet. Click Add to add an entry.
          </p>
        ) : (
          fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-lg border p-4 space-y-3 relative"
            >
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Entry {index + 1}
                </h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive shrink-0"
                  onClick={() => remove(index)}
                  aria-label="Remove entry"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Job title</Label>
                  <Input
                    {...register(`workExperience.${index}.jobTitle`)}
                    placeholder="Software Engineer"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Company</Label>
                  <Input
                    {...register(`workExperience.${index}.company`)}
                    placeholder="Acme Inc."
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    {...register(`workExperience.${index}.location`)}
                    placeholder="Remote"
                  />
                </div>
                <div className="flex gap-2 items-end">
                  <div className="space-y-2 flex-1">
                    <Label>Start date</Label>
                    <Input
                      {...register(`workExperience.${index}.startDate`)}
                      placeholder="Jan 2020"
                    />
                  </div>
                  <div className="space-y-2 flex-1">
                    <Label>End date</Label>
                    <Input
                      {...register(`workExperience.${index}.endDate`)}
                      placeholder="Present"
                      disabled={form.watch(`workExperience.${index}.current`)}
                    />
                  </div>
                  <label className="flex items-center gap-2 pb-2">
                    <input
                      type="checkbox"
                      {...register(`workExperience.${index}.current`)}
                      className="rounded border-input"
                    />
                    <span className="text-sm">Current</span>
                  </label>
                </div>
              </div>
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label>Bullet points</Label>
                  <ImproveBulletsButton form={form} section="workExperience" index={index} />
                </div>
                <WorkBullets form={form} index={index} />
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

function WorkBullets({
  form,
  index,
}: {
  form: UseFormReturn<ResumeContent>;
  index: number;
}) {
  const { control, register } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: `workExperience.${index}.bullets` as "workExperience",
  });
  return (
    <div className="space-y-2">
      {fields.map((field, bi) => (
        <div key={field.id} className="flex gap-2">
          <Input
            {...register(`workExperience.${index}.bullets.${bi}`)}
            placeholder="Achieved X by doing Y..."
            className="flex-1"
          />
          <Button
            type="button"
            variant="ghost"
            size="icon"
            className="shrink-0"
            onClick={() => remove(bi)}
            aria-label="Remove bullet"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      ))}
      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => (append as unknown as (value: string) => void)("")}
      >
        <Plus className="h-4 w-4 mr-1" />
        Add bullet
      </Button>
    </div>
  );
}
