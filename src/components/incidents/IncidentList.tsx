import CustomBox from "@component/atoms/CustomBox";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import CustomMenu from "@component/atoms/CustomMenu";
import { IconButton, MenuItem, TextField } from "@material-ui/core";
import { ArrowDownward, ArrowUpward, Search, Tune } from "@material-ui/icons";
import React, { useCallback, useState } from "react";
import ScrollBar from "react-perfect-scrollbar";
import IncidentCard, { IncidentCardProps } from "./IncidentCard";

export interface IncidentListProps {
  incidentList: IncidentCardProps[];
  selectedIncident: IncidentCardProps;
  handleSearch: any;
  setSelectedIncident: (incident: IncidentCardProps) => void;
  sortList: (
    sortField: keyof IncidentCardProps,
    sortOrder?: "asc" | "desc"
  ) => void;
}

const IncidentList: React.FC<IncidentListProps> = ({
  incidentList = [],
  selectedIncident,
  handleSearch,
  sortList,
  setSelectedIncident,
}) => {
  const [dateOrder, setDateOrder] = useState<"asc" | "desc" | null>(null);

  const handleIncidentClick = useCallback(
    (incident: IncidentCardProps) => () => {
      setSelectedIncident(incident);
    },
    [setSelectedIncident]
  );

  const handleMenuClick = () => {
    if (dateOrder) setDateOrder(dateOrder === "desc" ? "asc" : "desc");
    else setDateOrder("desc");

    sortList("VulnerabilityDate", dateOrder || "asc");
  };

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
          onChange={handleSearch}
          InputProps={{
            startAdornment: (
              <Search
                fontSize="small"
                sx={{ mr: "0.25rem", color: "grey.600" }}
              />
            ),
            sx: { pl: "0.5rem", borderRadius: "300px", background: "white" },
          }}
        />

        <CustomMenu
          handler={
            <IconButton sx={{ ml: "0.75rem" }}>
              <Tune fontSize="small" />
            </IconButton>
          }
        >
          <MenuItem onClick={handleMenuClick}>
            Sort by Date
            {dateOrder && dateOrder === "asc" ? (
              <ArrowUpward
                fontSize="small"
                sx={{ fontSize: 12, color: "grey.600", ml: "0.5rem" }}
              />
            ) : (
              <ArrowDownward
                fontSize="small"
                sx={{ fontSize: 12, color: "grey.600", ml: "0.5rem" }}
              />
            )}
          </MenuItem>
        </CustomMenu>
      </CustomFlexBox>

      <ScrollBar className="scrollbar">
        {incidentList.map((item) => (
          <IncidentCard
            {...item}
            onClick={handleIncidentClick(item)}
            key={item.id}
            sx={{
              borderColor:
                item.id === selectedIncident?.id
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
