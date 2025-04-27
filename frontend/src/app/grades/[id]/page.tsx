"use client"; // Mark the file as client-side

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation"; // Use next/navigation for Next 13+
import SubjectCard from "../../components/SubjectCard";
import { Grid, Skeleton, Stack, Typography } from "@mui/material";
import { Subject } from "@/app/lib/types";

export default function GradeSubjects({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const [subjects, setSubjects] = useState<Subject[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;

  // Ensure useRouter() runs only on the client side
  useEffect(() => {
    const fetchData = async () => {
      try {
        const grade = await params; // Get grade from the params
        const response = await fetch(`${apiUrl}/subjects?grade_id=${grade.id}`);
        if (!response.ok) {
          notFound(); // Set noDataFound state if the response is not ok
        } else {
          const subjects = await response.json();
          setSubjects(subjects);
        }
      } catch (error) {
        console.error("Error fetching subjects data:", error);
      } finally {
        setIsLoading(false); // Always stop loading when the request finishes
      }
    };

    fetchData();
  }, [params, apiUrl]);

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

  if (!subjects) {
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

  // Render the subjects when data is loaded
  return (
    <>
      <Stack sx={{ padding: "0 20px" }}>
        <Stack
          sx={{
            textAlign: { xs: "center", lg: "left" },
            fontWeight: "700",
            fontSize: "1.2rem",
            textTransform: "uppercase",
            marginBottom: "15px",
          }}
        >
          {subjects[0]?.gradeName} {/* Display the grade name */}
        </Stack>

        <Grid
          container
          spacing={4}
          justifyContent="flex-start"
          alignItems="center"
        >
          {subjects?.map((subject: Subject) => (
            <Grid key={subject.courseId}>
              <SubjectCard subject={subject} />
            </Grid>
          ))}
        </Grid>
      </Stack>
    </>
  );
}
