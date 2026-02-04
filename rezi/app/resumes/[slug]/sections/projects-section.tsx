"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ResumeContent } from "@/lib/resume-types";
import { useFieldArray, Controller } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export function ProjectsSection({
  form,
}: {
  form: UseFormReturn<ResumeContent>;
}) {
  const { control, register } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "projects",
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Projects</CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              id: crypto.randomUUID(),
              name: "",
              url: "",
              description: "",
              bullets: [""],
              technologies: [],
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
            No projects yet. Click Add to add one.
          </p>
        ) : (
          fields.map((field, index) => (
            <div
              key={field.id}
              className="rounded-lg border p-4 space-y-3 relative"
            >
              <div className="flex justify-between items-start gap-2">
                <h3 className="text-sm font-medium text-muted-foreground">
                  Project {index + 1}
                </h3>
                <Button
                  type="button"
                  variant="ghost"
                  size="icon"
                  className="h-8 w-8 text-destructive shrink-0"
                  onClick={() => remove(index)}
                  aria-label="Remove project"
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2 sm:col-span-2">
                  <Label>Project name</Label>
                  <Input
                    {...register(`projects.${index}.name`)}
                    placeholder="My Awesome Project"
                  />
                </div>
                <div className="space-y-2">
                  <Label>URL (optional)</Label>
                  <Input
                    {...register(`projects.${index}.url`)}
                    placeholder="https://github.com/..."
                  />
                </div>
                <div className="space-y-2">
                  <Label>Technologies (comma-separated)</Label>
                  <ProjectTechnologies form={form} index={index} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Short description (optional)</Label>
                <Textarea
                  {...register(`projects.${index}.description`)}
                  placeholder="Brief description..."
                  rows={2}
                  className="resize-y"
                />
              </div>
              <ProjectBullets form={form} index={index} />
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}

function ProjectTechnologies({
  form,
  index,
}: {
  form: UseFormReturn<ResumeContent>;
  index: number;
}) {
  const { control } = form;
  return (
    <Controller
      control={control}
      name={`projects.${index}.technologies`}
      defaultValue={[]}
      render={({ field }) => (
        <Input
          value={Array.isArray(field.value) ? field.value.join(", ") : ""}
          onChange={(e) =>
            field.onChange(
              e.target.value
                .split(",")
                .map((s) => s.trim())
                .filter(Boolean)
            )
          }
          placeholder="React, Node.js"
        />
      )}
    />
  );
}

function ProjectBullets({
  form,
  index,
}: {
  form: UseFormReturn<ResumeContent>;
  index: number;
}) {
  const { control, register } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: `projects.${index}.bullets` as "projects",
  });
  return (
    <div className="space-y-2">
      <Label>Bullet points</Label>
      {fields.map((field, bi) => (
        <div key={field.id} className="flex gap-2">
          <Input
            {...register(`projects.${index}.bullets.${bi}`)}
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
