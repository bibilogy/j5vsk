import CustomIcon from "@/app/components/CustomIcon";
import SubjectField from "@/app/components/SubjectField";
import TeachersList from "@/app/components/TeachersList";
import { Stack, Typography } from "@mui/material";

interface Student {
  enrollmentId: number;
  studentId: number;
  studentName: string;
  isTestPending: boolean;
}

interface Course {
  courseId: number;
  subjectName: string;
  subjectField: string;
  subjectIcon: string;
  gradeName: string;
  teacherNames: string[];
  students: Student[];
}

type SubjectType =
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

export default async function StudentsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const [gradeId, courseId] = slug;

  const request = await fetch(
    `http://localhost:3000/v4/students-by-course?grade_id=${gradeId}&course_id=${courseId}`
  );
  const response: Course = await request.json();

  return (
    <Stack
      spacing={1}
      sx={{
        flexDirection: "row",
        gap: "20px",
        backgroundColor: "#eee",
        padding: "10px",
        borderRadius: "15px",
      }}
    >
      <Stack>
        <CustomIcon icon={response.subjectIcon as SubjectType} size={70} />
      </Stack>
      <Stack spacing={1}>
        <Typography
          gutterBottom
          sx={{
            fontSize: "1rem",
            fontWeight: 700,
          }}
          component="div"
        >
          {response.subjectName.toUpperCase()}, {response.gradeName}
        </Typography>
        <Stack>
          {response?.teacherNames.length > 1 ? "Skolotāji: " : "Skolotājs: "}
          {response?.teacherNames.join(", ")}
        </Stack>
      </Stack>
    </Stack>
    // <ul>
    //   {response?.students?.map((student: Student) => (
    //     <li key={student.studentId}>{student.studentName}</li>
    //   ))}
    // </ul>
  );
}
