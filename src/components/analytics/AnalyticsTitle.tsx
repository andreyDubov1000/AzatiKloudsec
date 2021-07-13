import CustomFlexBox from "@component/atoms/CustomFlexBox";
import { H3 } from "@component/atoms/Typography";
import { Button } from "@material-ui/core";
import React from "react";

export interface AnalyticsTitleProps {
  total?: number;
  title: string;
}

const AnalyticsTitle: React.FC<AnalyticsTitleProps> = ({ title, total }) => {
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
          Total AWS Account: {total}
        </Button>
      )}
    </CustomFlexBox>
  );
};

export default AnalyticsTitle;
