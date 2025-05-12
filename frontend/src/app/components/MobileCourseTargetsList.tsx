"use client";

import React from "react";
import Link from "next/link";
import { CourseSubject, TestPending } from "../lib/types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function MobileCourseTargetsList({
  courseSubjects,
}: {
  courseSubjects: CourseSubject[];
}) {
  return (
    <Box>
      {courseSubjects.length > 0 ? (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {courseSubjects.map((target) => (
            <React.Fragment key={target.courseTargetId}>
              <Link
                href={`/sasniedzamie-rezultati/${target.courseTargetId}`}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <ListItem
                  alignItems="flex-start"
                  sx={{
                    "&:hover": {
                      backgroundColor: "#f5f5f5",
                      cursor: "pointer",
                    },
                  }}
                >
                  <ListItemAvatar>
                    <Avatar>
                      <AssignmentIcon />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={`${target.subjectName}`}
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        {target.gradeGroupName}
                      </Typography>
                    }
                  />
                </ListItem>
              </Link>
              <Divider variant="inset" component="li" />
            </React.Fragment>
          ))}
        </List>
      ) : (
        <Typography align="center" sx={{ marginTop: 2 }}>
          Dati nav atrasti
        </Typography>
      )}
    </Box>
  );
}
