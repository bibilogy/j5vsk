"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useAppStore } from "@/store/useAppStore";
import { Users, BookOpen } from "lucide-react";
import { Course } from "@/types/types";
import { fetchCoursesByGradeId } from "@/actions/data-fetching";
import CourseCard from "@/components/CourseCard";
import GradeHeader from "@/components/GradeHeader";

export default function CoursesPage() {
  const { activeGrade } = useAppStore();
  const [courses, setCourses] = useState<Course[]>();
  const router = useRouter();

  useEffect(() => {
    if (!activeGrade) router.replace("/grades");
  }, [activeGrade]);

  useEffect(() => {
    activeGrade && fetchCoursesByGradeId(activeGrade.grade_id).then(setCourses);
  }, [activeGrade?.grade_id]);

  if (!activeGrade) return null;

  return (
    <div className="flex flex-col gap-6 h-full">
      {/* Grade info header */}
      <GradeHeader grade={activeGrade} />

      {/* Courses grid */}
      <div className="overflow-y-auto flex-1 custom-scroll px-1">
        <div className="grid grid-cols-3 gap-3 pr-2 pt-1 pb-4 -mx-1">
          {courses?.map((c) => (
            <CourseCard key={c.course_id} course={c} />
          ))}
        </div>
      </div>
    </div>
  );
}
