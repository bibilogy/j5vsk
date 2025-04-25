import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Stack from "@mui/material/Stack";
import { Container, Typography } from "@mui/material";
import CustomIcons from "./components/CustomMenu";
import buttons from "../../public/buttons.svg";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  display: "swap",
});

interface Grade {
  grade_id: number;
  name: string;
  grade_group_id: number;
  created_at: string;
  updated_at: string;
}

interface GradeGroup {
  grade_group_id: number;
  name: string;
  created_at: string;
  updated_at: string;
  grades: Grade[];
}

export const metadata: Metadata = {
  title: "Gada pārbaudījumi",
  description:
    "Tīmekļa lietotne Jelgavas 5.vidusskolas gada pārbaudījumu uzskaitei",
  creator: "Vadims Mamedovs",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const fetchedGrades = await fetch("http://localhost:3000/v4/grades");
  const gradeGroups = await fetchedGrades.json();

  return (
    <html lang="lv" className={robotoSans.variable}>
      <body>
        <ResponsiveAppBar />
        <main
          style={{
            flexGrow: 1,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Container>
            <Stack
              sx={{
                padding: "10px 20px 10px 10px",
                borderRadius: "10px 10px 0 0",
                backgroundColor: "#eee",
                boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
                borderBottom: "1px solid #eee",
                flexDirection: "row",
                alignItems: "center",
                justifyContent: "center", // Centers content horizontally
                width: "100%", // Ensure the stack takes full width
              }}
            >
              <img src={buttons.src} alt="controls" width={100} height={100} />
              <Typography
                variant="h6"
                sx={{
                  flex: 1,
                  textAlign: "center",
                  textTransform: "uppercase",
                  fontWeight: "700",
                  letterSpacing: ".15rem",
                }}
              >
                Kombinētie pārbaudes darbi
              </Typography>{" "}
              {/* Center text */}
            </Stack>

            <Stack
              sx={{
                height: "600px", // or 'calc(100vh - HEADER_HEIGHT - FOOTER_HEIGHT)' if needed
                backgroundColor: "white",
                boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
                display: "flex",
                flexDirection: "row",
                gap: "10px",
                padding: "10px",
              }}
            >
              {/* Sidebar */}
              <Stack
                sx={{
                  width: "280px",
                  height: "100%",
                  overflow: "hidden",
                  flexShrink: 0, // This ensures it doesn't shrink when space is tight
                }}
              >
                <nav
                  className="scrollable-area"
                  style={{
                    height: "100%",
                    overflowY: "auto", // enable vertical scrollbar
                    overflowX: "hidden", // hide horizontal scrollbar
                  }}
                >
                  <CustomIcons
                    gradeGroups={gradeGroups.gradeGroupsWithGrades}
                  />
                </nav>
              </Stack>

              {/* Main content */}
              <Stack
                className="scrollable-area"
                sx={{
                  flexGrow: 1, // This allows it to fill remaining space
                  height: "100%",
                  overflowY: "auto",
                  padding: "10px",
                  minWidth: 0, // Important for flex children to avoid overflow
                }}
              >
                {children}
              </Stack>
            </Stack>

            <Stack
              sx={{
                padding: "20px",
                borderRadius: "0 0 10px 10px",
                backgroundColor: "white",
                boxShadow: "4px 4px 4px rgba(0, 0, 0, 0.25)",
              }}
            >
              &copy; Jelgavas 5.vidusskola
            </Stack>
          </Container>
        </main>
      </body>
    </html>
  );
}
