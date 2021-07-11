import { H5 } from "@component/atoms/Typography";
import { vulnerabilityColor } from "@data/constants";
import { Vulnerability } from "@data/types";
import { Card, Chip } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import { DataGrid, GridCellParams, GridColDef } from "@material-ui/data-grid";
import React from "react";

type Account = {
  AccountId: string;
  CRITICAL: number;
  HIGH: number;
  LOW: number;
  MEDIUM: number;
};

export interface AnalyticsTableProps {
  accountList: Account[];
  loading: boolean;
}

const CustomChip = styled(Chip)(({ theme }) => ({
  padding: "0.35rem 0.5rem",
  minWidth: 70,
  heihg: "auto",
  boxShadow: theme.shadows[2],
}));

const AnalyticsTable: React.FC<AnalyticsTableProps> = ({
  accountList = [],
  loading,
}) => {
  return (
    <Card sx={{ mb: "1.5rem" }}>
      <H5 p="1rem">AWS Account List</H5>

      <DataGrid
        rows={accountList}
        columns={columns}
        pageSize={20}
        loading={loading}
        autoHeight
        disableSelectionOnClick
        disableColumnSelector
        disableColumnMenu
      />
    </Card>
  );
};

const commonColumnOptions: any = {
  headerAlign: "center",
  align: "center",
  flex: 1,
};

const renderChipCell =
  (Vulnerability: Vulnerability) => (params: GridCellParams) =>
    (
      <CustomChip
        label={params.getValue(params.id, Vulnerability) || ""}
        size="small"
        sx={{
          bgcolor: vulnerabilityColor[Vulnerability].bgColor,
          color: vulnerabilityColor[Vulnerability].color,
        }}
      />
    );

const columns: GridColDef[] = [
  { field: "id", headerName: "Account ID", flex: 1 },
  { field: "alias", headerName: "Account Alias", flex: 1 },
  {
    field: "LOW",
    headerName: "Low",
    renderCell: renderChipCell("LOW"),
    ...commonColumnOptions,
  },
  {
    field: "MEDIUM",
    headerName: "Medium",
    renderCell: renderChipCell("MEDIUM"),
    ...commonColumnOptions,
  },
  {
    field: "HIGH",
    headerName: "High",
    renderCell: renderChipCell("HIGH"),
    ...commonColumnOptions,
  },
  {
    field: "CRITICAL",
    headerName: "Critical",
    renderCell: renderChipCell("CRITICAL"),
    ...commonColumnOptions,
  },
];

export default AnalyticsTable;
