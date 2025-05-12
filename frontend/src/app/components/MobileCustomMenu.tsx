import React from "react";
import { CourseSubject, GradeGroup, GradeGroupSubject } from "../lib/types";
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
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

export default function MobileCustomMenu({
  gradeGroups,
  courseSubjects,
}: {
  gradeGroups: GradeGroup[];
  courseSubjects: GradeGroupSubject[];
}) {
  const [showGroups, setShowGroups] = React.useState(false);
  const [openGroups, setOpenGroups] = React.useState<Record<number, boolean>>(
    {}
  );
  const [showTargets, setShowTargets] = React.useState(false);
  const [openTargets, setOpenTargets] = React.useState<Record<number, boolean>>(
    {}
  );

  const safeCourseSubjects = Array.isArray(courseSubjects)
    ? courseSubjects
    : [];
  // Toggle for grade groups
  const toggleGroup = (groupId: number) => {
    setOpenGroups((prev) => ({
      ...prev,
      [groupId]: !prev[groupId],
    }));
  };

  // Toggle for course targets
  const toggleTarget = (courseTargetId: number) => {
    setOpenTargets((prev) => ({
      ...prev,
      [courseTargetId]: !prev[courseTargetId],
    }));
  };

  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      {/* Link to KPD list */}
      <ListItemButton component={Link} href="/">
        <ListItemAvatar>
          <Avatar>
            <AppRegistrationIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="KPD saraksts" secondary="KPD reģistrs" />
      </ListItemButton>

      {/* Link to SR list */}
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

      {/* Collapse for all grade groups */}
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

            {/* Collapse for grades within group */}
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

      {/* Main toggle for all course subjects */}
      <ListItemButton onClick={() => setShowTargets(!showTargets)}>
        <ListItemAvatar>
          <Avatar>
            <AddIcon />
          </Avatar>
        </ListItemAvatar>
        <ListItemText primary="Pievienot SR" secondary="SR reģistrs" />
        {showTargets ? <ExpandLess /> : <ExpandMore />}
      </ListItemButton>

      {/* Collapse for all course subjects */}
      <Collapse in={showTargets} timeout="auto" unmountOnExit>
        {safeCourseSubjects.map((subject) => (
          <React.Fragment key={subject.grade_group_id}>
            <ListItemButton
              onClick={() => toggleTarget(subject.grade_group_id)} // Changed to grade_group_id
              sx={{ pl: 2 }}
            >
              <ListItemText primary={subject.name} />{" "}
              {openTargets[subject.grade_group_id] ? (
                <ExpandLess />
              ) : (
                <ExpandMore />
              )}
            </ListItemButton>

            <Collapse
              in={openTargets[subject.grade_group_id]} // Changed to grade_group_id
              timeout="auto"
              unmountOnExit
            >
              <List component="div" disablePadding>
                {subject.courses.map((course) => (
                  <ListItemButton
                    key={course.course_target_id}
                    component={Link}
                    href={`/sasniedzamie-rezultati/${course.course_target_id}`}
                    sx={{ pl: 4 }}
                  >
                    <ListItemIcon>
                      <SchoolIcon />
                    </ListItemIcon>
                    <ListItemText primary={course.subject_name} />
                  </ListItemButton>
                ))}
              </List>
            </Collapse>
          </React.Fragment>
        ))}
      </Collapse>
    </List>
  );
}
