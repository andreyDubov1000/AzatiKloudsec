import CustomAlert from "@component/atoms/CustomAlert";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import CustomImage from "@component/atoms/CustomImage";
import PageTitle from "@component/atoms/PageTitle";
import { H1, H2, Paragraph, Span } from "@component/atoms/Typography";
import { Card, Divider } from "@material-ui/core";
import React from "react";
import ReactPlayer from "react-player/lazy";

export interface KS_AWS_S3_00066Props {}

const KS_AWS_S3_00066: React.FC<KS_AWS_S3_00066Props> = () => {
  return (
    <CustomFlexBox>
      <PageTitle title="Data Protection | Unencrypted s3 bucket" />
      <Card sx={{ flex: "1 1 0", p: "1.5rem", bgcolor: "white", m: "1rem" }}>
        <H1 mb="0.75rem">Unencrypted s3 bucket</H1>
        <Span>Prevent data leak</Span>

        <Divider
          sx={{ borderWidth: "1px", borderColor: "grey.300", my: "1.75rem" }}
        />

        <H2 mb="0.75rem">Overview</H2>
        <Paragraph lineHeight="1.625" mb="1.75rem">
	An unencrypted S3 bucket is a major security risk, it means the data stored will not be not be encrypted at rest, readable by anyone that can access the bucket. If an attacker is granted access to the bucket, content stored will be readable. Unencrypted S3 buckets is one of the most common source of data leaks. Encrypting buckets will greatly reduce data breach risks as encrypted data isn’t readily usable. 
In order to protect data stored is S3, it is standard practice to encrypt data at rest. AWS provides three different mode of server-side encryption: SSE-S3, SSE-C, or SSE-KMS.
          <ul>
            <li>
		SSE-S3 requires that Amazon S3 manage the data and the encryption keys. For more information about SSE-S3, see Protecting Data Using Server-Side Encryption with Amazon S3-Managed Encryption Keys (SSE-S3).</li>
            <li>
		SSE-C requires that you manage the encryption key. For more information about SSE-C, see Protecting Data Using Server-Side Encryption with Customer-Provided Encryption Keys (SSE-C). 
            </li>
            <li>
		SSE-KMS requires that AWS manage the data key but you manage the AWS KMS keys in AWS KMS.
            </li>
          </ul>
	Server-Side Encryption is not incompatible with client-side encryption, where one uploads encrypted data to AWS.
        </Paragraph>

        <H2 mb="0.75rem">How to fix it using the AWS console</H2>
        <Paragraph lineHeight="1.625" mb="1.75rem">
	Step 1:
	Navigate to the Unencrypted bucket and click on the Properties tab.
        <CustomImage
          src="https://kloudsec-public-assets.s3.eu-west-1.amazonaws.com/KS_AWS_S3_00066-1.png"
          width="100%"
          sx={{ borderRadius: 1 }}
        />
        </Paragraph>


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

export default KS_AWS_S3_00066;
