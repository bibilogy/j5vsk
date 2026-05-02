// components/CourseCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { Users } from "lucide-react";
import { Course } from "@/types/types";
import { useAppStore } from "@/store/useAppStore";

export default function CourseCard({ course }: { course: Course }) {
  const { setActiveCourse } = useAppStore();

  return (
    <Link
      href="/grades/courses/course-details"
      onClick={() => setActiveCourse(course)}
      className="relative flex flex-col justify-between rounded-[16px] bg-white/30 backdrop-blur-lg border border-white/45 p-4 aspect-[16/7] transition-all duration-200 hover:-translate-y-1 hover:shadow-lg hover:bg-white/40 active:translate-y-0 active:shadow-none"
    >
      {/* Top: name left, icon right */}
      <div className="flex items-start justify-between">
        <span className="text-xs font-semibold text-purple-950 leading-tight max-w-[60%]">
          {course.name}
        </span>
        <Image
          src={`/icons/${course.icon}.svg`}
          alt={course.name}
          width={36}
          height={36}
          style={{
            filter:
              "brightness(0) saturate(100%) invert(8%) sepia(60%) saturate(4000%) hue-rotate(270deg) brightness(60%)",
          }}
        />
      </div>

      {/* Bottom: student count right */}
      <div className="flex justify-end items-center gap-1">
        <Users size={10} className="text-purple-900/50" />
        <span className="text-[10px] font-medium text-purple-900/50">
          {course.student_count}
        </span>
      </div>
    </Link>
  );
}
