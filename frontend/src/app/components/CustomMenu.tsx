"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import AddBoxIcon from "@mui/icons-material/AddBox";
import FolderIcon from "@mui/icons-material/Folder";
import FolderOpenIcon from "@mui/icons-material/FolderOpen";
import AssignmentIcon from "@mui/icons-material/Assignment";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import SchoolIcon from "@mui/icons-material/School";
import { styled } from "@mui/material/styles";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import Link from "next/link";
import { GradeGroup, GradeGroupSubject } from "../lib/types";

const CustomTreeItem = styled(TreeItem)({
  [`& .${treeItemClasses.label}`]: {
    fontSize: "1.1rem",
  },
});

// Type guard for GradeGroup[]
function isGradeGroupArray(
  arr: GradeGroup[] | GradeGroupSubject[]
): arr is GradeGroup[] {
  return (
    arr.length === 0 || // if empty, assume GradeGroup[]
    (arr[0] && "grades" in arr[0])
  );
}

export default function CustomMenu({
  gradeGroups,
}: {
  gradeGroups: GradeGroup[] | GradeGroupSubject[];
}) {
  const isGradeGroup = isGradeGroupArray(gradeGroups);
  return (
    <Box sx={{ minHeight: 352, minWidth: 200 }}>
      <SimpleTreeView
        defaultExpandedItems={["grid"]}
        slots={{
          expandIcon: isGradeGroup ? AddBoxIcon : FolderIcon,
          collapseIcon: isGradeGroup
            ? IndeterminateCheckBoxIcon
            : FolderOpenIcon,
          endIcon: isGradeGroup ? SchoolIcon : AssignmentIcon,
        }}
      >
        {isGradeGroup
          ? gradeGroups.map((group) => (
              <CustomTreeItem
                key={`group-${group.grade_group_id}`}
                itemId={`group-${group.grade_group_id}`}
                label={group.name}
              >
                {group.grades.map((grade) => (
                  <CustomTreeItem
                    key={`grade-${grade.grade_id}`}
                    itemId={`grade-${grade.grade_id}`}
                    label={
                      <Link href={`/klases/${grade.grade_id}`}>
                        {grade.name}
                      </Link>
                    }
                  />
                ))}
              </CustomTreeItem>
            ))
          : gradeGroups.map((group) => (
              <CustomTreeItem
                key={`group-${group.grade_group_id}`}
                itemId={`group-${group.grade_group_id}`}
                label={group.name}
              >
                {group.courses.map((course) => (
                  <CustomTreeItem
                    key={`course-${course.course_target_id}`}
                    itemId={`course-${course.course_target_id}`}
                    label={
                      <Link
                        href={`/sasniedzamie-rezultati/${course.course_target_id}`}
                      >
                        {course.subject_name}
                      </Link>
                    }
                  />
                ))}
              </CustomTreeItem>
            ))}
      </SimpleTreeView>
    </Box>
  );
}
