import Code from "@component/atoms/CodeSnippet";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import CustomImage from "@component/atoms/CustomImage";
import PageTitle from "@component/atoms/PageTitle";
import { H1, H2, Paragraph, Span } from "@component/atoms/Typography";
import { Card, Divider } from "@material-ui/core";
import React from "react";

export interface KS_AWS_ACM_00117Props {}

const KS_AWS_ACM_00117: React.FC<KS_AWS_ACM_00117Props> = () => {
  return (
    <CustomFlexBox>
      <PageTitle title="Data Protection | ACM Certificate Expired" />
      <Card sx={{ flex: "1 1 0", p: "1.5rem", bgcolor: "white", m: "1rem" }}>
        <H1 mb="0.75rem">ACM Certificate Expired</H1>
        <Span>Prevent data leak</Span>

        <Divider
          sx={{ borderWidth: "1px", borderColor: "grey.300", my: "1.75rem" }}
        />

        <H2 mb="0.75rem">Overview</H2>
        <Paragraph lineHeight="1.625" mb="1.75rem">
		ACM Certificate Expired
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

export default KS_AWS_ACM_00117;
