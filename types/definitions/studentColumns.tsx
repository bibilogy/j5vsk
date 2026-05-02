// types/definitions/studentColumns.ts
import { ColDef } from "ag-grid-community";
import { Student } from "@/types/types";

export const getStudentColumnDefs = (
  onCheckboxChange: (student: Student, value: boolean) => void,
): ColDef<Student>[] => [
  {
    field: "is_awaiting_test",
    headerName: "Pieteicās",
    width: 100,
    cellRenderer: ({ value, data }: { value: boolean; data: Student }) => (
      <div
        style={{ height: "44px" }}
        className="flex items-center justify-center"
      >
        <input
          type="checkbox"
          checked={value}
          onChange={(e) => onCheckboxChange(data, e.target.checked)}
          className="custom-checkbox"
        />
      </div>
    ),
    sortable: true,
  },
  {
    field: "name",
    headerName: "Skolēns",
    flex: 1,
    filter: "agTextColumnFilter",
    sortable: true,
  },
];
