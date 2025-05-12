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
import {
  Collapse,
  ListItemButton,
  ListItemIcon,
  Typography,
} from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function MobileCustomMenu({
  gradeGroups,
}: {
  gradeGroups: GradeGroup[];
}) {
  const [showGroups, setShowGroups] = React.useState(false);
  const [openGroups, setOpenGroups] = React.useState<Record<number, boolean>>(
    {}
  );

  const toggleGroup = (groupId: number) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
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

      {/* Main toggle for all grade groups */}
      <ListItemButton onClick={() => setShowGroups(!showGroups)}>
        <ListItemAvatar>
          <Avatar>
            <AddIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Pievienot KPD" secondary="KPD reģistrs" />
        {showGroups ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      {/* Collapse for all groups */}
      <Collapse in={showGroups} timeout="auto" unmountOnExit>
        {gradeGroups.map((group) => (
          <React.Fragment key={group.grade_group_id}>
            {/* Group-level toggle */}
            <ListItemButton
              onClick={() => toggleGroup(group.grade_group_id)}
              sx={{ pl: 2 }}
            >
              <ListItemText primary={group.name} />
              {openGroups[group.grade_group_id] ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItemButton>

            <Collapse
              in={openGroups[group.grade_group_id]}
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {group.grades.map((grade) => (
                  <ListItemButton
                    key={grade.grade_id}
                    component={Link}
                    href={`/klases/${grade.grade_id}`}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary={grade.name} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </Collapse>

      <ListItemButton component={Link} href="/sasniedzamie-rezultati">
        <ListItemAvatar>
          <Avatar>
            <AddIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Pievienot SR" secondary="SR reģistrs" />
      </ListItemButton>
    </List>
  );
}
