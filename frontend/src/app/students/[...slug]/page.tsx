"use client";
import CustomIcon from "@/app/components/CustomIcon";
import StudentList from "@/app/components/StudentList";
import { Skeleton, Stack, Typography } from "@mui/material";
import { Course, SubjectType } from "@/app/lib/types";
import { useEffect, useState } from "react";
import { notFound } from "next/navigation";

export default function StudentsPage({
  params,
}: {
  params: Promise<{ slug: string[] }>;
}) {
  const [course, setCourse] = useState<Course | null>(null); // Ensure `null` state to handle missing data
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  // Use `useEffect` to handle the async logic
  useEffect(() => {
    const fetchData = async () => {
      try {
        const { slug } = await params;
        const [gradeId, courseId] = slug;
        const response = await fetch(
          `${apiUrl}/v4/students-by-course?grade_id=${gradeId}&course_id=${courseId}`
        );

        if (!response.ok) {
          notFound(); // Trigger 404 page if the response is not okay
        }

        const crs: Course = await response.json();
        setCourse(crs);
      } catch (error) {
        console.error("Error fetching subjects data:", error);
        notFound(); // Trigger 404 page if there's an error during fetch
      } finally {
        setIsLoading(false); // Set loading to false once the fetch is completed
      }
    };

    fetchData();
  }, [params, apiUrl]);

  // Handle the case where `course` is not loaded yet or data is not available
  if (isLoading) {
    return (
      <Stack width="100%" height="100%">
        <Skeleton
          animation="wave"
          variant="rectangular"
          width="100%"
          height="100%"
        />
      </Stack>
    );
  }

  if (!course) {
    return (
      <Stack
        sx={{
          width: "100%",
          height: "100%",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          borderRadius: "15px",
          backgroundColor: "#eee",
        }}
      >
        <Typography variant="h6">Dati nav atrasti</Typography>
      </Stack>
    );
  }

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
          <CustomIcon icon={course?.subjectIcon as SubjectType} size={70} />
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
            {(course?.subjectName?.toUpperCase() || "No Subject").toUpperCase()}
            ,{course?.gradeName || "No Grade"}
          </Typography>

          <Stack>
            {course.teacherNames.length > 1 ? "Skolotāji: " : "Skolotājs: "}
            {course?.teacherNames.join(", ")}
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
        {/* Render the student list */}
        <StudentList studentList={course?.students || []} />
      </Stack>
    </Stack>
  );
}
