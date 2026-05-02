// app/grades/courses/course-details/page.tsx
"use client";

import {
  fetchStudentsByGradeAndCourseIds,
  updateIsTestPending,
} from "@/actions/data-fetching";
import { useAppStore } from "@/store/useAppStore";
import { CourseDetail, Student } from "@/types/types";
import { useRouter } from "next/navigation";
import { useEffect, useState, useMemo, useCallback } from "react";
import CourseDetailsHeader from "@/components/CourseDetailsHeader";
import { getStudentColumnDefs } from "@/types/definitions/studentColumns";
import DataGrid from "@/components/DataGrid";

export default function CourseDetailsPage() {
  const { activeGrade, activeCourse } = useAppStore();
  const [courseDetail, setCourseDetail] = useState<CourseDetail>();
  const [showPendingOnly, setShowPendingOnly] = useState(false);
  const router = useRouter();

  useEffect(() => {
    if (!activeGrade) router.replace("/");
  }, [activeGrade]);

  useEffect(() => {
    if (activeGrade && activeCourse) {
      fetchStudentsByGradeAndCourseIds(
        activeGrade.grade_id,
        activeCourse.course_id,
      ).then(setCourseDetail);
    }
  }, [activeGrade?.grade_id, activeCourse?.course_id]);

  const handleCheckboxChange = useCallback(
    async (student: Student, newValue: boolean) => {
      if (!activeCourse) return;

      useEffect(() => {
        if (!activeGrade) router.replace("/grades");
      }, [activeGrade]);

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
          activeCourse.course_id,
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
    [activeCourse],
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

  if (!activeGrade || !activeCourse) return null;

  return (
    <div className="flex flex-col gap-4 h-full">
      <CourseDetailsHeader
        activeCourse={activeCourse}
        courseDetail={courseDetail}
      />
      <DataGrid
        rowData={rowData}
        columnDefs={colDefs}
        getRowId={(row) => String(row.student_id)}
      />
    </div>
  );
}
