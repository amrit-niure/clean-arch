"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { LucideIcon, ChevronDown, ChevronRight } from "lucide-react";
import { cn } from "@/app/_lib/utils";
import { buttonVariants } from "@/app/_components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/app/_components/ui/tooltip";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/app/_components/ui/collapsible";

interface NavItemsProps {
  links: {
    title: string;
    label?: string;
    icon: LucideIcon;
    variant: "default" | "link" | "link";
    url?: string;
    submenu?: { title: string; url: string }[];
  }[];
  isCollapsed: boolean;
  activePath: string;
}

export function NavItems({ links, isCollapsed, activePath }: NavItemsProps) {
  const [openDropdowns, setOpenDropdowns] = useState<{
    [key: string]: boolean;
  }>({});

  const toggleDropdown = (title: string) => {
    if (!isCollapsed) {
      setOpenDropdowns((prev) => ({ ...prev, [title]: !prev[title] }));
    }
  };
  useEffect(() => {
    if (isCollapsed) {
      setOpenDropdowns({});
    }
  }, [isCollapsed]);

  return (
    <div className="group flex flex-col gap-4 py-1 px-2">
      <nav className="grid gap-1">
        {links.map((link, index) => {
          const isActive = link.url
            ? activePath === link.url
            : link.submenu?.some((item) => activePath === item.url);
          const hasSubmenu = link.submenu && link.submenu.length > 0;

          return (
            <div key={index}>
              <TooltipProvider>
                <Tooltip delayDuration={0}>
                  <TooltipTrigger asChild>
                    {hasSubmenu ? (
                      <Collapsible
                        open={openDropdowns[link.title]}
                        onOpenChange={() => toggleDropdown(link.title)}
                      >
                        <CollapsibleTrigger asChild>
                          <button
                            className={cn(
                              buttonVariants({
                                variant: "link",
                                size: "default",
                              }),
                              isActive && "underline ",
                              "justify-start w-full ",
                              isCollapsed && "w-10 h-10 p-0",
                            )}
                          >
                            <link.icon
                              className={cn(
                                "h-4 w-4",
                                isCollapsed ? "mx-auto" : "mr-2",
                              )}
                            />
                            {!isCollapsed && (
                              <>
                                <span>{link.title}</span>
                                {openDropdowns[link.title] ? (
                                  <ChevronDown className="ml-auto h-4 w-4" />
                                ) : (
                                  <ChevronRight className="ml-auto h-4 w-4" />
                                )}
                              </>
                            )}
                          </button>
                        </CollapsibleTrigger>
                        {!isCollapsed && (
                          <CollapsibleContent className="pl-6 mt-1">
                            {link.submenu?.map((subItem, subIndex) => (
                              <Link
                                key={subIndex}
                                href={subItem.url}
                                className={cn(
                                  buttonVariants({
                                    variant:
                                      activePath === subItem.url
                                        ? "link"
                                        : "link",
                                    size: "sm",
                                  }),
                                  "justify-start w-full",
                                  activePath === subItem.url && "underline ",
                                )}
                              >
                                {subItem.title}
                              </Link>
                            ))}
                          </CollapsibleContent>
                        )}
                      </Collapsible>
                    ) : (
                      <Link
                        href={link.url || "#"}
                        className={cn(
                          buttonVariants({
                            variant: isActive ? "link" : link.variant,
                            size: "default",
                          }),
                          isActive && " underline",
                          "justify-start w-full",
                          isCollapsed && "w-10 h-10 p-0",
                        )}
                      >
                        <link.icon
                          className={cn(
                            "h-4 w-4",
                            isCollapsed ? "mx-auto" : "mr-2",
                          )}
                        />
                        {!isCollapsed && <span>{link.title}</span>}
                        {link.label && !isCollapsed && (
                          <span
                            className={cn(
                              "ml-auto",
                              isActive ? "text-white" : "text-muted-foreground",
                            )}
                          >
                            {link.label}
                          </span>
                        )}
                      </Link>
                    )}
                  </TooltipTrigger>
                  {isCollapsed && (
                    <TooltipContent
                      side="right"
                      className="flex items-center gap-4"
                    >
                      {link.title}
                      {link.label && (
                        <span className="ml-auto text-muted-foreground">
                          {link.label}
                        </span>
                      )}
                    </TooltipContent>
                  )}
                </Tooltip>
              </TooltipProvider>
              {hasSubmenu && isCollapsed && (
                <Collapsible
                  open={openDropdowns[link.title]}
                  onOpenChange={() => toggleDropdown(link.title)}
                >
                  <CollapsibleContent className="pl-2 mt-1">
                    {link.submenu?.map((subItem, subIndex) => (
                      <TooltipProvider key={subIndex}>
                        <Tooltip delayDuration={0}>
                          <TooltipTrigger asChild>
                            <Link
                              href={subItem.url}
                              className={cn(
                                buttonVariants({
                                  variant:
                                    activePath === subItem.url
                                      ? "link"
                                      : "link",
                                  size: "icon",
                                }),
                                "justify-start w-10 h-10 p-0",
                                activePath === subItem.url && "underline ",
                              )}
                            >
                              <span className="sr-only">{subItem.title}</span>
                            </Link>
                          </TooltipTrigger>
                          <TooltipContent side="right">
                            {subItem.title}
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    ))}
                  </CollapsibleContent>
                </Collapsible>
              )}
            </div>
          );
        })}
      </nav>
    </div>
  );
}
