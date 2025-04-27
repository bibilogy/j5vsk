import React from "react";
import { Button, Stack, Typography } from "@mui/material";

export default function Custom404() {
  return (
    <Stack
      spacing={3}
      sx={{
        justifyContent: "center",
        alignItems: "center",
        maxHeight: "100%",
        textAlign: "center",
      }}
    >
      <Typography variant="h1" sx={{ fontSize: "6rem", fontWeight: "bold" }}>
        404
      </Typography>
      <Typography variant="h6" color="textSecondary">
        Ops! Lapa, kuru meklējat, neeksistē...
      </Typography>
    </Stack>
  );
}
