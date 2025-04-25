"use client";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import logo from "../../../public/logo.png";
import Link from "next/link";
import { Box, Stack } from "@mui/material";
import LaunchIcon from "@mui/icons-material/Launch";

function ResponsiveAppBar() {
  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters sx={{ justifyContent: "space-between" }}>
          <Stack direction="row">
            <Link href="/">
              <img
                src={logo.src}
                alt=""
                width={30}
                height={30}
                style={{ display: "block", marginRight: "10px" }}
              />
            </Link>

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
          </Stack>

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
