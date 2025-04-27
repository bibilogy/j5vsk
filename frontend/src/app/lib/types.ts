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
  | "design"
  | "engineering"
  | "essential"
  | "fine-arts"
  | "geography"
  | "history"
  | "literature"
  | "math"
  | "music"
  | "physics"
  | "social"
  | "sports"
  | "talk-and-literature"
  | "talk"
  | "theater";

export type TestPending = {
  enrollmentId: number;
  studentName: string;
  gradeName: string;
  subjectName: string;
  subjectField: string;
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
