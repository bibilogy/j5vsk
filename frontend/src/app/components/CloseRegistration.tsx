import { Box, Stack, Typography } from "@mui/material";

export default function CloseRegistration() {
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100%",
      }}
    >
      <Box
        style={{
          textAlign: "center",
          margin: "100px auto",
          maxWidth: "400px",
          backgroundColor: "#fff",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Typography variant="h6" sx={{ color: "#e74c3c", fontWeight: "700" }}>
          Slēgts
        </Typography>
        <Typography sx={{ color: "#333" }}>
          Pieteikumu pieņemšana ir pabeigta.
        </Typography>
      </Box>
    </Stack>
  );
}
