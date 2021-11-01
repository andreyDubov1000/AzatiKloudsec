const topbarNavigations = [
  {
    title: "Product",
    sectionId: "products",
  },
  {
    title: "Customers",
    sectionId: "testimonial",
  },
  {
    title: "Pricing",
    sectionId: "pricing",
  },
  {
    title: "Company",
    children: [
      {
        title: "Blog",
        extlink: "https://kloudsec.medium.com",
      },
      {
        title: "Careers",
        url: "/careers",
      },
      {
        title: "About Us",
        url: "/about-us",
      },
    ],
  },
  {
    title: "Docs",
    url: "/docs",
  },
  {
    title: "Login",
    url: "/login",
  },
  {
    title: "Sign Up",
    url: "/signup",
    outlined: true,
  },
];

export default topbarNavigations;
