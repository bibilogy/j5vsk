export const tabs = [
  { tab: "KPD reģistrs", title: "Kombinētie darbi" },
  { tab: "SR reģistrs", title: "Sasniedzāmie rezultāti" },
];

export type Tab = (typeof tabs)[number];

export type Grade = {
  grade_id: number;
  name: string;
  student_count: number;
  grade_group_id: number;
  group_name: string;
  class_teachers: string[];
};

export type Course = {
  course_id: number;
  name: string;
  icon: string;
  student_count: number;
};

export type Student = {
  student_id: number;
  name: string;
  is_awaiting_test: boolean;
};

export type CourseDetail = {
  course_id: number;
  course_name: string;
  course_field: string;
  grade_name: string;
  teachers: string[];
  students: Student[];
};

export type SubjectField =
  | "Sociālā un pilsoniskā"
  | "Kultūras izpratne un pašizpausme mākslā"
  | "Valodas"
  | "Dabaszinātnes"
  | "Matemātika"
  | "Tehnoloģijas"
  | "Veselība un fiziskās aktivitātes";

export type PendingTestEnrollment = {
  enrollment_id: number;
  student_name: string;
  grade_name: string;
  subject_name: string;
  subject_field: SubjectField;
};

export type GradeGroupCourse = {
  course_id: number;
  subject_name: string;
  subject_icon: string;
  subject_field: SubjectField;
  grade_group_name: string;
};
