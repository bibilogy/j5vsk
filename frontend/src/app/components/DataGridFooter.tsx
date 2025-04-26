import { GridFooterContainer, GridPagination } from "@mui/x-data-grid";
import Button from "@mui/material/Button";

function DataGridFooter({ onExport }: { onExport: () => void }) {
  return (
    <GridFooterContainer>
      <Button onClick={onExport} variant="contained" size="small" sx={{ m: 1 }}>
        Exportēt uz Excel
      </Button>
      <GridPagination />
    </GridFooterContainer>
  );
}
