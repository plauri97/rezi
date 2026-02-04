import { auth } from "@/auth";
import { redirect } from "next/navigation";
import Link from "next/link";
import { prisma } from "@/lib/db";
import { Button } from "@/components/ui/button";
import { logout } from "@/app/actions/auth";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { CreateResumeForm } from "./create-resume-form";
import { ResumeActions } from "./resume-actions";
import { FileText } from "lucide-react";

export default async function DashboardPage() {
  const session = await auth();
  if (!session?.user?.id) redirect("/login");

  const resumes = await prisma.resume.findMany({
    where: { userId: session.user.id },
    orderBy: { updatedAt: "desc" },
  });

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg">
            Resume Builder
          </Link>
          <nav className="flex items-center gap-4">
            <span className="text-sm text-muted-foreground">
              {session.user.email}
            </span>
            <form action={logout}>
              <Button type="submit" variant="outline" size="sm">
                Sign out
              </Button>
            </form>
          </nav>
        </div>
      </header>
      <main className="container mx-auto px-4 py-8 flex-1">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold">My Resumes</h1>
            <p className="text-muted-foreground">
              Create and manage your resumes.
            </p>
          </div>
          <CreateResumeForm />
        </div>
        {resumes.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <FileText className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-muted-foreground text-center mb-4">
                You don&apos;t have any resumes yet. Create your first one to get
                started.
              </p>
              <CreateResumeForm />
            </CardContent>
          </Card>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {resumes.map((r) => (
              <li key={r.id}>
                <Card className="h-full flex flex-col">
                  <CardHeader className="flex flex-row items-start justify-between space-y-0 pb-2">
                    <div className="space-y-1.5 min-w-0">
                      <CardTitle className="text-base truncate">
                        <Link
                          href={`/resumes/${r.slug}`}
                          className="hover:underline"
                        >
                          {r.title}
                        </Link>
                      </CardTitle>
                      <CardDescription>
                        Updated{" "}
                        {new Date(r.updatedAt).toLocaleDateString(undefined, {
                          month: "short",
                          day: "numeric",
                          year: "numeric",
                        })}
                      </CardDescription>
                    </div>
                    <ResumeActions resumeId={r.id} resumeTitle={r.title} />
                  </CardHeader>
                  <CardContent className="pt-0 flex-1">
                    <Link href={`/resumes/${r.slug}`}>
                      <Button variant="outline" size="sm" className="w-full">
                        Edit resume
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              </li>
            ))}
          </ul>
        )}
      </main>
    </div>
  );
}
