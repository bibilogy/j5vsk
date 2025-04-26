"use client";

import * as React from "react";
import Box from "@mui/material/Box";
import AddBoxIcon from "@mui/icons-material/AddBox";
import IndeterminateCheckBoxIcon from "@mui/icons-material/IndeterminateCheckBox";
import SchoolIcon from "@mui/icons-material/School";
import { styled } from "@mui/material/styles";
import { SimpleTreeView } from "@mui/x-tree-view/SimpleTreeView";
import { TreeItem, treeItemClasses } from "@mui/x-tree-view/TreeItem";
import Link from "next/link";

interface Grade {
  grade_id: number;
  name: string;
  grade_group_id: number;
  created_at: string;
  updated_at: string;
}

interface GradeGroup {
  grade_group_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  grades: Grade[];
}

const CustomTreeItem = styled(TreeItem)({
  [`& .${treeItemClasses.iconContainer}`]: {
    "& .close": {
      opacity: 0.3,
    },
  },
});

export default function CustomIcons({
  gradeGroups,
}: {
  gradeGroups: GradeGroup[];
}) {
  return (
    <Box sx={{ minHeight: 352, minWidth: 200 }}>
      <SimpleTreeView
        defaultExpandedItems={["grid"]}
        slots={{
          expandIcon: AddBoxIcon,
          collapseIcon: IndeterminateCheckBoxIcon,
          endIcon: SchoolIcon,
        }}
      >
        {gradeGroups.map((group) => (
          <CustomTreeItem
            key={`group-${group.grade_group_id}`}
            itemId={`group-${group.grade_group_id}`}
            label={group.name}
          >
            {group.grades.map((grade) => (
              <Link key={grade.grade_id} href={`/grades/${grade.grade_id}`}>
                <CustomTreeItem
                  key={`grade-${grade.grade_id}`}
                  itemId={`grade-${grade.grade_id}`}
                  label={grade.name}
                />
              </Link>
            ))}
          </CustomTreeItem>
        ))}
      </SimpleTreeView>
    </Box>
  );
}
