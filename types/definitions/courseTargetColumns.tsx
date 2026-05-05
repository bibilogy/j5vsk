import { ColDef } from "ag-grid-community";
import { _CourseTarget } from "../types";

export function getCourseTargetColumnDefs(): ColDef<_CourseTarget>[] {
  return [
    {
      field: "description",
      headerName: "Klašu grupa",
      flex: 2,
      filter: true,
    },
    {
      field: "subject_field",
      headerName: "Mācību joma",
      flex: 2,
      filter: true,
    },
  ];
}
