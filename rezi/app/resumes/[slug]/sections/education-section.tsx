"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ResumeContent } from "@/lib/resume-types";
import { useFieldArray } from "react-hook-form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Plus, Trash2 } from "lucide-react";

export function EducationSection({
  form,
}: {
  form: UseFormReturn<ResumeContent>;
}) {
  const { control, register } = form;
  const { fields, append, remove } = useFieldArray({
    control,
    name: "education",
  });

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0">
        <CardTitle className="text-base">Education</CardTitle>
        <Button
          type="button"
          variant="outline"
          size="sm"
          onClick={() =>
            append({
              id: crypto.randomUUID(),
              institution: "",
              degree: "",
              field: "",
              location: "",
              startDate: "",
              endDate: "",
              bullets: [],
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
            No education entries yet. Click Add to add one.
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
                  <Label>Degree</Label>
                  <Input
                    {...register(`education.${index}.degree`)}
                    placeholder="B.S. Computer Science"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Field (optional)</Label>
                  <Input
                    {...register(`education.${index}.field`)}
                    placeholder="Computer Science"
                  />
                </div>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Institution</Label>
                  <Input
                    {...register(`education.${index}.institution`)}
                    placeholder="University of Example"
                  />
                </div>
                <div className="space-y-2">
                  <Label>Location</Label>
                  <Input
                    {...register(`education.${index}.location`)}
                    placeholder="Boston, MA"
                  />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-2">
                  <Label>Start date</Label>
                  <Input
                    {...register(`education.${index}.startDate`)}
                    placeholder="2016"
                  />
                </div>
                <div className="space-y-2">
                  <Label>End date</Label>
                  <Input
                    {...register(`education.${index}.endDate`)}
                    placeholder="2020"
                  />
                </div>
              </div>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
}
