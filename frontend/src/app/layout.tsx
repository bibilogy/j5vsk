import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import Stack from "@mui/material/Stack";
import { Container } from "@mui/material";

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
        <Container>
          <Stack
            sx={{
              padding: "20px",
              borderRadius: "10px 10px 0 0",
              backgroundColor: "white",
            }}
          >
            header
          </Stack>
          <Stack
            sx={{
              backgroundColor: "white",
              display: "flex",
              flexDirection: "row",
            }}
          >
            <nav>
              <ul>
                {(gradeGroups?.gradeGroupsWithGrades as GradeGroup[]).map(
                  (gradeGroup) => (
                    <li key={gradeGroup.grade_group_id}>{gradeGroup.name}</li>
                  )
                )}
              </ul>
            </nav>
            <Stack>{children}</Stack>
          </Stack>
          <Stack
            sx={{
              padding: "20px",
              borderRadius: "0 0 10px 10px",
              backgroundColor: "white",
            }}
          >
            footer
          </Stack>
        </Container>
      </body>
    </html>
  );
}
