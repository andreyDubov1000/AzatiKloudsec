import CustomBox from "@component/atoms/CustomBox";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import { H5, Span } from "@component/atoms/Typography";
import { vulnerabilityColor } from "@data/constants";
import { Tab, Tabs } from "@material-ui/core";
import React, { useState } from "react";
import ScrollBar from "react-perfect-scrollbar";
import ErrorDetails from "./ErrorDetails";
import ErrorFix from "./ErrorFix";
import { IncidentCardProps } from "./IncidentCard";

export interface IncidentDetailsProps {
  incident: Omit<IncidentCardProps, "sx">;
}

const IncidentDetails: React.FC<IncidentDetailsProps> = ({ incident }) => {
  const [tabIndex, setTabIndex] = useState(0);

  const handleTabChange = async (_: any, value: number) => {
    setTabIndex(value);
  };

  return incident ? (
    <CustomBox
      sx={{
        p: "1rem 1.5rem",
        bgcolor: "white",
        flex: "1 1 0",
        height: "100vh",
      }}
    >
      <ScrollBar>
        <H5 mb="0.5rem">{incident.VulnerabilityDescription}</H5>
        <CustomFlexBox sx={{ alignItems: "center", mb: "1.5rem" }}>
          <Span color="grey.600" pr="0.25rem">
            Severity:
          </Span>
          <Span
            pr="0.5rem"
            fontWeight="500"
            color={vulnerabilityColor[incident.Severity].bgColor}
          >
            {incident.Severity}
          </Span>
          <Span color="grey.600" mr="0.5rem">
            |
          </Span>
          <Span color="grey.600"> {incident.VulnerabilityId}</Span>
        </CustomFlexBox>

        <Tabs value={tabIndex} sx={{ mb: "1rem" }} onChange={handleTabChange}>
          <Tab value={0} label="Error Details" />
          <Tab value={1} label="Error Fix" />
        </Tabs>

        {tabIndex === 0 && <ErrorDetails {...incident} />}
        {tabIndex === 1 && <ErrorFix {...incident} />}
      </ScrollBar>
    </CustomBox>
  ) : null;
};

export default IncidentDetails;
