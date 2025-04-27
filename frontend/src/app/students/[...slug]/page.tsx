import CustomIcon from "@/app/components/CustomIcon";
import StudentList from "@/app/components/StudentList";
import { Stack, Typography } from "@mui/material";
import { Course, SubjectType } from "@/app/lib/types";

export default async function StudentsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const { slug } = await params;

  const [gradeId, courseId] = slug;
  const apiUrl = process.env.API_ENDPOINT;
  const request = await fetch(
    `${apiUrl}/v4/students-by-course?grade_id=${gradeId}&course_id=${courseId}`
  );
  const response: Course = await request.json();

  return (
    <Stack spacing={2}>
      <Stack
        spacing={1}
        sx={{
          flexDirection: "row",
          gap: "20px",
          backgroundColor: "#eee",
          borderRadius: "15px",
          padding: "20px",
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

      <Stack
        spacing={1}
        sx={{
          backgroundColor: "#eee",
          padding: "20px",
          borderRadius: "15px",
        }}
      >
        <StudentList studentList={response.students} />
      </Stack>
    </Stack>
  );
}
