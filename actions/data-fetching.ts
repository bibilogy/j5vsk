"use server";
import { supabase } from "@/lib/supabase";

// fetch all grade groups
export const fetchGradeGroups = async () => {
  const { data, error } = await supabase
    .from("grade_groups")
    .select("*")
    .order("grade_group_id");

  if (error) throw new Error("Error getting grade groups list");
  return data;
};

// fetch all grades by grade id
export const fetchGrades = async (gradeGroupId: number) => {
  const { data, error } = await supabase
    .from("grades")
    .select("*")
    .eq("grade_group_id", gradeGroupId)
    .order("grade_id");

  if (error) throw new Error("Error getting grades list");
  return data;
};

// fetch all grades with grade groups
export const fetchGradeGroupsAndGrades = async () => {
  const { data, error } = await supabase.rpc("get_grades_with_groups");

  if (error) throw new Error("Error getting grades list");
  return data?.[0] ?? [];
};

// fetch all courses by grade id
export const fetchCoursesByGradeId = async (gradeId: number) => {
  const { data, error } = await supabase.rpc("get_courses_by_grade_id", {
    p_grade_id: gradeId,
  });
  if (error) throw new Error("Error getting courses list");
  return data?.[0] ?? [];
};

// fetch all students by grade and course ids
export const fetchStudentsByGradeAndCourseIds = async (
  gradeId: number,
  courseId: number,
) => {
  const { data, error } = await supabase.rpc(
    "get_students_by_grade_and_course_ids",
    {
      p_grade_id: gradeId,
      p_course_id: courseId,
    },
  );
  if (error) throw new Error("Error getting students list");
  return data;
};

// fetch all teachers
export const fetchTeachers = async () => {
  const { data, error } = await supabase
    .from("teachers")
    .select("*")
    .order("name");
  if (error) throw new Error("Error getting teachers list");
  return data;
};

// post test status updates
export const updateIsTestPending = async (
  studentId: number,
  courseId: number,
  value: boolean,
) => {
  const { error } = await supabase
    .from("enrollments")
    .update({ is_test_pending: value })
    .eq("student_id", studentId)
    .eq("course_id", courseId);

  if (error) throw new Error("Error updating enrollment");
};
