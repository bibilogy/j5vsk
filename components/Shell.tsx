"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { ClipboardCheck, Crosshair } from "lucide-react";
import { tabs } from "@/types/types";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";

const navItems = [
  { tab: tabs[0], icon: <ClipboardCheck size={18} />, href: "/grades" },
  { tab: tabs[1], icon: <Crosshair size={18} />, href: "/grade-groups" },
];

const breadcrumbMap: Record<
  string,
  { label: string; parent?: { label: string; href: string } }
> = {
  "/": { label: "" },
  "/grades": { label: "KPD reģistrs" },
  "/grades/courses": {
    label: "Klase",
    parent: { label: "KPD reģistrs", href: "/grades" },
  },
  "/grades/course-details": {
    label: "Priekšmets",
    parent: { label: "Klase", href: "/grades/courses" },
  },
  "/targets": { label: "SR reģistrs" },
};

export default function Shell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isSR = pathname.startsWith("/grade-groups");

  const isActive = (href: string) => pathname.startsWith(href);

  const sidebarItemClass = (active: boolean) =>
    `w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200
    ${active ? "bg-white/50 text-purple-900 shadow-sm" : "text-purple-900/60 hover:bg-white/35"}`;

  const tabClass = (active: boolean) =>
    `px-3 py-1 rounded-full text-[11px] font-medium border transition-all duration-200
    ${active ? "bg-white/65 border-white/60 text-purple-950" : "bg-white/30 border-white/50 text-purple-900/70 hover:bg-white/45"}`;

  const currentCrumb = (() => {
    if (pathname === "/") return { label: "" };
    if (pathname === "/grades") return { label: "Klases" };
    if (pathname === "/grade-groups") return { label: "Klašu grupa" };
    if (/^\/grades\/[^/]+$/.test(pathname))
      return {
        label: "Mācību priekšmeti",
        parent: { label: "Klases", href: "/grades" },
      };
    if (/^\/grades\/[^/]+\/courses\/[^/]+$/.test(pathname))
      return {
        label: "Pieteikšanās",
        parent: {
          label: "Mācību priekšmeti",
          href: `/grades/${pathname.split("/")[2]}`,
        },
      };
    if (/^\/grade-groups\/[^/]+$/.test(pathname))
      return {
        label: "Mācību priekšmeti",
        parent: { label: "Klašu grupa", href: "/grade-groups" },
      };
    if (/^\/grade-groups\/[^/]+\/courses\/[^/]+$/.test(pathname))
      return {
        label: "Sasniedzāmie rezultāti",
        parent: {
          label: "Mācību priekšmeti",
          href: `/grade-groups/${pathname.split("/")[2]}`,
        },
      };
    return undefined;
  })();

  return (
    <div className="min-h-screen flex items-start lg:items-center justify-center p-4 pt-6 lg:pt-4">
      <div className="flex gap-4 items-stretch w-full lg:w-[clamp(600px,70vw,1100px)] h-screen lg:h-[clamp(480px,70vh,900px)]">
        {/* Sidebar — desktop */}
        <aside className="hidden lg:flex flex-col items-center justify-center px-2 py-4 gap-2 w-[52px] h-fit self-center flex-shrink-0 rounded-[20px] bg-white/20 backdrop-blur-lg border border-white/45">
          {navItems.map(({ tab, icon, href }) => {
            const active = isActive(href);
            return active ? (
              <span key={tab.tab} className={sidebarItemClass(true)}>
                {icon}
              </span>
            ) : (
              <Link
                key={tab.tab}
                href={href}
                className={sidebarItemClass(false)}
              >
                {icon}
              </Link>
            );
          })}
        </aside>

        {/* App window wrapper */}
        <div className="flex-1 flex flex-col min-w-0">
          {/* App window */}
          <div
            className="flex-1 flex flex-col rounded-[20px] bg-white/20 backdrop-blur-lg border border-white/45 overflow-hidden"
            style={
              isSR
                ? { borderTop: "3px solid #C4A882" }
                : pathname.startsWith("/grades")
                  ? { borderTop: "3px solid #a992bb" }
                  : {}
            }
          >
            <div className="px-5 py-4 border-b border-white/30 flex items-center justify-between flex-shrink-0">
              <Breadcrumb>
                <BreadcrumbList>
                  <BreadcrumbItem>
                    {pathname === "/" ? (
                      <BreadcrumbPage className="text-[11px] font-semibold tracking-widest text-purple-950/90 uppercase">
                        Sākums
                      </BreadcrumbPage>
                    ) : (
                      <BreadcrumbLink asChild>
                        <Link
                          href="/"
                          className="text-[11px] font-semibold tracking-widest text-purple-900/50 uppercase hover:text-purple-900/80 transition-colors"
                        >
                          Sākums
                        </Link>
                      </BreadcrumbLink>
                    )}
                  </BreadcrumbItem>

                  {currentCrumb?.parent && (
                    <>
                      <BreadcrumbSeparator className="text-purple-900/30" />
                      <BreadcrumbItem>
                        <BreadcrumbLink asChild>
                          <Link
                            href={currentCrumb.parent.href}
                            className="text-[11px] font-semibold tracking-widest text-purple-900/50 uppercase hover:text-purple-900/80 transition-colors"
                          >
                            {currentCrumb.parent.label}
                          </Link>
                        </BreadcrumbLink>
                      </BreadcrumbItem>
                    </>
                  )}

                  {currentCrumb?.label && pathname !== "/" && (
                    <>
                      <BreadcrumbSeparator className="text-purple-900/30" />
                      <BreadcrumbItem>
                        <BreadcrumbPage className="text-[11px] font-semibold tracking-widest text-purple-950/90 uppercase">
                          {currentCrumb.label}
                        </BreadcrumbPage>
                      </BreadcrumbItem>
                    </>
                  )}
                </BreadcrumbList>
              </Breadcrumb>

              <div className="gap-2 hidden md:flex">
                {navItems.map(({ tab, href }) => {
                  const active = isActive(href);
                  return active ? (
                    <span key={tab.tab} className={tabClass(true)}>
                      {tab.tab}
                    </span>
                  ) : (
                    <Link key={tab.tab} href={href} className={tabClass(false)}>
                      {tab.tab}
                    </Link>
                  );
                })}
              </div>
            </div>

            <div className="p-4 lg:p-8 flex-1 overflow-auto">{children}</div>
          </div>
        </div>
      </div>

      {/* Sidebar — mobile */}
      <aside className="lg:hidden fixed bottom-4 left-1/2 -translate-x-1/2 z-50 flex flex-row items-center px-4 py-2 gap-2 w-fit rounded-[20px] bg-white/20 backdrop-blur-lg border border-white/45">
        {navItems.map(({ tab, icon, href }) => (
          <Link
            key={tab.tab}
            href={href}
            className={sidebarItemClass(isActive(href))}
          >
            {icon}
          </Link>
        ))}
      </aside>
    </div>
  );
}
