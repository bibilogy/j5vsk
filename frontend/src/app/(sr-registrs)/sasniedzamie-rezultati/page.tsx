"use client";
import CoursesTargetsList from "@/app/components/CousesTargetsList";
import { Skeleton } from "@mui/material";
import { CourseSubject } from "../../lib/types";
import { useEffect, useState } from "react";

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const [courseSubjects, setCourseSubjects] = useState<CourseSubject[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/msr/course-subjects`);
        const tests = await response.json();
        setCourseSubjects(tests);
      } catch (error) {
        console.error("Error fetching course subjects:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return isLoading ? (
    <Skeleton
      animation="wave"
      variant="rectangular"
      width="100%"
      height="100%"
    />
  ) : (
    <CoursesTargetsList courseSubjects={courseSubjects} />
  );
}
