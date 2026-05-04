"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { Course, Grade } from "@/types/types";
import { fetchCoursesByGradeId, fetchGradeById } from "@/actions/data-fetching";
import CourseCard from "@/components/CourseCard";
import GradeHeader from "@/components/GradeHeader";
import { HashLoader } from "react-spinners";

export default function CoursesPage() {
  const { gradeId } = useParams<{ gradeId: string }>();
  const [grade, setGrade] = useState<Grade>();
  const [courses, setCourses] = useState<Course[]>();
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      fetchGradeById(Number(gradeId)).then(setGrade),
      fetchCoursesByGradeId(Number(gradeId)).then(setCourses),
    ]).finally(() => setIsLoading(false));
  }, [gradeId]);

  if (isLoading)
    return (
      <div className="flex items-center justify-center h-full">
        <HashLoader color="#B4A0C4" size={35} />
      </div>
    );

  if (!grade) return null;

  return (
    <div className="flex flex-col gap-6 h-full">
      <GradeHeader grade={grade} />

      <div className="overflow-y-auto flex-1 custom-scroll px-3">
        <div
          className="gap-3 pt-1 pb-4"
          style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)" }}
        >
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
