import React from "react";
import { GradeGroup } from "../lib/types";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import AddIcon from "@mui/icons-material/Add";
import AppRegistrationIcon from "@mui/icons-material/AppRegistration";
import DownloadIcon from "@mui/icons-material/Download";
import Link from "next/link";

export default function MobileCustomMenu() {
  return (
    <List sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
      <Link key={0} href="/">
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AppRegistrationIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="KPD saraksts" secondary="KPD reģistrs" />
        </ListItem>
      </Link>
      <Link key={1} href="/sasniedzamie-rezultati">
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AppRegistrationIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="SR saraksts" secondary="SR reģistrs" />
        </ListItem>
      </Link>
      <Link key={2} href="/">
        <ListItem>
          <ListItemAvatar>
            <Avatar>
              <AddIcon />
            </Avatar>
          </ListItemAvatar>
          <ListItemText primary="Pievienot KPD" secondary="KPD reģistrs" />
        </ListItem>
      </Link>

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
      {/* {gradeGroups.map((group) =>
        group.grades.map((grade) => (
          <Link key={grade.name} href={`/klases/${grade.grade_id}`}>
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
      )} */}
    </List>
  );
}
