const docNavigations = [
  {
    title: "How to Add Doc",
    url: "/docs/how-to",
  },
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
            url: "/docs/logging-and-monitoring",
          },
          {
            title: "Data Protection",
            url: "/docs/data-protection",
          },
          {
            title: "Network",
            url: "/docs/network",
          },
          {
            title: "Identity and Access Management",
            url: "/docs/iam",
          },
          {
            title: "Infrastructure",
            url: "/docs/infrastructure",
          },
          {
            title: "General",
            url: "/docs/general",
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
