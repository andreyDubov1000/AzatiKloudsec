import CustomBox from "@component/atoms/CustomBox";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import { IconButton, TextField } from "@material-ui/core";
import { Search, Tune } from "@material-ui/icons";
import React, { useCallback } from "react";
import ScrollBar from "react-perfect-scrollbar";
import IncidentCard, { IncidentCardProps } from "./IncidentCard";

export interface IncidentListProps {
  incidentList: IncidentCardProps[];
  selectedIncident: IncidentCardProps;
  setSelectedIncident: (incident: IncidentCardProps) => void;
}

const IncidentList: React.FC<IncidentListProps> = ({
  incidentList = [],
  selectedIncident,
  setSelectedIncident,
}) => {
  const handleIncidentClick = useCallback(
    (incident: IncidentCardProps) => () => {
      setSelectedIncident(incident);
    },
    [setSelectedIncident]
  );

  return (
    <CustomBox
      sx={{
        height: "100vh",
        minWidth: 400,
        width: 400,
        "& > *": { px: "1rem" },
        "& .scrollbar": { height: "calc(100vh - 70px)", pb: "0.75rem" },
      }}
    >
      <CustomFlexBox sx={{ alignItems: "center", py: "1rem" }}>
        <TextField
          variant="outlined"
          size="small"
          fullWidth
          InputProps={{
            startAdornment: (
              <Search
                fontSize="small"
                sx={{ mr: "0.5rem", color: "grey.600" }}
              />
            ),
            sx: { pl: "0.5rem" },
          }}
        />

        <IconButton sx={{ ml: "0.75rem" }}>
          <Tune fontSize="small" />
        </IconButton>
      </CustomFlexBox>

      <ScrollBar className="scrollbar">
        {incidentList.map((item, ind) => (
          <IncidentCard
            {...item}
            onClick={handleIncidentClick(item)}
            key={ind}
            sx={{
              borderColor:
                item.VulnerabilityId === selectedIncident?.VulnerabilityId
                  ? "secondary.main"
                  : "transparent",
            }}
          />
        ))}
      </ScrollBar>
    </CustomBox>
  );
};

export default IncidentList;
