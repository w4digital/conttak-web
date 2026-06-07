"use client";

import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);
    try {
      if (!email || !password) {
        throw new Error("Preencha e-mail e senha.");
      }
      // TODO: integrar com endpoint de autenticação
      await new Promise((resolve) => setTimeout(resolve, 600));
      router.push("/dashboard");
    } catch (err) {
      setError(err instanceof Error ? err.message : "Erro ao entrar.");
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4" noValidate>
      <div className="flex flex-col gap-1.5">
        <label
          htmlFor="email"
          className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
        >
          E-mail
        </label>
        <input
          id="email"
          name="email"
          type="email"
          autoComplete="email"
          required
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="h-11 rounded-lg border border-black/[.12] bg-white px-3 text-sm text-zinc-950 outline-none transition-colors focus:border-zinc-950 dark:border-white/[.14] dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-50"
          placeholder="voce@exemplo.com"
        />
      </div>

      <div className="flex flex-col gap-1.5">
        <div className="flex items-center justify-between">
          <label
            htmlFor="password"
            className="text-sm font-medium text-zinc-900 dark:text-zinc-100"
          >
            Senha
          </label>
          <a
            href="/forgot-password"
            className="text-xs font-medium text-zinc-600 underline-offset-4 hover:underline dark:text-zinc-400"
          >
            Esqueceu?
          </a>
        </div>
        <div className="relative">
          <input
            id="password"
            name="password"
            type={showPassword ? "text" : "password"}
            autoComplete="current-password"
            required
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="h-11 w-full rounded-lg border border-black/[.12] bg-white px-3 pr-20 text-sm text-zinc-950 outline-none transition-colors focus:border-zinc-950 dark:border-white/[.14] dark:bg-zinc-900 dark:text-zinc-50 dark:focus:border-zinc-50"
            placeholder="••••••••"
          />
          <button
            type="button"
            onClick={() => setShowPassword((v) => !v)}
            className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md px-2 py-1 text-xs font-medium text-zinc-600 hover:bg-black/[.04] dark:text-zinc-400 dark:hover:bg-white/[.06]"
            aria-label={showPassword ? "Ocultar senha" : "Mostrar senha"}
          >
            {showPassword ? "Ocultar" : "Mostrar"}
          </button>
        </div>
      </div>

      {error ? (
        <p
          role="alert"
          className="rounded-lg border border-red-500/30 bg-red-500/10 px-3 py-2 text-sm text-red-600 dark:text-red-400"
        >
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={submitting}
        className="mt-2 flex h-11 items-center justify-center rounded-full bg-zinc-950 text-sm font-medium text-zinc-50 transition-colors hover:bg-zinc-800 disabled:cursor-not-allowed disabled:opacity-60 dark:bg-zinc-50 dark:text-zinc-950 dark:hover:bg-zinc-200"
      >
        {submitting ? "Entrando..." : "Entrar"}
      </button>
    </form>
  );
}
