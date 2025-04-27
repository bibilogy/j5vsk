import React from "react";
import { GradeGroup } from "../lib/types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import SchoolIcon from "@mui/icons-material/School";
import HomeIcon from "@mui/icons-material/Home";
import Link from "next/link";

export default function MobileCustomMenu({
  gradeGroups,
}: {
  gradeGroups: GradeGroup[];
}) {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Link key={0} href="/">
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <HomeIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Sākums" secondary="KPD reģistrs" />
        </ListItem>
      </Link>
      {gradeGroups.map((group) =>
        group.grades.map((grade) => (
          <Link key={grade.name} href={`/grades/${grade.grade_id}`}>
            <ListItem>
              <ListItemAvatar>
                <Avatar>
                  <SchoolIcon />
                </Avatar>
              </ListItemAvatar>
              <ListItemText primary={grade.name} secondary={group.name} />
            </ListItem>
          </Link>
        ))
      )}
    </List>
  );
}
