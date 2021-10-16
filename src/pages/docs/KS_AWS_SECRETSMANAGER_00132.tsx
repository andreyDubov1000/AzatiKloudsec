import Code from "@component/atoms/CodeSnippet";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import CustomImage from "@component/atoms/CustomImage";
import PageTitle from "@component/atoms/PageTitle";
import { H1, H2, Paragraph, Span } from "@component/atoms/Typography";
import { Card, Divider } from "@material-ui/core";
import React from "react";

export interface KS_AWS_SECRETSMANAGER_00132Props {}

const KS_AWS_SECRETSMANAGER_00132: React.FC<KS_AWS_SECRETSMANAGER_00132Props> = () => {
  return (
    <CustomFlexBox>
      <PageTitle title="Data Protection | Secret is not encrypted using customer managed key" />
      <Card sx={{ flex: "1 1 0", p: "1.5rem", bgcolor: "white", m: "1rem" }}>
        <H1 mb="0.75rem">Secret is not encrypted using customer managed key</H1>
        <Span>Prevent data leak</Span>

        <Divider
          sx={{ borderWidth: "1px", borderColor: "grey.300", my: "1.75rem" }}
        />

        <H2 mb="0.75rem">Overview</H2>
        <Paragraph lineHeight="1.625" mb="1.75rem">
		Secret is not encrypted using customer managed key
        </Paragraph>

        <H2 mb="0.75rem">How to fix it using the AWS console</H2>
        <Paragraph lineHeight="1.625" mb="1.75rem">
        </Paragraph>

        <H2 mb="0.75rem" mt="1.75rem">
          How to fix the problem using AWS CLI
        </H2>
        <Paragraph lineHeight="1.625" mb="1rem">
        </Paragraph>

        <H2 mb="0.75rem" mt="1.75rem">
          How to fix the problem using boto3 and python
        </H2>
        <Paragraph lineHeight="1.625" mb="1rem">
        </Paragraph>
      </Card>
    </CustomFlexBox>
  );
};

export default KS_AWS_SECRETSMANAGER_00132;
