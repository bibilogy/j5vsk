"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Course, Grade } from "@/types/types";
import { fetchCoursesByGradeId, fetchGradeById } from "@/actions/data-fetching";
import CourseCard from "@/components/CourseCard";
import GradeHeader from "@/components/GradeHeader";

export default function CoursesPage() {
  const { gradeId } = useParams<{ gradeId: string }>();
  const [grade, setGrade] = useState<Grade>();
  const [courses, setCourses] = useState<Course[]>();

  useEffect(() => {
    fetchGradeById(Number(gradeId)).then(setGrade);
    fetchCoursesByGradeId(Number(gradeId)).then(setCourses);
  }, [gradeId]);

  if (!grade) return null;

  return (
    <div className="flex flex-col gap-6 h-full">
      <GradeHeader grade={grade} />

      <div className="overflow-y-auto flex-1 custom-scroll px-1">
        <div className="grid grid-cols-3 gap-3 pr-2 pt-1 pb-4 -mx-1">
          {courses?.map((c) => (
            <CourseCard
              key={c.course_id}
              course={c}
              gradeId={Number(gradeId)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
