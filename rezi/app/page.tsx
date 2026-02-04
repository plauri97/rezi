"use client"; // client-side redirect

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { useSession } from "@/auth"; // client-side hook, jei naudojama

export default function HomePage() {
  const router = useRouter();
  const session = useSession(); // client-side session

  // Jei prisijungęs → nukreipti į dashboard
  useEffect(() => {
    if (session?.user) {
      router.push("/dashboard");
    }
  }, [session, router]);

  // Landing page turinys
  return (
    <div className="min-h-screen flex flex-col">
      <header className="border-b">
        <div className="container mx-auto px-4 h-14 flex items-center justify-between">
          <h1 className="font-semibold text-lg">Resume Builder</h1>
          <nav className="flex gap-4">
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
