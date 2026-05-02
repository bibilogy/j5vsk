// components/DataGrid.tsx
"use client";

import { HashLoader } from "react-spinners";
import { AgGridReact } from "ag-grid-react";
import {
  ColDef,
  ModuleRegistry,
  AllCommunityModule,
  themeQuartz,
} from "ag-grid-community";
import { useRef } from "react";
import { Button } from "./ui/button";
import { Download } from "lucide-react";

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
  // filters
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
  // pagination
  page: "Lappuse",
  nextPage: "Nākamā lappuse",
  lastPage: "Pēdējā lappuse",
  firstPage: "Pirmā lappuse",
  previousPage: "Iepriekšējā lappuse",
  pageSizeSelectorLabel: "Rindas lapā:",
  of: "no",
  to: "līdz",
  more: "vairāk",
};

const LoadingOverlay = () => (
  <div className="flex items-center justify-center h-full">
    <HashLoader color="#a992bb" size={35} />
  </div>
);

type DataGridProps<T> = {
  rowData: T[];
  columnDefs: ColDef<T>[];
  getRowId: (row: T) => string;
  loading?: boolean;
  hasFooter?: boolean;
};

export default function DataGrid<T>({
  rowData,
  columnDefs,
  getRowId,
  loading,
  hasFooter,
}: DataGridProps<T>) {
  const gridRef = useRef<AgGridReact<T>>(null);

  const handleExport = () => {
    gridRef.current?.api.exportDataAsCsv({
      fileName: "eksports.csv",
    });
  };

  return (
    <div
      className="flex-1 overflow-hidden flex flex-col"
      style={{ height: "100%", width: "100%" }}
    >
      <div className="relative flex-1">
        <AgGridReact
          ref={gridRef}
          theme={myTheme}
          rowData={rowData}
          columnDefs={columnDefs}
          getRowId={(p) => getRowId(p.data)}
          domLayout="normal"
          localeText={localeText}
          enableCellTextSelection
          ensureDomOrder
          loadingOverlayComponent={LoadingOverlay}
          loading={loading}
          pagination={hasFooter}
          paginationPageSize={hasFooter ? 20 : undefined}
          paginationPageSizeSelector={hasFooter ? [10, 20, 50] : false}
        />
        {hasFooter && (
          <div className="absolute bottom-0 left-0 h-[48px] flex items-center pl-3">
            <Button
              variant="outline"
              size="sm"
              onClick={handleExport}
              className="bg-white/30 border-white/50 text-purple-900/70 hover:bg-white/45 hover:text-purple-950 text-[11px] font-medium"
            >
              <Download size={13} className="mr-1.5" />
              Eksportēt
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
