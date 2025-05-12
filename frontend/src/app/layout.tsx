import type { Metadata } from "next";
import { Roboto } from "next/font/google";
import "./globals.css";
import ResponsiveAppBar from "./components/ResponsiveAppBar";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { Analytics } from "@vercel/analytics/react";

const robotoSans = Roboto({
  variable: "--font-roboto-sans",
  subsets: ["latin", "latin-ext"],
  weight: ["400", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Kombinētie pārbaudes darbi",
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

  const fetchedGrades = await fetch(`${apiUrl}/kpd/grades`);
  const gradeGroups = await fetchedGrades.json();

  const fetchedCourseSubjects = await fetch(`${apiUrl}/msr/grade-groups`);
  const courseSubjects = await fetchedCourseSubjects.json();

  return (
    <html lang="lv" className={robotoSans.variable}>
      <head>
        <link
          rel="apple-touch-icon"
          sizes="180x180"
          href="/icons/apple-touch-icon.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="32x32"
          href="/icons/favicon-32x32.png"
        />
        <link
          rel="icon"
          type="image/png"
          sizes="16x16"
          href="/icons/favicon-16x16.png"
        />
        <link rel="manifest" href="/icons/site.webmanifest" />
      </head>
      <body>
        <ResponsiveAppBar
          gradeGroups={gradeGroups?.gradeGroupsWithGrades || []}
          courseSubjects={courseSubjects?.gradeGroupsWithGrades || []}
        />
        <main>
          {children}
          <SpeedInsights />
          <Analytics />
        </main>
      </body>
    </html>
  );
}
