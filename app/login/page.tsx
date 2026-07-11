"use client";

import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  async function login() {
    const supabase = createClient();

    await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: `${location.origin}/auth/callback`,
      },
    });
  }

  return (
    <main className="flex min-h-screen items-center justify-center">
      <button
        onClick={login}
        className="rounded-full bg-black px-8 py-4 text-white"
      >
        Continue with Google
      </button>
    </main>
  );
}