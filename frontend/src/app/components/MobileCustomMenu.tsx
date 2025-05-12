import React from "react";
import { GradeGroup } from "../lib/types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import SchoolIcon from "@mui/icons-material/School";

import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import Link from "next/link";
import { Collapse, ListItemButton, ListItemIcon } from "@mui/material";

export default function MobileCustomMenu({
  gradeGroups,
}: {
  gradeGroups: GradeGroup[];
}) {
  const [open, setOpen] = React.useState(false);
  const handleClick = () => {
    setOpen(!open);
  };
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <ListItemButton component={Link} href="/">
        <ListItemAvatar>
          <Avatar>
            <AppRegistrationIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="KPD saraksts" secondary="KPD reģistrs" />
      </ListItemButton>
      <ListItemButton component={Link} href="/sasniedzamie-rezultati">
        <ListItemAvatar>
          <Avatar>
            <AppRegistrationIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="SR saraksts" secondary="SR reģistrs" />
      </ListItemButton>

      <ListItemButton onClick={handleClick}>
        <ListItemAvatar>
          <Avatar>
            <AddIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Pievienot KPD" secondary="KPD reģistrs" />
      </ListItemButton>
      <Collapse in={open} timeout="auto" unmountOnExit>
        {gradeGroups.map((group) =>
          group.grades.map((grade) => (
            <List component="div" disablePadding key={grade.grade_id}>
              <ListItemButton
                component={Link}
                href={`/klases/${grade.grade_id}`}
                sx={{ pl: 4 }}
              >
                <ListItemIcon>
                  <SchoolIcon />
                </ListItemIcon>
                <ListItemText primary={grade.name} secondary={group.name} />
              </ListItemButton>
            </List>
          ))
        )}
      </Collapse>

      <Link key={3} href="/sasniedzamie-rezultati">
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Pievienot SR" secondary="SR reģistrs" />
        </ListItem>
      </Link>
    </List>
  );
}
