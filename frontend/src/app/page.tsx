import React from "react";
import TestPendingsList from "./components/TestPendingsList"; // Make sure this is a client component

// Server-side Data Fetching
export default async function Home() {
  const apiUrl = process.env.API_ENDPOINT;
  const response = await fetch(`${apiUrl}/v4/pending-tests`);
  const tests = await response.json();

  return <TestPendingsList testsPending={tests} />;
}
