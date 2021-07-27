import Code from "@component/atoms/CodeSnippet";
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
        <H1 mb="0.75rem">Workflows</H1>
        <Span>Build custom HR data processes with your own business logic</Span>

        <Divider
          sx={{ borderWidth: "1px", borderColor: "grey.300", my: "1.75rem" }}
        />

        <H2 mb="0.75rem">Overview</H2>
        <Paragraph lineHeight="1.625" mb="1.75rem">
          The new HrFlow Workflows feature allows you to run your HR-related
          pipelines without ever worrying about servers. Whether you need to
          continuously run some routines or have a triggered execution both
          scenarios are possible with Workflows. Two main execution modes are
          available: Catch and Pull. <br /> <br />
          The Catch mode is a webhook-like setup that allows you to execute your
          code whenever a request is made to a precise endpoint. The Pull mode
          is similar to a cron job which is executed at the rate of your
          choosing. In both modes, the code you submit can leverage the hrflow
          sdk to seamlessly create value with your HR data and HrFlow's
          AI-Powered Job & Profile API.
        </Paragraph>

        <CustomAlert severity="error" sx={{ mb: "1.5rem" }}>
          The Catch mode is a webhook-like setup that allows you to execute your
          code whenever a request is made to a precise endpoint. The Pull mode
          is similar to a cron job which is executed at the rate of your
          choosing. In both modes, the code you submit can leverage the hrflow
          sdk to seamlessly create value with your HR data and HrFlow's
          AI-Powered Job & Profile API.
        </CustomAlert>
        <CustomAlert severity="info" sx={{ mb: "1.75rem" }}>
          <ul>
            <li>application/json</li>
            <li>multipart/form-data</li>
            <li>application/x-www-form-urlencoded</li>
          </ul>
        </CustomAlert>

        <Code language="jsx">
          {`
import json
import requests

from hrflow import Hrflow

def workflow(_request, settings):
    client = Hrflow(api_secret=settings["API_KEY"], api_user=settings["USER_EMAIL"])
    
    file_url = _request["file_url"]
    file_content = requests.get(file_url, allow_redirects=True).content
    
    client.profile.parsing.add_file(
        source_key=settings["SOURCE_KEY"]),
        profile_file=file_content,
        profile_content_type="application/pdf",
        reference="profile_reference"
    )
    
    id = requests.post(settings["OTHER_SERVICE_URL"], data={"key": "value"}).json()["id"]
    
    return dict(
        status_code=201,
        headers={"Content-Type": "application/json"},
        body=json.dumps({"id": id})
    )
`.trim()}
        </Code>

        <ReactPlayer
          url="https://jsfiddle.net/krkcvx9s/"
          controls
        />

        <CustomImage
          src="https://images.unsplash.com/photo-1508919801845-fc2ae1bc2a28?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8aW1nfGVufDB8fDB8fA%3D%3D&ixlib=rb-1.2.1&w=1000&q=80"
          width="100%"
          sx={{ mt: "1.5rem", borderRadius: 1 }}
        />
      </Card>
      {/* <Card sx={{ my: "1rem", mr: "1rem", p: "1rem", bgcolor: "white" }}>
        Content
      </Card> */}
    </CustomFlexBox>
  );
};

export default DocIntro;
