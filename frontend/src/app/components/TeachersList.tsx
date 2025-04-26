import { Chip, Stack, Typography } from "@mui/material";
import React from "react";

function TeachersList({ teachers }: { teachers: string[] }) {
  const teachersList = teachers.map((teacher) => (
    <Chip
      label={teacher}
      key={teacher}
      sx={{
        minWidth: 150, // ensures it's not stretched by parent
      }}
    ></Chip>
  ));
  return <Stack spacing={1}>{teachersList}</Stack>;
}

export default TeachersList;
