type Navigation =
  | {
      title: string;
      url: string;
      children?: never;
    }
  | {
      title: string;
      url?: never;
      children: Array<Navigation>;
    };

const docNavigations: Array<Navigation> = [
  {
    title: "Introduction",
    url: "/docs/introduction",
  },
  {
    title: "Cloud Providers",
    children: [
      {
        title: "AWS",
        children: [
          {
            title: "AWS Security Introduction",
            url: "/docs/aws/introduction",
          },
          {
            title: "Identity and Access Management",
            url: "/docs/aws/iam",
          },
          {
            title: "Logging and Monitoring",
            url: "/docs/aws/logging-and-monitoring",
          },
          {
            title: "Data Protection",
            children: [
              {
                title: "Data Protection",
                url: "/docs/aws/data-protection",
              },
              {
                title: "Unencrypted s3 bucket",
                url: "/docs/KS_AWS_S3_00066",
              },
              {
                title: "Access Analyzer has active findings",
                url: "/docs/KS_AWS_ACCESS_ANALYZER_00121",
              },
              {
                title: "ACM Certificate Expired",
                url: "/docs/KS_AWS_ACM_00117",
              },
              {
                title: "ACM Certificate will expire in the less than 30 days",
                url: "/docs/KS_AWS_ACM_00118",
              },
              {
                title: "ACM Certificate Wildcard Usage",
                url: "/docs/KS_AWS_ACM_00119",
              },
              {
                title: "Athena workgroup query results are not encrypted",
                url: "/docs/KS_AWS_ATHENA_00107",
              },
              {
                title: "Cloudformation output expose secrets",
                url: "/docs/KS_AWS_CLOUDFORMATION_00092",
              },
              {
                title: "Unencrypted cloudwatch log group",
                url: "/docs/KS_AWS_CLOUDWATCH_00093",
              },
              {
                title: "Amazon Comprehend job output results data are not encrypted",
                url: "/docs/KS_AWS_COMPREHEND_00124",
              },
              {
                title: "Trail not encrypted",
                url: "/docs/KS_AWS_CT_00082",
              },
            ],
          },
          {
            title: "Network",
            url: "/docs/aws/network",
          },
          {
            title: "Infrastructure",
            url: "/docs/aws/infrastructure",
          },
          {
            title: "General",
            url: "/docs/aws/general",
          },
        ],
      },
      {
        title: "AZURE",
        url: "/docs/azure",
      },
      {
        title: "GOOGLE CLOUD",
        url: "/docs/gcp",
      },
      {
        title: "ALIBABA CLOUD",
        url: "/docs/alibaba",
      },
      {
        title: "IBM CLOUD",
        url: "/docs/ibm",
      },
    ],
  },
];

export default docNavigations;
