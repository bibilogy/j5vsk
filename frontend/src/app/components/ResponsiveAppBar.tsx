"use client";

import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";
import { IconButton, Stack, Drawer } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import MenuIcon from "@mui/icons-material/Menu";
import MobileCustomMenu from "./MobileCustomMenu";
import { GradeGroup } from "../lib/types"; // your GradeGroup type

function ResponsiveAppBar({ gradeGroups }: { gradeGroups: GradeGroup[] }) {
  const [menuOpen, setMenuOpen] = useState(false);

  const toggleDrawer =
    (open: boolean) => (event: React.KeyboardEvent | React.MouseEvent) => {
      if (
        event.type === "keydown" &&
        ((event as React.KeyboardEvent).key === "Tab" ||
          (event as React.KeyboardEvent).key === "Shift")
      ) {
        return;
      }
      setMenuOpen(open);
    };

  return (
    <>
      <AppBar position="static">
        <Container maxWidth="lg">
          <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
            <Stack direction="row">
              <Link href="/">
                <Typography
                  variant="h6"
                  noWrap
                  sx={{
                    mr: 2,
                    fontFamily: "monospace",
                    fontWeight: 700,
                    letterSpacing: ".3rem",
                    color: "inherit",
                    textDecoration: "none",
                    textTransform: "uppercase",
                  }}
                >
                  j5vsk
                </Typography>
              </Link>
            </Stack>

            {/* Menu Button */}
            <IconButton
              size="large"
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{
                mr: 2,
                display: { xs: "block", sm: "block", md: "block", lg: "none" },
              }}
            >
              <MenuIcon />
            </IconButton>

            {/* Desktop Links */}
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              gap={1}
              sx={{
                display: { xs: "none", lg: "flex" },
                paddingBottom: "2px",
                borderBottom: "1px solid white",
              }}
            >
              <Link
                href="/"
                style={{ display: "flex", flexDirection: "row", gap: "5px" }}
              >
                <Typography
                  sx={{
                    color: "white",
                    fontSize: "1rem",
                    textTransform: "uppercase",
                  }}
                >
                  KPD reģistrs
                </Typography>
                <LaunchIcon sx={{ color: "white" }} />
              </Link>
            </Stack>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Drawer with MobileCustomMenu */}
      <Drawer anchor="left" open={menuOpen} onClose={toggleDrawer(false)}>
        <MobileCustomMenu gradeGroups={gradeGroups} />
      </Drawer>
    </>
  );
}

export default ResponsiveAppBar;
