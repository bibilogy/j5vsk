// app/page.tsx
"use client";

import { useAppStore } from "@/store/useAppStore";
import { tabs } from "@/types/types";
import KpdWindow from "@/components/KPDWindow";
import SrWindow from "@/components/SRWindow";

export default function HomePage() {
  // const { activeTab } = useAppStore();

  // return activeTab.tab === tabs[0].tab ? <KpdWindow /> : <SrWindow />;
  return null;
}
