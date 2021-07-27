import Code from "@component/atoms/CodeSnippet";
import CustomAlert from "@component/atoms/CustomAlert";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import CustomImage from "@component/atoms/CustomImage";
import { H1, H2, Paragraph, Span } from "@component/atoms/Typography";
import { Card, Divider } from "@material-ui/core";
import React from "react";
import ReactPlayer from "react-player/lazy";

export interface DocIntroAwsProps {}

const DocIntroAws: React.FC<DocIntroAwsProps> = () => {
  return (
    <CustomFlexBox>
      <Card sx={{ flex: "1 1 0", p: "1.5rem", bgcolor: "white", m: "1rem" }}>
        <H1 mb="0.75rem">AWS</H1>
        <Span>Supported services</Span>

        <Divider
          sx={{ borderWidth: "1px", borderColor: "grey.300", my: "1.75rem" }}
        />

        <H2 mb="0.75rem">Overview</H2>
        <Paragraph lineHeight="1.625" mb="1.75rem">
          The Kloudsec security allows you to find all related vulnerabilities inside your aws resources.
          For the moment, we are supporting the following aws services: <br /> <br />
          - EC2: Elastic Compute Cloud
	  - ELB: Elastic Load Balancer
        </Paragraph>

      </Card>
      {/* <Card sx={{ my: "1rem", mr: "1rem", p: "1rem", bgcolor: "white" }}>
        Content
      </Card> */}
    </CustomFlexBox>
  );
};

export default DocIntroAws;
