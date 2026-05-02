// components/DataGrid.tsx
"use client";

import { useMemo } from "react";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
} from "ag-grid-community";

ModuleRegistry.registerModules([AllCommunityModule]);

const myTheme = themeQuartz.withParams({
  backgroundColor: "transparent",
  headerBackgroundColor: "rgba(255, 255, 255, 0.25)",
  oddRowBackgroundColor: "rgba(255, 255, 255, 0.05)",
  rowHoverColor: "rgba(255, 255, 255, 0.25)",
  borderColor: "rgba(255, 255, 255, 0.35)",
  headerTextColor: "rgba(59, 3, 102, 0.5)",
  foregroundColor: "#1e0b3b",
  fontSize: 13,
  fontFamily: "var(--font-poppins)",
  headerFontSize: 10,
  headerFontWeight: 600,
  rowHeight: 44,
  headerHeight: 40,
  cellHorizontalPaddingScale: 1.2,
  wrapperBorderRadius: "16px",
  borderRadius: "16px",
});

const localeText = {
  filterOoo: "Filtrēt...",
  equals: "Vienāds",
  notEqual: "Nav vienāds",
  lessThan: "Mazāk nekā",
  greaterThan: "Lielāk nekā",
  lessThanOrEqual: "Mazāk vai vienāds",
  greaterThanOrEqual: "Lielāk vai vienāds",
  inRange: "Diapazonā",
  contains: "Satur",
  notContains: "Nesatur",
  startsWith: "Sākas ar",
  endsWith: "Beidzas ar",
  blank: "Tukšs",
  notBlank: "Nav tukšs",
  andCondition: "UN",
  orCondition: "VAI",
  applyFilter: "Lietot",
  resetFilter: "Atiestatīt",
  clearFilter: "Notīrīt",
  cancelFilter: "Atcelt",
  noRowsToShow: "Nav datu",
};

type DataGridProps<T> = {
  rowData: T[];
  columnDefs: ColDef<T>[];
  getRowId: (row: T) => string;
};

export default function DataGrid<T>({
  rowData,
  columnDefs,
  getRowId,
}: DataGridProps<T>) {
  return (
    <div
      className="flex-1 overflow-hidden"
      style={{ height: "100%", width: "100%" }}
    >
      <AgGridReact
        theme={myTheme}
        rowData={rowData}
        columnDefs={columnDefs}
        getRowId={(p) => getRowId(p.data)}
        domLayout="normal"
        localeText={localeText}
        enableCellTextSelection
        ensureDomOrder
      />
    </div>
  );
}
