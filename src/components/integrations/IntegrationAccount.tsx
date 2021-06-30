import CustomBox from "@component/atoms/CustomBox";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import { H5, Small } from "@component/atoms/Typography";
import { Card } from "@material-ui/core";
import CheckCircleOutline from "@material-ui/icons/CheckCircleOutline";
import React from "react";

export interface IntegrationAccountProps {
  AccountId: string;
  AccountAlias: string;
  CfTemplateVersion: string;
}

const IntegrationAccount: React.FC<IntegrationAccountProps> = ({
  AccountId,
  AccountAlias,
  CfTemplateVersion,
}) => {
  return (
    <Card
      sx={{
        display: "flex",
      }}
    >
      <CustomFlexBox
        sx={{
          px: "1rem",
          bgcolor: "grey.100",
          color: "success.main",
          alignItems: "center",
        }}
      >
        <CheckCircleOutline fontSize="small" color="inherit" />
      </CustomFlexBox>
      <CustomBox sx={{ p: "1rem" }}>
        <Small color="primary.main" mb="0.5rem" display="block">
          {AccountAlias} | {CfTemplateVersion}
        </Small>
        <H5>{AccountId}</H5>
      </CustomBox>
    </Card>
  );
};

export default IntegrationAccount;
