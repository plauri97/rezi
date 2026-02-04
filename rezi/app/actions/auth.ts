"use server";

import { signIn, signOut } from "@/auth";
import { prisma } from "@/lib/db";
import bcrypt from "bcryptjs";
import { signUpSchema, type SignInInput } from "@/lib/validations/auth";
import { AuthError } from "next-auth";

export async function register(formData: FormData) {
  const raw = {
    name: formData.get("name") as string,
    email: formData.get("email") as string,
    password: formData.get("password") as string,
    confirmPassword: formData.get("confirmPassword") as string,
  };
  const parsed = signUpSchema.safeParse(raw);
  if (!parsed.success) {
    return { error: parsed.error.flatten().fieldErrors };
  }
  const { name, email, password } = parsed.data;
  const existing = await prisma.user.findUnique({ where: { email } });
  if (existing) {
    return { error: { email: ["An account with this email already exists."] } };
  }
  const hashed = await bcrypt.hash(password, 12);
  await prisma.user.create({
    data: { name, email, password: hashed },
  });
  await signIn("credentials", { email, password, redirectTo: "/dashboard" });
  return {};
}

export async function login(formData: FormData) {
  const raw: SignInInput = {
    email: formData.get("email") as string,
    password: formData.get("password") as string,
  };
  try {
    await signIn("credentials", {
      ...raw,
      redirectTo: "/dashboard",
    });
  } catch (e) {
    if (e instanceof AuthError) {
      if (e.type === "CredentialsSignin") {
        return { error: "Invalid email or password." };
      }
    }
    throw e;
  }
  return {};
}

export async function logout() {
  await signOut({ redirectTo: "/" });
}
