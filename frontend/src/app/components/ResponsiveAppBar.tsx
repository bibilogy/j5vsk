"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import Link from "next/link";
import { IconButton, Stack } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";
import MenuIcon from "@mui/icons-material/Menu";

function ResponsiveAppBar() {
  return (
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
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{
              mr: 2,
              display: {
                xs: "block",
                sm: "block", // hidden on small screens
                md: "block",
                lg: "none", // visible on large screens and up
              },
            }}
          >
            <MenuIcon />
          </IconButton>
          <Stack
            direction="row"
            alignItems="center"
            gap={1}
            sx={{ display: { xs: "none", lg: "flex" } }}
          >
            <LaunchIcon sx={{ color: "white" }} />
            <Link href="/">
              <Typography
                sx={{
                  color: "fff",
                  fontSize: "1rem",
                  textTransform: "uppercase",
                }}
              >
                KPD reģistrs
              </Typography>
            </Link>
          </Stack>
        </Toolbar>
      </Container>
    </AppBar>
  );
}
export default ResponsiveAppBar;
