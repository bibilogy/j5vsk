// types/definitions/pendingTestColumns.ts
import { ColDef } from "ag-grid-community";
import { PendingTestEnrollment } from "@/types/types";

export const getPendingTestColumnDefs = (): ColDef<PendingTestEnrollment>[] => [
  {
    field: "student_name",
    headerName: "Skolēns",
    flex: 1,
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: "grade_name",
    headerName: "Klase",
    width: 120,
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: "subject_name",
    headerName: "Priekšmets",
    flex: 1,
    filter: "agTextColumnFilter",
    sortable: true,
  },
  {
    field: "subject_field",
    headerName: "Mācību joma",
    flex: 1,
    filter: "agTextColumnFilter",
    sortable: true,
  },
];
