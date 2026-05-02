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
  teachers: string[];
  students: Student[];
};
