"use client";

import { ClipboardCheck, Crosshair } from "lucide-react";
import { tabs } from "@/types/types";
import { useAppStore } from "@/store/useAppStore";

const navItems = [
  { tab: tabs[0], icon: <ClipboardCheck size={18} /> },
  { tab: tabs[1], icon: <Crosshair size={18} /> },
];

export default function Sidebar() {
  const { activeTab, setActiveTab } = useAppStore();

  return (
    <aside className="flex flex-row lg:flex-col items-center justify-center px-4 py-2 lg:px-2 lg:py-4 gap-2 w-fit lg:w-[52px] h-fit rounded-[20px] bg-white/20 backdrop-blur-lg border border-white/45">
      {navItems.map(({ tab, icon }) => (
        <button
          key={tab.tab}
          onClick={() => setActiveTab(tab)}
          className={`w-9 h-9 rounded-xl flex items-center justify-center transition-all duration-200
            ${
              activeTab.tab === tab.tab
                ? "bg-white/50 text-purple-900 shadow-sm"
                : "text-purple-900/60 hover:bg-white/35"
            }`}
        >
          {icon}
        </button>
      ))}
    </aside>
  );
}
