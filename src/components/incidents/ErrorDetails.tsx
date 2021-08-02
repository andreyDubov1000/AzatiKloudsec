import { Span } from "@component/atoms/Typography";
import { Typography } from "@material-ui/core";
import React from "react";
import { IncidentCardProps } from "./IncidentCard";

const ErrorDetails: React.FC<IncidentCardProps> = ({
  VulnerabilityDoc,
  ...props
}: any) => {
  return (
    <div>
      {Object.keys(props)
        .slice(1)
        .map((key) => (
          <Typography mb="0.25rem" key={key}>
            <Span color="grey.600">{key}: </Span> {props[key]?.toString()}
          </Typography>
        ))}
    </div>
  );
};

export default ErrorDetails;
