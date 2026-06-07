"use client";

import { useEffect, useState } from "react";
import Header from "./header";
import Sidebar from "./sidebar";

export default function AppShell({ children }: { children: React.ReactNode }) {
  const [isDesktop, setIsDesktop] = useState(false);
  const [desktopSidebarOpen, setDesktopSidebarOpen] = useState(true);
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia("(min-width: 1024px)");

    const handleMediaQuery = (matches: boolean) => {
      setIsDesktop(matches);
      if (matches) {
        setMobileSidebarOpen(false);
      }
    };

    handleMediaQuery(mediaQuery.matches);

    const listener = (event: MediaQueryListEvent) => handleMediaQuery(event.matches);
    mediaQuery.addEventListener("change", listener);

    return () => {
      mediaQuery.removeEventListener("change", listener);
    };
  }, []);

  function toggleSidebar() {
    if (isDesktop) {
      setDesktopSidebarOpen((current) => !current);
      return;
    }
    setMobileSidebarOpen((current) => !current);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-zinc-50 dark:bg-zinc-950">
      <Sidebar
        isDesktop={isDesktop}
        desktopOpen={desktopSidebarOpen}
        mobileOpen={mobileSidebarOpen}
        onCloseMobile={() => setMobileSidebarOpen(false)}
      />

      <div className="flex min-w-0 flex-1 flex-col overflow-hidden">
        <Header onToggleSidebar={toggleSidebar} />
        <main className="flex-1 overflow-y-auto p-4 sm:p-6">{children}</main>
      </div>
    </div>
  );
}
