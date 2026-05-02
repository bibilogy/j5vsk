// app/layout.tsx
import type { Metadata } from "next";
import { Poppins, Geist } from "next/font/google";
import "./globals.css";
import Shell from "@/components/Shell";
import { cn } from "@/lib/utils";

const geist = Geist({subsets:['latin'],variable:'--font-sans'});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  title: "KPD reģistrs",
  description: "Created by GoPure",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={cn("font-sans", geist.variable)}>
      <body className="font-[family-name:var(--font-poppins)] bg-[#DFDBE5] bg-repeat">
        <Shell>{children}</Shell>
      </body>
    </html>
  );
}
