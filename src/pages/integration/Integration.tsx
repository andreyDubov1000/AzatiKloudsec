import CustomBox from "@component/atoms/CustomBox";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import { H5 } from "@component/atoms/Typography";
import AWSIcon from "@component/icons/AWSIcon";
import AddAccount from "@component/integrations/AddAccount";
// import IntegrationAccount from "@component/integrations/IntegrationAccount";
import { IconButton } from "@material-ui/core";
import { DataGrid, GridColDef } from "@material-ui/data-grid";
import { useAppSelector } from "@redux/hooks";
import React, { useEffect, useState } from "react";
import { getAWSAccounts } from "services/integrationsService";

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
  // {
  //   field: "fullName",
  //   headerName: "Full name",
  //   description: "This column has a value getter and is not sortable.",
  //   sortable: false,
  //   width: 160,
  //   valueGetter: (params: GridValueGetterParams) =>
  //     `${params.getValue(params.id, "firstName") || ""} ${
  //       params.getValue(params.id, "lastName") || ""
  //     }`,
  // },
];

const Integration = () => {
  const [accountList, setAccountList] = useState([]);
  const [loading, setLoading] = useState(false);

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    // let interval: any = null;
    setLoading(true);

    const getAccountList = async (user_id: string) => {
      const list = await getAWSAccounts(user_id);
      console.log(list);

      if (list) {
        setAccountList(
          list.AwsAccounts.map((item: any) => ({
            id: item.AccountId,
            ...item,
          }))
        );
      }

      setLoading(false);
    };

    if (user?.user_id) getAccountList(user.user_id);

    // if (user?.user_id && !interval) {
    //   interval = setInterval(async () => {
    //     getAccountList(user.user_id);
    //   }, 5 * 60 * 1000);
    // }

    // return () => interval && clearInterval(interval);
  }, [user]);

  console.log(accountList);

  return (
    <CustomBox>
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

        <AddAccount user_id={user?.user_id} />
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

      {/* {accountList.map((item, ind) => (
        <IntegrationAccount {...item} key={ind} />
      ))} */}
    </CustomBox>
  );
};

const accounts = [
  {
    id: 1,
    CfTemplateVersion: "1.0",
    AccountAlias: "tarek-cheikh-gmail",
    AccountId: "138550989274",
  },
  {
    id: 2,
    CfTemplateVersion: "1.0",
    AccountAlias: "tocconsulting",
    AccountId: "976885663559",
  },
  {
    id: 3,
    CfTemplateVersion: "1.0",
    AccountAlias: "kloudsec-test",
    AccountId: "307191486697",
  },
  {
    id: 4,
    CfTemplateVersion: "1.0",
    AccountAlias: "kloudsec-tooling",
    AccountId: "039423356527",
  },
  {
    id: 5,
    CfTemplateVersion: "1.0",
    AccountAlias: "kloudsec-api",
    AccountId: "667841609565",
  },
  {
    id: 6,
    CfTemplateVersion: "1.0",
    AccountAlias: "kloudsec-billing",
    AccountId: "864677565010",
  },
  {
    id: 7,
    CfTemplateVersion: "1.0",
    AccountAlias: "kloudsec-cicd",
    AccountId: "019149532256",
  },
  {
    id: 8,
    CfTemplateVersion: "1.0",
    AccountAlias: "kloudsec-corp",
    AccountId: "842777995490",
  },
  {
    id: 9,
    CfTemplateVersion: "1.0",
    AccountAlias: "kjkjlkjklj",
    AccountId: "111206599912",
  },
  {
    id: 10,
    CfTemplateVersion: "1.0",
    AccountAlias: "kloudsec-analytics",
    AccountId: "142481957006",
  },
  {
    id: 11,
    CfTemplateVersion: "1.0",
    AccountAlias: "kloudsec-finance",
    AccountId: "010818925550",
  },
  {
    id: 12,
    CfTemplateVersion: "1.0",
    AccountAlias: "kloudsec-hr",
    AccountId: "880430133219",
  },
  {
    id: 13,
    CfTemplateVersion: "1.0",
    AccountAlias: "kloudsec-infra",
    AccountId: "984219001985",
  },
  {
    id: 14,
    CfTemplateVersion: "1.0",
    AccountAlias: "kloudsec-lab",
    AccountId: "873785870250",
  },
];

export default Integration;
