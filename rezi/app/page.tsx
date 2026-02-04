import Link from "next/link";
import { Button } from "@/components/ui/button";
import { auth } from "@/auth";
import { logout } from "@/app/actions/auth";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const session = await auth();

  // Jei vartotojas prisijungęs → redirect į /dashboard
  if (session?.user) {
    redirect("/dashboard");
  }

  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <Link href="/" className="font-semibold text-lg">
            Resume Builder
          </Link>
          <nav className="flex items-center gap-4">
            <Link href="/login">
              <Button variant="ghost">Log in</Button>
            </Link>
            <Link href="/register">
              <Button>Get started</Button>
            </Link>
          </nav>
        </div>
      </header>
      <main className="flex-1 flex items-center justify-center px-4 py-16">
        <div className="max-w-2xl text-center space-y-6">
          <h1 className="text-4xl font-bold tracking-tight sm:text-5xl">
            Build a resume that gets noticed
          </h1>
          <p className="text-lg text-muted-foreground">
            Create, edit, and export professional resumes. Use AI to improve bullet points
            and generate a strong summary.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <Link href="/register">
              <Button size="lg" className="text-base">
                Create free account
              </Button>
            </Link>
            <Link href="/login">
              <Button size="lg" variant="outline" className="text-base">
                Log in
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
}
