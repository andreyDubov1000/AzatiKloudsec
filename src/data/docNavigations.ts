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
