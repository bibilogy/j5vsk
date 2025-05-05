"use client";

import React from "react";
import Link from "next/link";
import { TestPending } from "../lib/types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import Divider from "@mui/material/Divider";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import AssignmentIcon from "@mui/icons-material/Assignment";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import { Box } from "@mui/material";

export default function MobilePendingsList({
  testsPending,
}: {
  testsPending: TestPending[];
}) {
  return (
    <Box>
      {testsPending.length > 0 ? (
        <List
          sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}
        >
          {testsPending.map((student) => (
            <React.Fragment key={student.enrollmentId}>
              <Link
                href={`/students/${student.gradeId}/${student.courseId}`}
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
                    primary={`${student.studentName} (${student.gradeName})`}
                    secondary={
                      <Typography
                        component="span"
                        variant="body2"
                        sx={{ color: "text.primary", display: "inline" }}
                      >
                        {student.subjectName}
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
