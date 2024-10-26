import React from "react";
import { Toaster } from "@/app/_components/ui/toaster";
import {
  SidebarInset,
  SidebarProvider,
  SidebarTrigger,
} from "@/app/_components/ui/sidebar";
import { AppSidebar } from "@/app/_components/app-sidebar";
import { ModeToggle } from "../_components/misc/toggle-mode";

interface LayoutProps {
  children?: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <SidebarProvider>
      <AppSidebar collapsible="icon" variant="floating" />
      <SidebarInset>
        <header className="flex h-12 shrink-0 items-center w-full justify-between pr-4">
          <div className="flex items-center gap-2 ">
            <SidebarTrigger className="-ml-1" />
          </div>
          <ModeToggle />
        </header>
        <main className="px-4">{children}</main>
        <Toaster />
      </SidebarInset>
    </SidebarProvider>
  );
}
