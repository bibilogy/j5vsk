import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Language from "./icons/Language";
import { Stack } from "@mui/material";

interface Subject {
  courseId: number;
  subjectName: string;
  subjectField: string;
  icon: string;
  teacherNames: string[];
  enrollmentCount: number;
}

export default function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <Card
      sx={{
        minWidth: 250,
        maxWidth: 250,
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardActionArea>
        <CardContent>
          <Stack sx={{ display: "flex", flexDirection: "column", gap: "10px" }}>
            <Language />
            <Typography
              gutterBottom
              sx={{ fontSize: "1rem", fontWeight: 500 }}
              component="div"
            >
              {subject.subjectName}
            </Typography>
          </Stack>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Skatīt
        </Button>
      </CardActions>
    </Card>
  );
}
