import { auth } from "@/auth";
import { redirect, notFound } from "next/navigation";
import { prisma } from "@/lib/db";
import { ResumeEditor } from "./resume-editor";
import type { ResumeContent } from "@/lib/resume-types";

interface PageProps {
  params: Promise<{ slug: string }>;
}

export default async function ResumePage({ params }: PageProps) {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const { slug } = await params;
  const resume = await prisma.resume.findFirst({
    where: { userId: session.user.id, slug },
  });
  if (!resume) notFound();

  const content = resume.content as unknown as ResumeContent;

  return (
    <ResumeEditor
      resumeId={resume.id}
      slug={resume.slug}
      initialContent={content}
      title={resume.title}
    />
  );
}
