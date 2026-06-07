import type { Metadata } from "next";
import LoginForm from "./login-form";

export const metadata: Metadata = {
  title: "Entrar | Conttak",
  description: "Acesse sua conta Conttak",
};

export default function LoginPage() {
  return (
    <div className="flex flex-1 items-center justify-center bg-zinc-50 px-4 py-12 dark:bg-black">
      <div className="w-full max-w-md rounded-2xl border border-black/[.08] bg-white p-8 shadow-sm dark:border-white/[.08] dark:bg-zinc-950">
        <div className="mb-8 flex flex-col items-center gap-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-950 dark:text-zinc-50">
            Entrar na Conttak
          </h1>
          <p className="text-sm text-zinc-600 dark:text-zinc-400">
            Informe suas credenciais para continuar
          </p>
        </div>

        <LoginForm />

        <p className="mt-6 text-center text-sm text-zinc-600 dark:text-zinc-400">
          Não tem uma conta?{" "}
          <a
            href="/signup"
            className="font-medium text-zinc-950 underline-offset-4 hover:underline dark:text-zinc-50"
          >
            Cadastre-se
          </a>
        </p>
      </div>
    </div>
  );
}
