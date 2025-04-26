import React from "react";
import { Suspense } from "react";
import { Skeleton } from "@mui/material";
import TestPendingsList from "./components/TestPendingsList"; // Make sure this is a client component

// Server-side Data Fetching
export default async function Home() {
  const response = await fetch("http://localhost:3000/v4/pending-tests");
  const tests = await response.json();

  return (
    <Suspense
      fallback={
        <div>
          <Skeleton variant="rectangular" width="100%" height="100%" />
        </div>
      }
    >
      <TestPendingsList testsPending={tests} />
    </Suspense>
  );
}
