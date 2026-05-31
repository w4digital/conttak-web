import { SidebarInset, SidebarProvider } from "@/components/ui/sidebar";
import React from "react";
import AppHeader from "./_components/app-header";
import { AppSidebar } from "./_components/app-sidebar";


export default function AppLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return(
    <div className="[--header-height:calc(--spacing(14))]">
      <SidebarProvider className="flex flex-col">
        <AppHeader />
        <div className="flex flex-1">
          <AppSidebar variant="sidebar" />
          <SidebarInset>
            <main className="@container flex flex-1 flex-col gap-4 p-4">
              {children}
            </main>
          </SidebarInset>
        </div>
      </SidebarProvider>
    </div>
  )
}