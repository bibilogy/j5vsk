import { ColDef } from "ag-grid-community";
import { PendingTestEnrollment } from "@/types/types";

export const getMobileTestColumnDefs = (): ColDef<PendingTestEnrollment>[] => [
  {
    headerName: "Skolēns",
    valueGetter: (p) =>
      p.data ? `${p.data.student_name} (${p.data.grade_name})` : "",
    flex: 1,
    filter: true,
    floatingFilter: false,
  },
  {
    headerName: "Priekšmets",
    field: "subject_name",
    flex: 1,
    filter: true,
    floatingFilter: false,
  },
];
