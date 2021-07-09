import { H5 } from "@component/atoms/Typography";
import { vulnerabilityColor } from "@data/constants";
import {
  Card,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from "@material-ui/core";
import { styled } from "@material-ui/core/styles";
import React from "react";

type Account = {
  AccountId: string;
  VulnerabilityMetrics: {
    CRITICAL: number;
    HIGH: number;
    LOW: number;
    MEDIUM: number;
  };
};

export interface IntegrationTableProps {
  accountList: Account[];
}

const CustomChip = styled(Chip)(({ theme }) => ({
  padding: "0.35rem 0.5rem",
  minWidth: 70,
  heihg: "auto",
  boxShadow: theme.shadows[2],
}));

const IntegrationTable: React.FC<IntegrationTableProps> = ({
  accountList = [],
}) => {
  console.log(accountList);

  return !!accountList.length ? (
    <Card>
      <H5 p="1rem">AWS Account List</H5>
      <Table>
        <TableHead>
          <TableRow>
            <TableCell>Account Id</TableCell>
            <TableCell align="center">Low</TableCell>
            <TableCell align="center">Medium</TableCell>
            <TableCell align="center">High</TableCell>
            <TableCell align="center">Critical</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {accountList.map((item) => (
            <TableRow key={item.AccountId}>
              <TableCell>{item.AccountId}</TableCell>
              <TableCell align="center">
                <CustomChip
                  size="small"
                  label={item.VulnerabilityMetrics.LOW}
                  sx={{
                    bgcolor: vulnerabilityColor["LOW"].bgColor,
                    color: vulnerabilityColor["LOW"].color,
                  }}
                />
              </TableCell>
              <TableCell align="center">
                <CustomChip
                  color="warning"
                  size="small"
                  label={item.VulnerabilityMetrics.MEDIUM}
                />
              </TableCell>
              <TableCell align="center">
                <CustomChip
                  color="error"
                  size="small"
                  label={item.VulnerabilityMetrics.HIGH}
                />
              </TableCell>
              <TableCell align="center">
                <CustomChip
                  color="secondary"
                  size="small"
                  label={item.VulnerabilityMetrics.CRITICAL}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Card>
  ) : null;
};

export default IntegrationTable;
