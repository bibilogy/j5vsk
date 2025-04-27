import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Typography from "@mui/material/Typography";
import CardActionArea from "@mui/material/CardActionArea";
import CardActions from "@mui/material/CardActions";
import { Stack, Box } from "@mui/material";
import CustomIcon from "./CustomIcon";
import Link from "next/link";
import { Subject, SubjectType } from "../lib/types";

export default function SubjectCard({ subject }: { subject: Subject }) {
  return (
    <Card
      sx={{
        position: "relative", // ⬅️ important so the icon positions relative to this
        minWidth: "280px",
        maxWidth: "280px",
        minHeight: 150,
        height: "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        borderRadius: "15",
        backgroundColor: "#eee",
        overflow: "hidden",
      }}
    >
      <CardActionArea>
        <CardContent>
          <Stack
            direction="row"
            spacing={1}
            alignItems="flex-start"
            justifyContent="space-between"
          >
            {/* Left: Subject Info */}
            <Stack spacing={3}>
              <Typography
                gutterBottom
                sx={{
                  fontSize: "1rem",
                  fontWeight: 700,
                  textTransform: "uppercase",
                  height: 40,
                }}
                component="div"
              >
                {subject.subjectName}
              </Typography>
            </Stack>

            {/* Right: Custom Icon */}
            <Box
              sx={{
                minWidth: 60, // reserve space
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <CustomIcon icon={subject.icon as SubjectType} size={50} />
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>

      <CardActions
        sx={{
          display: "flex",
          justifyContent: "space-between",
          margin: "0 10px",
        }}
      >
        <Link
          style={{
            color: "#1976d2",
            textTransform: "uppercase",
          }}
          href={`/students/${subject.gradeId}/${subject.courseId}`}
        >
          Skatīt
        </Link>
        <Typography sx={{ fontSize: "0.8rem" }}>
          Skolēnu skaits: {subject.enrollmentCount}
        </Typography>
      </CardActions>
    </Card>
  );
}
