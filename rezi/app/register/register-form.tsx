"use client";

import { useState } from "react";
import { useFormStatus } from "react-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { register } from "@/app/actions/auth";

function SubmitButton() {
  const { pending } = useFormStatus();
  return (
    <Button type="submit" className="w-full" disabled={pending}>
      {pending ? "Creating account…" : "Create account"}
    </Button>
  );
}

export function RegisterForm() {
  const [state, setState] = useState<{ error?: Record<string, string[]> } | null>(null);

  async function handleAction(formData: FormData) {
    const result = await register(formData);
    if (result?.error) setState(result);
  }

  const errors = state?.error as Record<string, string[] | undefined> | undefined;

  return (
    <form action={handleAction} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          placeholder="Jane Doe"
          required
          autoComplete="name"
        />
        {errors?.name?.[0] && (
          <p className="text-sm text-destructive">{errors.name[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          name="email"
          type="email"
          placeholder="you@example.com"
          required
          autoComplete="email"
        />
        {errors?.email?.[0] && (
          <p className="text-sm text-destructive">{errors.email[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          name="password"
          type="password"
          required
          minLength={8}
          autoComplete="new-password"
        />
        {errors?.password?.[0] && (
          <p className="text-sm text-destructive">{errors.password[0]}</p>
        )}
      </div>
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm password</Label>
        <Input
          id="confirmPassword"
          name="confirmPassword"
          type="password"
          required
          autoComplete="new-password"
        />
        {errors?.confirmPassword?.[0] && (
          <p className="text-sm text-destructive">{errors.confirmPassword[0]}</p>
        )}
      </div>
      <SubmitButton />
    </form>
  );
}
