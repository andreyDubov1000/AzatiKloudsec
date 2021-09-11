import CustomBox from "@component/atoms/CustomBox";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import PageTitle from "@component/atoms/PageTitle";
import { H5 } from "@component/atoms/Typography";
import AWSIcon from "@component/icons/AWSIcon";
import AddAccount from "@component/integrations/AddAccount";
import { Button, IconButton } from "@material-ui/core";
import { DataGrid, GridCellParams, GridColDef } from "@material-ui/data-grid";
import { Done } from "@material-ui/icons";
import Close from "@material-ui/icons/Close";
import { useAppSelector } from "@redux/hooks";
import React, { useEffect, useState } from "react";
import { getAWSAccounts } from "services/integrationsService";

const Integration = () => {
  const [accountList, setAccountList] = useState([]);
  const [loading, setLoading] = useState(true);

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const getAccountList = async (user_id: string) => {
      const list = await getAWSAccounts(user_id);
      console.log(list);

      if (list) {
        setAccountList(
          list.AwsAccounts.map((item: any) => ({
            id: item.AccountId,
            user_id,
            ...item,
          }))
        );
      }

      setLoading(false);
    };

    if (user?.user_id) getAccountList(user.user_id);
  }, [user]);

  return (
    <CustomBox>
      <PageTitle title="Integrations" />
      <CustomFlexBox
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          mb: "2rem",
        }}
      >
        <CustomFlexBox
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton sx={{ bgcolor: "grey.100", p: "0.5rem", mr: "1rem" }}>
            <AWSIcon fontSize="large" />
          </IconButton>
          <H5>AWS Read Only</H5>
        </CustomFlexBox>

        {user?.user_id && <AddAccount user_id={user.user_id} />}
      </CustomFlexBox>

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
    </CustomBox>
  );
};

const columns: GridColDef[] = [
  { field: "AccountId", headerName: "Account ID", flex: 1 },
  { field: "AccountAlias", headerName: "Account Alias", flex: 1 },
  {
    field: "CfTemplateVersion",
    headerName: "Cf Template Version",
    flex: 1,
    align: "center",
    headerAlign: "center",
  },
  {
    field: "Reachability",
    headerName: "Reachability",
    flex: 1,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridCellParams) =>
      params.getValue(params.id, "Reachability") === "OK" ? (
        <Done fontSize="small" color="success" />
      ) : (
        <Close fontSize="small" color="error" />
      ),
  },
  {
    field: "KloudsecRoleCfTemplateUpToDate",
    headerName: "Actions",
    flex: 1,
    align: "center",
    headerAlign: "center",
    renderCell: (params: GridCellParams) => {
      const CfTemplateUpToDate = params.getValue(
        params.id,
        "KloudsecRoleCfTemplateUpToDate"
      );
      const CfStackId = params.getValue(params.id, "CfStackId");
      const UserId = params.getValue(params.id, "user_id");

      return !CfTemplateUpToDate ? (
        <a
          href={`https://eu-west-1.console.aws.amazon.com/cloudformation/home?region=eu-west-1#/stacks/update?stackId=${CfStackId}&templateURL=https%3A%2F%2Fs3.eu-west-1.amazonaws.com%2Fkloudsec-public-assets%2FKloudSecCustomerRole.yaml&param_ExternalID=${UserId}`}
          target="_blank"
          rel="noreferrer"
        >
          <Button
            sx={{ borderRadius: "300px" }}
            size="small"
            color="primary"
            variant="contained"
            disableElevation
          >
            Update KloudSec Role Stack
          </Button>
        </a>
      ) : (
        <div />
      );
    },
  },
];

export default Integration;
