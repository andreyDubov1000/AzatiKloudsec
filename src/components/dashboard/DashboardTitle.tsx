import CustomFlexBox from "@component/atoms/CustomFlexBox";
import { H3 } from "@component/atoms/Typography";
import { Button } from "@material-ui/core";
import React from "react";

export interface DashboardTitleProps {
  total?: number;
  title: string;
}

const DashboardTitle: React.FC<DashboardTitleProps> = ({ title, total }) => {
  return (
    <CustomFlexBox
      sx={{
        justifyContent: "space-between",
        alignItems: "center",
        mb: "1.5rem",
      }}
    >
      <H3>{title}</H3>

      {!!total && (
        <Button
          variant="outlined"
          color="primary"
          sx={{ borderRadius: "300px" }}
        >
          Total Account: {total}
        </Button>
      )}
    </CustomFlexBox>
  );
};

export default DashboardTitle;
