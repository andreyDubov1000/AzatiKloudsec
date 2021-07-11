import { H1, H6 } from "@component/atoms/Typography";
import { vulnerabilityColor } from "@data/constants";
import { Vulnerability } from "@data/types";
import { Card, Grid } from "@material-ui/core";
import React from "react";

export interface AnalyticsCardsProps {
  CRITICAL: number;
  HIGH: number;
  LOW: number;
  MEDIUM: number;
  children?: never;
  [key: string]: any;
}

const AnalyticsCards: React.FC<AnalyticsCardsProps> = (vulnerabilities) => {
  return (
    <Grid container spacing={3} sx={{ mb: "1.5rem" }}>
      {Object.keys(vulnerabilities).map((key, ind) => (
        <Grid item md={3} sm={4} xs={6} key={key}>
          <Card
            sx={{
              bgcolor: vulnerabilityColor[key as Vulnerability].bgColor,
              color: vulnerabilityColor[key as Vulnerability].color,
              p: "1rem 1.5rem",
              textAlign: "center",
            }}
          >
            <H6
              fontSize="12px"
              mb="0.25rem"
              sx={{ textTransform: "capitalize" }}
            >
              {key.toLowerCase()}
            </H6>
            <H1>{vulnerabilities[key]}</H1>
          </Card>
        </Grid>
      ))}
    </Grid>
  );
};

export default AnalyticsCards;
