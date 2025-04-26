import { Chip } from "@mui/material";
import React from "react";

function SubjectField({ field }: { field: string }) {
  return (
    <Chip
      label={field}
      sx={{
        backgroundColor: "#804896",
        color: "white",
        width: 150,
        "& .MuiChip-label": {
          overflow: "hidden",
          textOverflow: "ellipsis",
          whiteSpace: "nowrap",
        },
      }}
    />
  );
}

export default SubjectField;
