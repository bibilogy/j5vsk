"use client";
import TestPendingsList from "../components/TestPendingsList";
import { Skeleton } from "@mui/material";
import { TestPending } from "../lib/types";
import { useEffect, useState } from "react";
import CloseRegistration from "../components/CloseRegistration";

export default function Home() {
  const apiUrl = process.env.NEXT_PUBLIC_API_ENDPOINT;
  const [tests, setTests] = useState<TestPending[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(`${apiUrl}/kpd/pending-tests`);
        const tests = await response.json();
        setTests(tests);
      } catch (error) {
        console.error("Error fetching pending tests:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchData();
  }, [apiUrl]);

  return isLoading ? (
    <Skeleton
      animation="wave"
      variant="rectangular"
      width="100%"
      height="100%"
    />
  ) : (
    // <TestPendingsList testsPending={tests} />
    <CloseRegistration />
  );
}
