"use client";

import React, { useEffect, useState } from "react";
import { notFound } from "next/navigation";
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

  useEffect(() => {
    const fetchData = async () => {
      try {
        const grade = await params;
        const response = await fetch(`${apiUrl}/subjects?grade_id=${grade.id}`);
        if (!response.ok) {
          notFound();
        } else {
          const data = await response.json();
          setSubjects(data);
        }
      } catch (error) {
        console.error("Error fetching subjects data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [params, apiUrl]);

  if (!subjects && !isLoading) {
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
    <Stack sx={{ padding: "0 20px" }}>
      {/* Grade name or Skeleton */}
      <Stack
        sx={{
          height: 40,
          display: "flex",
          alignItems: { xs: "center", lg: "flex-start" },
          marginBottom: "15px",
        }}
      >
        <Typography
          variant="h6"
          sx={{
            fontWeight: 700,
            fontSize: "1.2rem",
            textTransform: "uppercase",
          }}
        >
          {isLoading ? null : subjects?.[0]?.gradeName}
        </Typography>
      </Stack>

      {/* Grid: Always present, conditional content */}
      <Grid
        container
        spacing={4}
        sx={{
          justifyContent: { xs: "center", lg: "flex-start" },
          alignItems: "center",
        }}
      >
        {isLoading
          ? [...Array(12)].map((_, index) => (
              <Grid key={index}>
                <Skeleton
                  animation="wave"
                  variant="rectangular"
                  width={280}
                  height={150}
                />
              </Grid>
            ))
          : subjects?.map((subject) => (
              <Grid key={subject.courseId}>
                <SubjectCard subject={subject} />
              </Grid>
            ))}
      </Grid>
    </Stack>
  );
}
