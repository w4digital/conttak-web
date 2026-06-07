"use client";

import { X } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";

const navItems = [
  { href: "/dashboard", label: "Home" },
  { href: "/eventos", label: "Eventos" },
  { href: "/contas", label: "Contas" },
  { href: "/parcelamentos", label: "Parcelamentos" },
  { href: "/recorrencias", label: "Recorrências" },
];

type SidebarProps = {
  isDesktop: boolean;
  desktopOpen: boolean;
  mobileOpen: boolean;
  onCloseMobile: () => void;
};

function NavContent({ onNavigate }: { onNavigate?: () => void }) {
  const pathname = usePathname();

  return (
    <>
      <div className="flex h-16 items-center border-b border-black/[.08] px-6 dark:border-white/[.08]">
        <span className="text-lg font-bold tracking-tight text-zinc-950 dark:text-zinc-50">
          Conttak
        </span>
      </div>
      <nav className="flex flex-1 flex-col gap-1 p-3">
        {navItems.map(({ href, label }) => {
          const active = pathname === href || pathname.startsWith(href + "/");
          return (
            <Link
              key={href}
              href={href}
              onClick={onNavigate}
              className={`flex h-9 items-center rounded-lg px-3 text-sm font-medium transition-colors ${
                active
                  ? "bg-zinc-100 text-zinc-950 dark:bg-zinc-800 dark:text-zinc-50"
                  : "text-zinc-600 hover:bg-zinc-50 hover:text-zinc-950 dark:text-zinc-400 dark:hover:bg-zinc-800 dark:hover:text-zinc-50"
              }`}
            >
              {label}
            </Link>
          );
        })}
      </nav>
    </>
  );
}

export default function Sidebar({
  isDesktop,
  desktopOpen,
  mobileOpen,
  onCloseMobile,
}: SidebarProps) {
  return (
    <>
      <aside
        className={`hidden lg:flex lg:shrink-0 lg:flex-col lg:border-r lg:border-black/[.08] lg:bg-white lg:transition-all lg:duration-200 dark:lg:border-white/[.08] dark:lg:bg-zinc-900 ${
          isDesktop && desktopOpen ? "lg:w-60" : "lg:w-0 lg:overflow-hidden lg:border-r-0"
        }`}
      >
        <NavContent />
      </aside>

      <div
        className={`fixed inset-0 z-40 bg-black/40 transition-opacity lg:hidden ${
          mobileOpen ? "opacity-100" : "pointer-events-none opacity-0"
        }`}
        onClick={onCloseMobile}
      />

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-black/[.08] bg-white shadow-xl transition-transform dark:border-white/[.08] dark:bg-zinc-900 lg:hidden ${
          mobileOpen ? "translate-x-0" : "-translate-x-full"
        }`}
        aria-hidden={!mobileOpen}
      >
        <div className="flex h-16 items-center justify-end border-b border-black/[.08] px-4 dark:border-white/[.08]">
          <button
            type="button"
            aria-label="Fechar menu lateral"
            className="inline-flex h-8 w-8 items-center justify-center rounded-md text-zinc-600 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800"
            onClick={onCloseMobile}
          >
            <X className="h-4 w-4" />
          </button>
        </div>
        <div className="min-h-0 flex-1 overflow-y-auto">
          <NavContent onNavigate={onCloseMobile} />
        </div>
      </aside>
    </>
  );
}
