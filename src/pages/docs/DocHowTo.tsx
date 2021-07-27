import CodeSnippet from "@component/atoms/CodeSnippet";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import { H1, H2, Paragraph, Span } from "@component/atoms/Typography";
import { Card, Divider } from "@material-ui/core";
import React from "react";

export interface DocHowToProps {}

const DocHowTo: React.FC<DocHowToProps> = () => {
  return (
    <CustomFlexBox>
      <Card sx={{ flex: "1 1 0", p: "1.5rem", bgcolor: "white", m: "1rem" }}>
        <H1 mb="0.75rem">Documentation</H1>
        <Span>How add documentation</Span>

        <Divider
          sx={{ borderWidth: "1px", borderColor: "grey.300", my: "1.75rem" }}
        />

        <H2 mb="0.75rem">Step 1</H2>
        <Paragraph lineHeight="1.625" mb="1.75rem">
          Create a file <code className="code">./src/pages</code> with{" "}
          <code className="code">.tsx</code> extention. For example,{" "}
          <code className="code">YourFile.tsx</code>
        </Paragraph>

        <H2 mb="0.75rem">Step 2</H2>
        <Paragraph lineHeight="1.625" mb="0.25rem">
          Add this file in{" "}
          <code className="code">./src/pages/docs/DocRoutes.tsx</code>. Put your
          preferred url and filename that you just created.
        </Paragraph>
        <CodeSnippet sx={{ mb: "1.75rem" }}>
          {`import { lazy } from "react";

const docRoutes = [
  {
    path: "/docs/introduction",
    component: lazy(() => import("./DocIntro")),
  },
  {
    path: "/docs/your-url",
    component: lazy(() => import("./YourFile")),
  },
];

export default docRoutes;`}
        </CodeSnippet>

        <H2 mb="0.75rem">Step 3</H2>
        <Paragraph lineHeight="1.625" mb="0.25rem">
          Add the same url in{" "}
          <code className="code">./src/data/docNavigations.ts</code> for
          navigation. That's it. You are ready to go.
        </Paragraph>
        <CodeSnippet sx={{ mb: "1.75rem" }}>
          {`const docNavigations = [
  {
    title: "How to Add Doc",
    url: "/docs/how-to",
  },
  {
    title: "Introduction",
    url: "/docs/introduction",
  },
]`}
        </CodeSnippet>

        <H2 mb="0.75rem">Step 4</H2>
        <Paragraph lineHeight="1.625" mb="0.25rem">
          For reference please follow{" "}
          <code className="code">./src/pages/DocIntro.tsx</code> file
        </Paragraph>
      </Card>
    </CustomFlexBox>
  );
};

export default DocHowTo;
