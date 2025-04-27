"use client";
import * as React from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import CustomBackdrop from "./CustomBackdrop";
import { Student } from "../lib/types";

export default function StudentList({
  studentList,
}: {
  studentList: Student[] | undefined;
}) {
  const [isOpen, setIsOpen] = React.useState<boolean>(false);

  // ⬇️ Local state based on initial studentList
  const [students, setStudents] = React.useState<Student[] | undefined>(
    studentList
  );

  const handleToggle = async (student: Student) => {
    setIsOpen(true);
    try {
      const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
      await fetch(`${apiUrl}/v4/update-test-pending`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          enrollmentId: student.enrollmentId,
          isTestPending: !student.isTestPending,
        }),
      });

      // ⬇️ Update local state to reflect the change
      setStudents((prevStudents) =>
        prevStudents?.map((s) =>
          s.enrollmentId === student.enrollmentId
            ? { ...s, isTestPending: !s.isTestPending }
            : s
        )
      );
    } catch (error) {
      console.error(error);
    } finally {
      setIsOpen(false);
    }
  };

  return (
    <>
      <List sx={{ width: "100%", maxWidth: 360, bgcolor: "#eee" }}>
        {students?.map((value) => {
          const labelId = `checkbox-list-label-${value.studentId}`;

          return (
            <ListItem key={value.studentId} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={() => handleToggle(value)}
                dense
              >
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={value.isTestPending}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ "aria-labelledby": labelId }}
                  />
                </ListItemIcon>
                <ListItemText id={labelId} primary={value.studentName} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <CustomBackdrop isOpen={isOpen} />
    </>
  );
}
