"use client";

import { LogOut, Menu, Moon, Settings, Sun, User } from "lucide-react";
import { useTheme } from "next-themes";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState } from "react";

const titles: Record<string, string> = {
  "/dashboard": "Home",
  "/eventos": "Eventos",
  "/contas": "Contas",
  "/parcelamentos": "Parcelamentos",
  "/recorrencias": "Recorrências",
  "/perfil": "Perfil",
  "/configuracoes": "Configurações",
};

export default function Header({ onToggleSidebar }: { onToggleSidebar: () => void }) {
  const pathname = usePathname();
  const segment = "/" + pathname.split("/")[1];
  const title = titles[segment] ?? "Conttak";
  const { resolvedTheme, setTheme } = useTheme();
  const [avatarMenuOpen, setAvatarMenuOpen] = useState(false);
  const avatarMenuRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onDocumentClick(event: MouseEvent) {
      if (!avatarMenuRef.current) return;
      if (!avatarMenuRef.current.contains(event.target as Node)) {
        setAvatarMenuOpen(false);
      }
    }

    document.addEventListener("mousedown", onDocumentClick);
    return () => document.removeEventListener("mousedown", onDocumentClick);
  }, []);

  return (
    <header className="flex h-16 shrink-0 items-center justify-between border-b border-black/[.08] bg-white px-6 dark:border-white/[.08] dark:bg-zinc-900">
      <div className="flex items-center gap-3">
        <button
          type="button"
          aria-label="Alternar menu lateral"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/[.08] text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-white/[.08] dark:text-zinc-200 dark:hover:bg-zinc-800"
          onClick={onToggleSidebar}
        >
          <Menu className="h-4 w-4" />
        </button>
        <h1 className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
          {title}
        </h1>
      </div>

      <div className="flex items-center gap-2">
        <button
          type="button"
          aria-label="Alternar tema"
          className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-black/[.08] text-zinc-700 transition-colors hover:bg-zinc-100 dark:border-white/[.08] dark:text-zinc-200 dark:hover:bg-zinc-800"
          onClick={() => setTheme(resolvedTheme === "dark" ? "light" : "dark")}
        >
          {resolvedTheme === "dark" ? (
            <Sun className="h-4 w-4" />
          ) : (
            <Moon className="h-4 w-4" />
          )}
        </button>

        <div className="relative" ref={avatarMenuRef}>
        <button
          type="button"
          className="flex h-8 w-8 items-center justify-center rounded-full bg-zinc-100 text-xs font-semibold text-zinc-600 transition-colors hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:bg-zinc-700"
          onClick={() => setAvatarMenuOpen((current) => !current)}
          aria-label="Abrir menu do usuário"
        >
          U
        </button>

        {avatarMenuOpen ? (
          <div className="absolute right-0 top-10 z-30 w-56 overflow-hidden rounded-xl border border-black/[.08] bg-white p-1 shadow-lg dark:border-white/[.08] dark:bg-zinc-900">
            <Link
              href="/perfil"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
              onClick={() => setAvatarMenuOpen(false)}
            >
              <User className="h-4 w-4" />
              Perfil
            </Link>
            <Link
              href="/configuracoes"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-200 dark:hover:bg-zinc-800"
              onClick={() => setAvatarMenuOpen(false)}
            >
              <Settings className="h-4 w-4" />
              Configurações
            </Link>
            <Link
              href="/login"
              className="flex items-center gap-2 rounded-lg px-3 py-2 text-sm text-red-600 transition-colors hover:bg-zinc-100 dark:text-red-400 dark:hover:bg-zinc-800"
              onClick={() => setAvatarMenuOpen(false)}
            >
              <LogOut className="h-4 w-4" />
              Sair
            </Link>
          </div>
        ) : null}
        </div>
      </div>
    </header>
  );
}
