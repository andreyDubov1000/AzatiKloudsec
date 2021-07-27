const docNavigations = [
  {
    title: "Introduction",
    url: "/docs/introduction",
  },
  {
    title: "Getting Started",
    children: [
      {
        title: "React",
        url: "/docs/react",
      },
      {
        title: "Vue",
        url: "/docs/vue",
      },
      {
        title: "test",
        children: [
          {
            title: "React",
            url: "/docs/react",
          },
          {
            title: "Vue",
            url: "/docs/vue",
          },
        ],
      },
    ],
  },
];

export default docNavigations;
