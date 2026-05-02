import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { Course, Grade, Tab, tabs } from "@/types/types";

type AppStore = {
  activeTab: Tab;
  activeGradeGroup: number | null;
  activeGrade: Grade | null;
  activeCourse: Course | null;
  setActiveTab: (tab: Tab) => void;
  setActiveGradeGroup: (gradeGroup: number) => void;
  setActiveGrade: (grade: Grade) => void;
  setActiveCourse: (course: Course) => void;
  clearAll: () => void;
  clearFromGrade: () => void;
  clearFromCourse: () => void;
};

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      activeTab: tabs[0],
      activeGradeGroup: null,
      activeGrade: null,
      activeCourse: null,
      setActiveTab: (tab) => set({ activeTab: tab }),
      setActiveGradeGroup: (gradeGroup) =>
        set({ activeGradeGroup: gradeGroup }),
      setActiveGrade: (grade) => set({ activeGrade: grade }),
      setActiveCourse: (course) => set({ activeCourse: course }),
      clearFromGrade: () => set({ activeGrade: null, activeCourse: null }),
      clearFromCourse: () => set({ activeCourse: null }),
    }),
    {
      name: "app-store",
      storage: createJSONStorage(() => sessionStorage),
    },
  ),
);
