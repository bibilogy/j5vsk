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

// fetch single grade by id
export const fetchGradeById = async (gradeId: number) => {
  const { data, error } = await supabase
    .from("grades")
    .select(
      `
      *,
      grade_groups (
        grade_group_id,
        name
      ),
      class_teachers (
        teachers (
          name
        )
      )
    `,
    )
    .eq("grade_id", gradeId)
    .single();

  if (error) throw new Error("Error getting grade");

  const subject = Array.isArray(data.class_teachers)
    ? data.class_teachers
    : [data.class_teachers];

  return {
    ...data,
    class_teachers: subject
      .map((ct: { teachers: { name: string } | null }) => ct?.teachers?.name)
      .filter(Boolean) as string[],
  };
};

// fetch single course by id
export const fetchCourseById = async (courseId: number) => {
  const { data, error } = await supabase
    .from("courses")
    .select(
      `
      course_id,
      course_target_id,
      subjects (
        subject_id,
        name,
        field,
        icon
      )
    `,
    )
    .eq("course_id", courseId)
    .single();

  if (error) throw new Error("Error getting course");

  const subject = Array.isArray(data.subjects)
    ? data.subjects[0]
    : data.subjects;

  return {
    course_id: data.course_id,
    course_target_id: data.course_target_id,
    name: subject.name,
    field: subject.field,
    icon: subject.icon,
    student_count: 0, // not needed on this page, satisfies the Course type
  };
};
