const docNavigations = [
  {
    title: "Introduction",
    url: "/docs/introduction",
  },
  {
    title: "Cloud Providers",
    children: [
      {
        title: "AWS",
        url: "/docs/aws",
        children: [
          {
            title: "Logging and Monitoring",
            url: "/docs/aws/logging-and-monitoring",
          },
          {
            title: "Data Protection",
            url: "/docs/aws/data-protection",
          },
          {
            title: "Network",
            url: "/docs/aws/network",
          },
          {
            title: "Identity and Access Management",
            url: "/docs/aws/iam",
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
