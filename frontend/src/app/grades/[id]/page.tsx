import React from "react";
import SubjectCard from "../../components/SubjectCard";
import { Grid, Stack } from "@mui/material";
import { Subject } from "@/app/lib/types";

export default async function GradeSubjects({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const grade = await params;
  const apiUrl = process.env.API_ENDPOINT;
  const response = await fetch(`${apiUrl}/v4/subjects?grade_id=${grade.id}`);
  const subjects = await response.json();
  const gradeName = (subjects as Subject[])[0].gradeName;

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
          {gradeName}
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
