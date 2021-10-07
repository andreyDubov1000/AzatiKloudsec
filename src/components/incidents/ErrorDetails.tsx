import { Span } from "@component/atoms/Typography";
import { Button, TextField, Typography } from "@material-ui/core";
import { useAppSelector } from "@redux/hooks";
import React, { ChangeEvent, useEffect, useState } from "react";
import { useLocation } from "react-router";
import { createSecurityException } from "services/securityExceptionService";
import { IncidentCardProps } from "./IncidentCard";

const ErrorDetails: React.FC<IncidentCardProps> = ({
  VulnerabilityDoc,
  ...props
}: any) => {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);

  const { pathname } = useLocation();
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    setComment("");
  }, [props.ResourceVulnerabilityId]);

  const handleExceptionClick = async () => {
    setLoading(true);

    if (pathname.includes("incidents") && user) {
      const data = await createSecurityException(
        user?.user_id,
        props.AccountId,
        {
          resource_vulnerability_id: props.ResourceVulnerabilityId,
          cloud_service: props.CloudService,
          security_exception_comment: comment,
          security_exception_author: `${user?.given_name} ${user?.family_name}`,
        }
      );

      console.log(data);
    }

    setLoading(false);
  };

  const handleCommentChange = async ({
    target,
  }: ChangeEvent<HTMLInputElement>) => {
    setComment(target.value);
  };

  return (
    <div>
      {Object.keys(props)
        .slice(1)
        .map((key) => (
          <Typography mb="0.25rem" key={key}>
            <Span color="grey.600">{key}: </Span> {props[key]?.toString()}
          </Typography>
        ))}

      <TextField
        label="Exception Comment"
        variant="outlined"
        value={comment}
        minRows={4}
        multiline
        fullWidth
        sx={{ mt: "1rem" }}
        onChange={handleCommentChange}
      />
      <Button
        color="error"
        variant="contained"
        size="small"
        disableElevation
        sx={{ mt: "1rem", textTransform: "none" }}
        disabled={!!!comment || loading}
        onClick={handleExceptionClick}
      >
        Mark as Exception
      </Button>
    </div>
  );
};

export default ErrorDetails;
