import React from "react";
import SubjectCard from "../../components/SubjectCard";
import { Grid, Stack } from "@mui/material";

interface Subject {
  courseId: number;
  subjectName: string;
  subjectField: string;
  icon: string;
  teacherNames: string[];
  enrollemntCOunt: number;
}

export default async function GradeSubjects({
  params,
}: {
  params: Promise<{ id: number }>;
}) {
  const grade = await params;
  const response = await fetch(
    `http://localhost:3000/v4/subjects?grade_id=${grade.id}`
  );
  const subjects = await response.json();

  return (
    <Grid container spacing={2}>
      {subjects?.map((subject: Subject) => (
        <Grid key={subject.courseId}>
          <SubjectCard subject={subject} />
        </Grid>
      ))}
    </Grid>
  );
}
