"use client";

import { fetchPendingTestEnrollments } from "@/actions/data-fetching";
import DataGrid from "@/components/DataGrid";
import { getPendingTestColumnDefs } from "@/types/definitions/pendingTestColumns";
import { PendingTestEnrollment } from "@/types/types";
import { useEffect, useMemo, useState } from "react";

export default function HomePage() {
  const [pendingTests, setPendingTests] = useState<PendingTestEnrollment[]>();

  useEffect(() => {
    fetchPendingTestEnrollments().then(setPendingTests);
  }, []);

  const colDefs = useMemo(() => getPendingTestColumnDefs(), []);

  const rowData = useMemo(() => {
    return pendingTests ?? [];
  }, [pendingTests]);

  return (
    <div className="flex flex-col gap-4 h-full">
      <DataGrid
        rowData={rowData}
        columnDefs={colDefs}
        getRowId={(row) => String(row.enrollment_id)}
      />
    </div>
  );
}
