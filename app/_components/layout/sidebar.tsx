"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import {
  AlertCircle,
  Award,
  Book,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  DownloadCloud,
  Inbox,
  Users,
} from "lucide-react";
import { Separator } from "@/app/_components/ui/separator";
import { NavItems } from "./nav-items";
import Image from "next/image";
import { Button } from "@/app/_components/ui/button";
import { cn } from "@/app/_lib/utils";
import { useCollapse } from "@/store/useCollapse";

export function Sidebar() {
  const pathname = usePathname();
  const { isCollapsed, setIsCollapsed } = useCollapse();

  return (
    <div
      className={cn(
        "relative h-screen transition-all duration-300 ease-in-out",
        isCollapsed ? "w-16" : "w-60",
      )}
    >
      <div className="flex flex-col justify-between h-screen border-r">
        <div className="flex flex-col justify-between h-full">
          <div className="">
            <div className="flex items-center p-4">
              <Image
                width={40}
                height={40}
                src="/icons8-literature-50.png"
                alt="Logo"
                className="transition-all duration-300 ease-in-out"
              />
              {!isCollapsed && (
                <span className="ml-2 font-bold text-lg transition-opacity duration-300 ease-in-out">
                  HARMONY
                </span>
              )}
            </div>
            <Separator />
          </div>
          <div className="flex flex-1 flex-col justify-between">
            <NavItems
              links={[
                {
                  title: "Home",
                  icon: Inbox,
                  variant: "link",
                  url: "/dashboard",
                },
                {
                  title: "Appointments",
                  icon: Book,
                  variant: "link",
                  url: "/dashboard/appointments",
                },
                {
                  title: "Team",
                  icon: Users,
                  variant: "link",
                  url: "/dashboard/team",
                },
                {
                  title: "Customers",
                  icon: Users,
                  variant: "link",
                  url: "/dashboard/customers",
                },
                {
                  title: "Visa Applications",
                  icon: DownloadCloud,
                  variant: "link",
                  submenu: [
                    {
                      title: "Training Visa (407)",
                      url: "/dashboard/visa-applications/407",
                    },
                    {
                      title: "Work Visa (482)",
                      url: "/dashboard/visa-applications/482",
                    },
                    {
                      title: "Student Visa (500)",
                      url: "/dashboard/visa-applications/500",
                    },
                  ],
                },
                {
                  title: "Job Ready Program",
                  icon: Briefcase,
                  variant: "link",
                  url: "/dashboard/job-ready-program",
                },
                {
                  title: "Skills Assessment",
                  icon: Award,
                  variant: "link",
                  url: "/dashboard/skills-assessment",
                },
              ]}
              isCollapsed={isCollapsed}
              activePath={pathname}
            />
            <div>
              <Separator />
              <NavItems
                links={[
                  {
                    title: "Updates",
                    icon: AlertCircle,
                    variant: "link",
                    url: "/dashboard/updates",
                  },
                ]}
                isCollapsed={isCollapsed}
                activePath={pathname}
              />
            </div>
          </div>
        </div>
      </div>
      <Button
        variant="link"
        size="icon"
        className={`absolute top-4 right-1 md:flex ${
          isCollapsed ? "left-3 opacity-0" : ""
        } `}
        onClick={() => setIsCollapsed()}
      >
        {isCollapsed ? (
          <ChevronRight className="h-4 w-4" />
        ) : (
          <ChevronLeft className="h-4 w-4" />
        )}
      </Button>
    </div>
  );
}
