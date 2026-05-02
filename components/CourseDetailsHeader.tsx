// components/CourseDetailsHeader.tsx
"use client";

import Image from "next/image";
import { BookOpen, Users } from "lucide-react";
import { Course, CourseDetail } from "@/types/types";

export default function CourseDetailsHeader({
  activeCourse,
  courseDetail,
}: {
  activeCourse: Course;
  courseDetail?: CourseDetail;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="hidden md:block flex-shrink-0">
        <Image
          src={`/icons/${activeCourse.icon}.svg`}
          alt={activeCourse.name}
          width={65}
          height={65}
          priority
          style={{
            filter:
              "brightness(0) saturate(100%) invert(8%) sepia(60%) saturate(4000%) hue-rotate(270deg) brightness(60%)",
          }}
        />
      </div>

      <div className="flex flex-col md:flex-row md:items-center gap-3 md:gap-6 rounded-[16px] bg-white/30 backdrop-blur-lg border border-white/45 px-5 py-3 flex-1">
        <div>
          <span className="text-[10px] font-semibold tracking-widest text-purple-900/50 uppercase">
            Priekšmets
          </span>
          <h2 className="text-base font-bold text-purple-950">
            {courseDetail?.course_name ?? activeCourse.name}
          </h2>
        </div>

        <div className="hidden md:block w-px h-8 bg-white/40" />
        <div className="block md:hidden w-full h-px bg-white/40" />

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-white/40 flex items-center justify-center flex-shrink-0">
            <BookOpen size={12} className="text-purple-900" />
          </div>
          <div>
            <span className="text-[10px] font-semibold tracking-widest text-purple-900/50 uppercase">
              Mācību joma
            </span>
            <p className="text-xs font-medium text-purple-950">
              {courseDetail?.course_field ?? "—"}
            </p>
          </div>
        </div>

        <div className="hidden md:block w-px h-8 bg-white/40" />
        <div className="block md:hidden w-full h-px bg-white/40" />

        <div className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-lg bg-white/40 flex items-center justify-center flex-shrink-0">
            <Users size={12} className="text-purple-900" />
          </div>
          <div>
            <span className="text-[10px] font-semibold tracking-widest text-purple-900/50 uppercase">
              {courseDetail?.teachers.length === 1 ? "Skolotājs" : "Skolotāji"}
            </span>
            <p className="text-xs font-medium text-purple-950">
              {courseDetail?.teachers.length
                ? courseDetail.teachers.join(", ")
                : "—"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
