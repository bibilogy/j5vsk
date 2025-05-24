export interface CustomIconProps {
  icon: SubjectType; // Define a type for the 'icon' prop
  size?: number; // Optionally pass a size for scaling the SVG
}

export interface Grade {
  grade_id: number;
  name: string;
  grade_group_id: number;
  created_at: string;
  updated_at: string;
}

export interface GradeGroup {
  grade_group_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  grades: Grade[];
}

export interface GradeGroupSubject {
  grade_group_id: number;
  name: string;
  courses: { course_target_id: number; subject_name: string }[];
}

export interface Student {
  enrollmentId: number;
  studentId: number;
  studentName: string;
  isTestPending: boolean;
}

export interface Subject {
  courseId: number;
  gradeId: number;
  gradeName: string;
  subjectName: string;
  subjectField: string;
  icon: string;
  teacherNames: string[];
  enrollmentCount: number;
}

export type SubjectType =
  | "biology"
  | "chemistry"
  | "computer-science"
  | "culture"
  | "design"
  | "engineering"
  | "essential"
  | "fine-arts"
  | "geography"
  | "graphic"
  | "history"
  | "history-and-social"
  | "literature"
  | "math"
  | "music"
  | "physics"
  | "project"
  | "public"
  | "social"
  | "sports"
  | "talk-and-literature"
  | "talk"
  | "theater"
  | "shop-sign";

export type TestPending = {
  enrollmentId: number;
  courseId: number;
  studentName: string;
  gradeId: number;
  gradeName: string;
  subjectName: string;
  subjectField: string;
};

export type CourseSubject = {
  courseTargetId: number;
  subjectName: string;
  subjectField: string;
  gradeGroupName: string;
};

export type CourseTarget = CourseSubject & {
  subjectIcon: string;
  description: string;
  target: string;
};

export interface Course {
  courseId: number;
  subjectName: string;
  subjectField: string;
  subjectIcon: string;
  gradeName: string;
  teacherNames: string[];
  students: Student[];
}
