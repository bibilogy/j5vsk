"use client";

import * as React from "react";
import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Box from "@mui/material/Box";
import {
  DataGrid,
  GridColDef,
  GridFooterContainer,
  GridColumnHeaderParams,
  GridPagination,
} from "@mui/x-data-grid";
import { styled } from "@mui/material";
import { Button } from "@mui/material";
import * as XLSX from "xlsx";
import { CourseSubject } from "../lib/types";
import MobilePendingsList from "./MobilePendingsList";
import MobileCourseTargetsList from "./MobileCourseTargetsList";

const StyledGridOverlay = styled("div")(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  height: "100%",
  "& .no-rows-primary": {
    fill: "#3D4751",
    ...theme.applyStyles("light", {
      fill: "#AEB8C2",
    }),
  },
  "& .no-rows-secondary": {
    fill: "#1D2126",
    ...theme.applyStyles("light", {
      fill: "#E8EAED",
    }),
  },
}));

function CustomNoRowsOverlay() {
  return (
    <StyledGridOverlay>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        width={96}
        viewBox="0 0 452 257"
        aria-hidden
        focusable="false"
      >
        {/* SVG paths here */}
        <path
          className="no-rows-primary"
          d="M348 69c-46.392 0-84 37.608-84 84s37.608 84 84 84 84-37.608 84-84-37.608-84-84-84Zm-104 84c0-57.438 46.562-104 104-104s104 46.562 104 104-46.562 104-104 104-104-46.562-104-104Z"
        />
        <path
          className="no-rows-primary"
          d="M308.929 113.929c3.905-3.905 10.237-3.905 14.142 0l63.64 63.64c3.905 3.905 3.905 10.236 0 14.142-3.906 3.905-10.237 3.905-14.142 0l-63.64-63.64c-3.905-3.905-3.905-10.237 0-14.142Z"
        />
        <path
          className="no-rows-primary"
          d="M308.929 191.711c-3.905-3.906-3.905-10.237 0-14.142l63.64-63.64c3.905-3.905 10.236-3.905 14.142 0 3.905 3.905 3.905 10.237 0 14.142l-63.64 63.64c-3.905 3.905-10.237 3.905-14.142 0Z"
        />
        <path
          className="no-rows-secondary"
          d="M0 10C0 4.477 4.477 0 10 0h380c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 20 0 15.523 0 10ZM0 59c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10C4.477 69 0 64.523 0 59ZM0 106c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 153c0-5.523 4.477-10 10-10h195.5c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 200c0-5.523 4.477-10 10-10h203c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10ZM0 247c0-5.523 4.477-10 10-10h231c5.523 0 10 4.477 10 10s-4.477 10-10 10H10c-5.523 0-10-4.477-10-10Z"
        />
      </svg>
      <Box sx={{ mt: 2 }}>Dati nav atrasti</Box>
    </StyledGridOverlay>
  );
}

export default function CoursesTargetsList({
  courseSubjects,
}: {
  courseSubjects: CourseSubject[];
}) {
  const [isSmallScreen, setIsSmallScreen] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsSmallScreen(window.innerWidth < 900);
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const router = useRouter();

  const handleRowClick = (params: any) => {
    const { courseTargetId } = params.row;
    router.push(`/sasniedzamie-rezultati/${courseTargetId}`);
  };

  const rows = courseSubjects.map((courseSubject) => ({
    ...courseSubject,
    id: courseSubject.courseTargetId,
  }));

  const columns: GridColDef[] = [
    { field: "id", headerName: "ID", width: 90 },
    {
      field: "subjectName",
      headerName: "Mācību priekšmets",
      width: 270,
      editable: false,
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>{params.colDef.headerName}</strong>
      ),
    },
    {
      field: "subjectField",
      headerName: "Mācību joma",
      width: 300,
      editable: false,
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>{params.colDef.headerName}</strong>
      ),
    },
    {
      field: "gradeGroupName",
      headerName: "Klašu grupa",
      width: 100,
      editable: false,
      renderHeader: (params: GridColumnHeaderParams) => (
        <strong>{params.colDef.headerName}</strong>
      ),
    },
  ];

  if (isSmallScreen) {
    return <MobileCourseTargetsList courseSubjects={courseSubjects} />;
  }

  return (
    <Box
      sx={{
        width: "100%",
        height: "100%",
        maxHeight: "100%",
        minHeight: "400px",
      }}
    >
      <DataGrid
        rows={rows}
        columns={columns}
        getRowId={(row) => row.id}
        disableRowSelectionOnClick
        checkboxSelection={false}
        columnVisibilityModel={{
          id: false,
        }}
        initialState={{
          pagination: {
            paginationModel: { pageSize: 100 },
          },
        }}
        localeText={{
          paginationDisplayedRows: ({ from, to, count, estimated }) => {
            if (!estimated) {
              return `${from}–${to} no ${
                count !== -1 ? count : `more than ${to}`
              }`;
            }
            const estimatedLabel =
              estimated && estimated > to
                ? `around ${estimated}`
                : `more than ${to}`;
            return `${from}–${to} no ${count !== -1 ? count : estimatedLabel}`;
          },
          columnMenuSortAsc: "Sakārtot no A uz Z",
          columnMenuSortDesc: "Sakārtot no Z uz A",
          columnMenuUnsort: "Atcelt kārtošanu",
          columnMenuFilter: "Izveidot filtru",
          columnMenuHideColumn: "Slēpt kolonnu",
          columnMenuManageColumns: "Pārvaldīt kolonnas",
          columnsManagementSearchTitle: "Meklēt",
          columnsManagementShowHideAllText: "Rādīt/Slēpt visu",
          columnsManagementReset: "Atiestatīt",
          columnsManagementDeleteIconLabel: "Dzēst",
          filterPanelColumns: "Kolonnas",
          filterPanelOperator: "Operators",
          filterPanelInputLabel: "Vērtība",
          filterPanelInputPlaceholder: "Filtra vērtība",
          filterOperatorContains: "Tekstā ir",
          filterOperatorDoesNotContain: "Teksts nesatur",
          filterOperatorEquals: "Ir vienāds ar",
          filterOperatorDoesNotEqual: "Nav vienāds ar",
          filterOperatorStartsWith: "Teksts sākas ar",
          filterOperatorEndsWith: "Teksts beidzas ar",
          filterOperatorIsEmpty: "Ir tukša",
          filterOperatorIsNotEmpty: "Nav tukša",
          filterOperatorIsAnyOf: "Jebkura no",
        }}
        pageSizeOptions={[50]}
        slots={{
          noRowsOverlay: CustomNoRowsOverlay,
        }}
        onRowClick={handleRowClick}
        sx={{
          "& .MuiDataGrid-row:hover": {
            cursor: "pointer",
            backgroundColor: "#f5f5f5", // Optional: light hover effect
          },
        }}
      />
    </Box>
  );
}
