import type { Metadata } from "next";
import "../globals.css";
import Stack from "@mui/material/Stack";
import { Container, Typography } from "@mui/material";
import CustomMenu from "../components/CustomMenu";

export const metadata: Metadata = {
  title: "Sasniedzamie rezultāti",
  description:
    "Tīmekļa lietotne Jelgavas 5.vidusskolas gada pārbaudījumu uzskaitei",
  creator: "Vadims Mamedovs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const fetchedGradeGroups = await fetch(`${apiUrl}/msr/grade-groups`);
  const gradeGroups = await fetchedGradeGroups.json();
  return (
    <Container className="main-container" maxWidth="lg" disableGutters>
      <Stack
        sx={{
          // display: { xs: "none", md: "block" },
          padding: { xs: "0", md: "10px 20px 10px 10px" },
          borderRadius: "10px 10px 0 0",
          backgroundColor: { xs: "transparent", md: "#eee" },
          boxShadow: {
            xs: "none",
            md: "4px 4px 4px rgba(0, 0, 0, 0.25)",
          },
          borderBottom: { xs: "none", md: "1px solid #eee" },
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <Typography
          sx={{
            flex: 1,
            textAlign: { xs: "center", lg: "left" },
            textTransform: "uppercase",
            fontSize: "1rem",
            fontWeight: "700",
            paddingLeft: "15px",
            letterSpacing: { xs: "0.1rem", md: ".15rem" },
          }}
        >
          SR reģistrs
        </Typography>
      </Stack>

      <Stack
        sx={{
          height: "100%",
          maxHeight: "100%",
          backgroundColor: { xs: "transparent", md: "white" },
          boxShadow: {
            xs: "none",
            md: "4px 4px 4px rgba(0, 0, 0, 0.25)",
          },
          borderRadius: "0 0 10px 10px",
          display: "flex",
          flexDirection: "row",
          gap: "10px",
          padding: "10px",
        }}
      >
        {/* Sidebar */}
        <Stack
          sx={{
            width: { xs: 0, md: "280px" }, // 0 width on small screens, 150px on medium+
            height: "100%",
            maxHeight: "100%",
            overflow: "hidden",
            flexShrink: 0,
            display: { xs: "none", lg: "flex" }, // hide completely on small screens
          }}
        >
          <nav
            className="scrollable-area"
            style={{
              height: "100%",
              maxHeight: "100%",
              overflowY: "auto",
              overflowX: "hidden",
            }}
          >
            <CustomMenu gradeGroups={gradeGroups.gradeGroupsWithGrades} />
          </nav>
        </Stack>

        {/* Main content */}
        <Stack
          className="scrollable-area"
          sx={{
            flexGrow: 1, // This allows it to fill remaining space
            height: "100%",
            maxHeight: "100%",
            width: "100%",
            overflowY: "auto",
            padding: "10px",
            minWidth: 0, // Important for flex children to avoid overflow
          }}
        >
          {children}
        </Stack>
      </Stack>
    </Container>
  );
}
