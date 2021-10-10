import Code from "@component/atoms/CodeSnippet";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import CustomImage from "@component/atoms/CustomImage";
import PageTitle from "@component/atoms/PageTitle";
import { H1, H2, Paragraph, Span } from "@component/atoms/Typography";
import { Card, Divider } from "@material-ui/core";
import React from "react";

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
          An unencrypted S3 bucket is a major security risk, it means the data
          stored will not be not be encrypted at rest, readable by anyone that
          can access the bucket. If an attacker is granted access to the bucket,
          content stored will be readable. Unencrypted S3 buckets is one of the
          most common source of data leaks. Encrypting buckets will greatly
          reduce data breach risks as encrypted data isn’t readily usable. In
          order to protect data stored is S3, it is standard practice to encrypt
          data at rest. AWS provides three different mode of server-side
          encryption: SSE-S3, SSE-C, or SSE-KMS.
          <ul>
            <li>
              SSE-S3 requires that Amazon S3 manage the data and the encryption
              keys. For more information about SSE-S3, see Protecting Data Using
              Server-Side Encryption with Amazon S3-Managed Encryption Keys
              (SSE-S3).
            </li>
            <li>
              SSE-C requires that you manage the encryption key. For more
              information about SSE-C, see Protecting Data Using Server-Side
              Encryption with Customer-Provided Encryption Keys (SSE-C).
            </li>
            <li>
              SSE-KMS requires that AWS manage the data key but you manage the
              AWS KMS keys in AWS KMS.
            </li>
          </ul>
          Server-Side Encryption is not incompatible with client-side
          encryption, where one uploads encrypted data to AWS.
        </Paragraph>

        <H2 mb="0.75rem">How to fix it using the AWS console</H2>
        <Paragraph lineHeight="1.625" mb="1.75rem">
          Step 1: Navigate to the Unencrypted bucket and click on the Properties
          tab.

          <CustomImage
            src="https://kloudsec-public-assets.s3.eu-west-1.amazonaws.com/KS_AWS_S3_00066-1.png"
            width="100%"
            sx={{ borderRadius: 1 }}
          />
          Step 2: Click on the Edit button in the Default encryption panel.

          <CustomImage
            src="https://kloudsec-public-assets.s3.eu-west-1.amazonaws.com/KS_AWS_S3_00066-2.png"
            width="100%"
            sx={{ borderRadius: 1 }}
          />
          Step 3: Select Enable.

          <CustomImage
            src="https://kloudsec-public-assets.s3.eu-west-1.amazonaws.com/KS_AWS_S3_00066-3.png"
            width="100%"
            sx={{ borderRadius: 1 }}
          />
          Step 4: Select the desired encryption type, by default, SSE-S3 will be
          selected.

          <CustomImage
            src="https://kloudsec-public-assets.s3.eu-west-1.amazonaws.com/KS_AWS_S3_00066-4.png"
            width="100%"
            sx={{ borderRadius: 1 }}
          />
        </Paragraph>

        <H2 mb="0.75rem" mt="1.75rem">
          How to fix the problem using AWS CLI
        </H2>
        <Paragraph lineHeight="1.625" mb="1rem">
          To enable more complex way of encryption configuration, one can refer to the page:
	  <a href="https://docs.aws.amazon.com/cli/latest/reference/s3api/put-bucket-encryption.html" target="_blank" rel="noopener noreferrer"> put-bucket-encryption </a>
          Step 1:
	  Download and install the AWS CLI <a href="https://aws.amazon.com/cli/" target="_blank" rel="noopener noreferrer"> awscli </a>
          Make sure the CLI user has the s3:PutEncryptionConfiguration
          permission.
	  Step 2: To enable SSE-S3 Type into your favorite shell
          <Code language="bash">
            {`
    aws s3api put-bucket-encryption --bucket my-bucket --server-side-encryption-configuration '{"Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "AES256"}}]}'
 `.trim()}
          </Code>
          To enable SSE-KMS Type into your favorite shell
          <Code language="bash">
            {`
aws s3api put-bucket-encryption --bucket my-bucket --server-side-encryption-configuration '{"Rules": [{"ApplyServerSideEncryptionByDefault": {"SSEAlgorithm": "aws:kms","KMSMasterKeyID": "my-key-id"}}]}'
 `.trim()}
          </Code>
        </Paragraph>

        <H2 mb="0.75rem" mt="1.75rem">
          How to fix the problem using boto3 and python
        </H2>
        <Paragraph lineHeight="1.625" mb="1rem">
          After installing and setting up <a href="https://boto3.amazonaws.com/v1/documentation/api/latest/guide/quickstart.html" target="_blank" rel="noopener noreferrer"> boto3 </a>, you can run the following script:
          <Code language="python">
            {`
import boto3

client = boto3.client('s3')

response = client.put_bucket_encryption(
    Bucket='string',
    ContentMD5='string',
    ServerSideEncryptionConfiguration={
        'Rules': [
            {
                'ApplyServerSideEncryptionByDefault': {
                    'SSEAlgorithm': 'AES256'|'aws:kms',
                    'KMSMasterKeyID': 'string'
                },
                'BucketKeyEnabled': True|False
            },
        ]
    },
    ExpectedBucketOwner='string'
)
 `.trim()}
          </Code>
        </Paragraph>
      </Card>
    </CustomFlexBox>
  );
};

export default KS_AWS_S3_00066;
