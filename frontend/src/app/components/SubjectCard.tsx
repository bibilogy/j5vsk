import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import Language from "./icons/Language";

interface Subject {
  courseId: number;
  subjectName: string;
  subjectField: string;
  icon: string;
  teacherNames: string[];
  enrollemntCOunt: number;
}

export default function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <Card
      sx={{
        minWidth: 200,
        maxWidth: 200,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
      }}
    >
      <CardActionArea>
        <Language />
        <CardContent>
          <Typography gutterBottom variant="h6" component="div">
            {subject.subjectName}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" color="primary">
          Share
        </Button>
      </CardActions>
    </Card>
  );
}
