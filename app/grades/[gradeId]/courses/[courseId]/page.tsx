// app/grades/[gradeId]/courses/[courseId]/page.tsx
"use client";

import {
  fetchStudentsByGradeAndCourseIds,
  fetchCourseById,
  updateIsTestPending,
} from "@/actions/data-fetching";
import { CourseDetail, Student, Course } from "@/types/types";
import { useParams } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";
import CourseDetailsHeader from "@/components/CourseDetailsHeader";
import { getStudentColumnDefs } from "@/types/definitions/studentColumns";
import DataGrid from "@/components/DataGrid";

export default function CourseDetailsPage() {
  const { gradeId, courseId } = useParams<{
    gradeId: string;
    courseId: string;
  }>();
  const [course, setCourse] = useState<Course>();
  const [courseDetail, setCourseDetail] = useState<CourseDetail>();
  const [showPendingOnly, setShowPendingOnly] = useState(false);

  useEffect(() => {
    fetchCourseById(Number(courseId)).then(setCourse);
    fetchStudentsByGradeAndCourseIds(Number(gradeId), Number(courseId)).then(
      setCourseDetail,
    );
  }, [gradeId, courseId]);

  const handleCheckboxChange = useCallback(
    async (student: Student, newValue: boolean) => {
      if (!courseId) return;

      setCourseDetail((prev) => {
        if (!prev) return prev;
        return {
          ...prev,
          students: prev.students.map((s) =>
            s.student_id === student.student_id
              ? { ...s, is_awaiting_test: newValue }
              : s,
          ),
        };
      });

      try {
        await updateIsTestPending(
          student.student_id,
          Number(courseId),
          newValue,
        );
      } catch {
        setCourseDetail((prev) => {
          if (!prev) return prev;
          return {
            ...prev,
            students: prev.students.map((s) =>
              s.student_id === student.student_id
                ? { ...s, is_awaiting_test: !newValue }
                : s,
            ),
          };
        });
      }
    },
    [courseId],
  );

  const colDefs = useMemo(
    () => getStudentColumnDefs(handleCheckboxChange),
    [handleCheckboxChange],
  );

  const rowData = useMemo(() => {
    const students = courseDetail?.students ?? [];
    return showPendingOnly
      ? students.filter((s) => s.is_awaiting_test)
      : students;
  }, [courseDetail, showPendingOnly]);

  if (!course) return null;

  return (
    <div className="flex flex-col gap-4 h-full">
      <CourseDetailsHeader activeCourse={course} courseDetail={courseDetail} />
      <DataGrid
        rowData={rowData}
        columnDefs={colDefs}
        getRowId={(row) => String(row.student_id)}
      />
    </div>
  );
}
