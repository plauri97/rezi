"use client";

import type { UseFormReturn } from "react-hook-form";
import type { ResumeContent } from "@/lib/resume-types";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

export function PersonalInfoSection({
  form,
}: {
  form: UseFormReturn<ResumeContent>;
}) {
  const { register } = form;
  return (
    <Card>
      <CardHeader>
        <CardTitle className="text-base">Personal Info</CardTitle>
      </CardHeader>
      <CardContent className="space-y-3">
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="personalInfo.fullName">Full name</Label>
            <Input
              id="personalInfo.fullName"
              {...register("personalInfo.fullName")}
              placeholder="Jane Doe"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="personalInfo.email">Email</Label>
            <Input
              id="personalInfo.email"
              type="email"
              {...register("personalInfo.email")}
              placeholder="jane@example.com"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="personalInfo.phone">Phone</Label>
            <Input
              id="personalInfo.phone"
              {...register("personalInfo.phone")}
              placeholder="+1 234 567 8900"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="personalInfo.location">Location</Label>
            <Input
              id="personalInfo.location"
              {...register("personalInfo.location")}
              placeholder="San Francisco, CA"
            />
          </div>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          <div className="space-y-2">
            <Label htmlFor="personalInfo.website">Website</Label>
            <Input
              id="personalInfo.website"
              {...register("personalInfo.website")}
              placeholder="https://jane.dev"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="personalInfo.linkedin">LinkedIn</Label>
            <Input
              id="personalInfo.linkedin"
              {...register("personalInfo.linkedin")}
              placeholder="https://linkedin.com/in/janedoe"
            />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
