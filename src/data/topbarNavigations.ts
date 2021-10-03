const topbarNavigations = [
  {
    title: "Product",
    sectionId: "product",
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
        url: "/blog",
      },
      {
        title: "About Us",
        url: "/about-us",
      },
      {
        title: "Careers",
        url: "/careers",
      },
    ],
  },
  {
    title: "Docs",
    url: "/docs",
  },
  // {
  //   title: "Book demo",
  //   url: "/book-demo",
  // },
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
