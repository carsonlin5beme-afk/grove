import { useState, type FormEvent } from "react";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { GroveScene } from "@/components/botanical";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  GROK_PROVIDERS,
  authClient,
  authEnabled,
  signIn,
} from "@/lib/auth/client";

export const Route = createFileRoute("/login")({ component: Login });

function Login() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"in" | "up">("in");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [busy, setBusy] = useState(false);

  async function onEmail(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setBusy(true);
    try {
      if (mode === "up") {
        const res = await authClient.signUp.email({
          email,
          password,
          name: name || email.split("@")[0] || "Grower",
        });
        if (res.error) throw new Error(res.error.message || "Could not create account");
      } else {
        const res = await authClient.signIn.email({ email, password });
        if (res.error) throw new Error(res.error.message || "Could not sign in");
      }
      void navigate({ to: "/studio" });
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setBusy(false);
    }
  }

  return (
    <main className="relative flex min-h-dvh flex-col bg-paper">
      <div className="pointer-events-none absolute inset-x-0 bottom-0 opacity-80">
        <GroveScene className="mx-auto max-w-3xl" />
      </div>

      <div className="relative z-10 mx-auto flex w-full max-w-md flex-1 flex-col justify-start px-5 pb-40 pt-10 sm:justify-center">
        <Link to="/" className="font-display text-3xl text-ink">
          Grove
        </Link>
        <p className="mt-1 text-sm text-ink-soft">Save your acre. Come back to it.</p>

        <div className="mt-6 rounded-[28px] bg-paper-soft/90 p-5 shadow-border backdrop-blur-sm">
          {authEnabled ? (
            <>
              <div className="flex flex-col gap-2">
                {GROK_PROVIDERS.map((p) => (
                  <Button
                    key={p.providerId}
                    variant="outline"
                    className="w-full"
                    onClick={() => void signIn(p.providerId, { callbackURL: "/studio" })}
                  >
                    Continue with {p.label}
                  </Button>
                ))}
              </div>

              <div className="my-4 flex items-center gap-3 text-[11px] uppercase tracking-[0.16em] text-ink-faint">
                <span className="h-px flex-1 bg-ink/10" />
                or email
                <span className="h-px flex-1 bg-ink/10" />
              </div>

              <form onSubmit={(e) => void onEmail(e)} className="space-y-2.5">
                {mode === "up" && (
                  <Input
                    placeholder="Name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    autoComplete="name"
                  />
                )}
                <Input
                  type="email"
                  required
                  placeholder="Email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
                <Input
                  type="password"
                  required
                  minLength={8}
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete={mode === "up" ? "new-password" : "current-password"}
                />
                {error && <p className="text-xs text-coral-deep">{error}</p>}
                <Button type="submit" className="w-full" disabled={busy}>
                  {busy ? "Working…" : mode === "up" ? "Create account" : "Sign in"}
                </Button>
              </form>

              <button
                type="button"
                className="mt-3 w-full text-center text-xs text-ink-soft hover:text-ink"
                onClick={() => setMode(mode === "up" ? "in" : "up")}
              >
                {mode === "up" ? "Already have an account? Sign in" : "New here? Create an account"}
              </button>
            </>
          ) : (
            <p className="text-sm text-ink-soft">Sign-in is disabled in this environment.</p>
          )}
        </div>

        <Link to="/studio" className="mt-5 text-center text-sm text-ink-soft hover:text-ink">
          Continue without saving
        </Link>
      </div>
    </main>
  );
}
