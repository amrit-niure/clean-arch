import React from "react";
import { Sidebar } from "@/app/_components/layout/sidebar";
import { Toaster } from "@/app/_components/ui/toaster";
import NavBar from "@/app/_components/layout/nav-bar";

interface MailPageProps {
  children?: React.ReactNode;
}

export default function MailPage({ children }: MailPageProps) {
  return (
    <div className="flex h-screen overflow-hidden">
      <div className="">
        <Sidebar />
      </div>
      <div className="flex-1 flex flex-col overflow-hidden">
        <NavBar />
        <main className="flex-1 overflow-y-auto p-4">{children}</main>
      </div>
      <Toaster />
    </div>
  );
}
