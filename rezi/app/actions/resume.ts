"use server";

import { auth } from "@/auth";
import { prisma } from "@/lib/db";
import { slugify } from "@/lib/utils";
import type { ResumeContent } from "@/lib/resume-types";
import { revalidatePath } from "next/cache";

export type ResumeActionResult = { error?: string; slug?: string };

export async function createResume(title: string): Promise<ResumeActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };
  const slug = slugify(title) || "resume";
  try {
    await prisma.resume.create({
      data: {
        userId: session.user.id,
        title,
        slug,
        content: {
          personalInfo: {
            fullName: "",
            email: session.user.email ?? "",
            phone: "",
            location: "",
            website: "",
            linkedin: "",
          },
          summary: "",
          workExperience: [],
          education: [],
          skills: [],
          projects: [],
        },
      },
    });
  } catch (e) {
    const msg = e instanceof Error ? e.message : "Failed to create resume";
    if (msg.includes("Unique constraint")) {
      return { error: "A resume with this title already exists." };
    }
    return { error: msg };
  }
  revalidatePath("/dashboard");
  return { slug };
}

export async function updateResume(
  id: string,
  content: ResumeContent
): Promise<ResumeActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };
  const resume = await prisma.resume.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!resume) return { error: "Resume not found" };
  await prisma.resume.update({
    where: { id },
    data: { content: content as object },
  });
  revalidatePath("/dashboard");
  revalidatePath(`/resumes/${resume.slug}`);
  return {};
}

export async function updateResumeTitle(
  id: string,
  title: string
): Promise<ResumeActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };
  const resume = await prisma.resume.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!resume) return { error: "Resume not found" };
  const slug = slugify(title) || "resume";
  try {
    await prisma.resume.update({
      where: { id },
      data: { title, slug },
    });
  } catch (e) {
    if (e instanceof Error && e.message.includes("Unique constraint")) {
      return { error: "A resume with this title already exists." };
    }
    return { error: "Failed to update title." };
  }
  revalidatePath("/dashboard");
  revalidatePath(`/resumes/${resume.slug}`);
  return { slug };
}

export async function deleteResume(id: string): Promise<ResumeActionResult> {
  const session = await auth();
  if (!session?.user?.id) return { error: "Unauthorized" };
  const resume = await prisma.resume.findFirst({
    where: { id, userId: session.user.id },
  });
  if (!resume) return { error: "Resume not found" };
  await prisma.resume.delete({ where: { id } });
  revalidatePath("/dashboard");
  return {};
}
