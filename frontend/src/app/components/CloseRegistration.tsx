import { Box, Stack, Typography } from "@mui/material";
import CustomIcon from "./CustomIcon";

export default function CloseRegistration() {
  return (
    <Stack
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "10px",
        textAlign: "center",
        margin: "100px auto",
        maxWidth: "400px",
        backgroundColor: "transparent",
        padding: "20px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <CustomIcon icon="shop-sign" size={100} />
      </Box>

      <Typography variant="h6" sx={{ color: "#e74c3c", fontWeight: "700" }}>
        KPD reģistrs ir slēgts
      </Typography>
      <Typography sx={{ color: "#333" }}>
        Pieteikumu pieņemšana ir pabeigta.
      </Typography>
    </Stack>
  );
}
