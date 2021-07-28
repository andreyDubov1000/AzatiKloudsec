import CustomAlert from "@component/atoms/CustomAlert";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import CustomImage from "@component/atoms/CustomImage";
import { H1, H2, Paragraph, Span } from "@component/atoms/Typography";
import { Card, Divider } from "@material-ui/core";
import React from "react";
import ReactPlayer from "react-player/lazy";

export interface DocIntroProps {}

const DocIntro: React.FC<DocIntroProps> = () => {
  return (
    <CustomFlexBox>
      <Card sx={{ flex: "1 1 0", p: "1.5rem", bgcolor: "white", m: "1rem" }}>
        <H1 mb="0.75rem">Kloudsec</H1>
        <Span>Secure your cloud infrastrcture</Span>

        <Divider
          sx={{ borderWidth: "1px", borderColor: "grey.300", my: "1.75rem" }}
        />

        <H2 mb="0.75rem">Overview</H2>
        <Paragraph lineHeight="1.625" mb="1.75rem">
          The Kloudsec security allows you to run confidently your cloud related
          resources without ever worrying about security vulnerabilities.
          Whether you need to continuously run some CI/CD pipelines that creates
          cloud resources or create them using your cloud provider interafce.
          Kloudsec will catch all those vulnerabilities and notify you, using
          the right channel, the one you've configured. <br /> <br />
          Once those vulnerabilities detected, you have the choice to: code
          whenever a request is made to a precise endpoint. The Pull mode
        </Paragraph>

        <CustomAlert severity="info" sx={{ mb: "1.75rem" }}>
          <ul>
            <li>Use the proposed documentation to fix the vulnerabilities</li>
            <li>
              Use the button remediate in order to launch the appropriate
              remdiation scripts and fix those vulnerabilities
            </li>
            <li>
              Silent those vulnerabilities by adding them to the security
              exceptions
            </li>
            <li>
              For Enterprise Premium customers, you can also contact your
              Kloudsec cloud security engeenir in order to assist you on those
              tasks
            </li>
          </ul>
        </CustomAlert>

        <H2 mb="0.75rem">A tour of the interface</H2>
        <Paragraph lineHeight="1.625" mb="1.75rem">
          In this video, we will introduce you to the kloudsec interace, to
          familirize you with all the concepts behind it.
        </Paragraph>

        <ReactPlayer
          url="https://kloudsec-public-assets.s3.eu-west-1.amazonaws.com/KloudSecApp_Interface.mov"
          controls
        />

        <H2 mb="0.75rem" mt="1.75rem">
          A quick Overview of the API
        </H2>
        <Paragraph lineHeight="1.625" mb="1rem">
          In order to support your frequent infrastrcture deployments you can
          use either our API or our terraform provider to detect security issues
          inside your changes of infrastrcture, this can act as a gate for
          production deployment validation.
        </Paragraph>

        <CustomImage
          src="https://kloudsec-public-assets.s3.eu-west-1.amazonaws.com/Kloudsec_Api_Demo.png"
          width="100%"
          sx={{ borderRadius: 1 }}
        />
      </Card>
      {/* <Card sx={{ my: "1rem", mr: "1rem", p: "1rem", bgcolor: "white" }}>
        Content
      </Card> */}
    </CustomFlexBox>
  );
};

export default DocIntro;
