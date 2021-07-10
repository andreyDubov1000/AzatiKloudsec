import { styled } from "@material-ui/core/styles";

const AuthLayoutWrapper = styled("div")(
  ({ theme: { palette, breakpoints } }) => ({
    minHeight: "100vh",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: `url(/assets/images/backgrounds/login-abstract.svg) center/cover, linear-gradient(118.65deg, ${palette.primary.light} -2.55%, ${palette.primary.main} -2.54%, ${palette.primary.dark} 95.19%)`,

    "& .card": {
      width: 750,
      margin: "2rem 1rem",
      borderRadius: "1rem !important",
      boxShadow: `0 0 20px 8px rgba(0,0,0,0.35)`,
      [breakpoints.down("sm")]: {
        width: "calc(100% - 1rem)",
      },
    },
    "& .card-left": {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "4rem 2rem",
      height: "100%",
      background: `linear-gradient(241.16deg, ${palette.primary.light} 8.11%, ${palette.primary.main} 89.03%)`,
      "& > img": {
        maxWidth: 300,
        margin: "0px auto",
      },
    },
    "& .card-title": {
      display: "inline-block",
      color: palette.primary.contrastText,
      marginTop: "0.5rem",
      marginBottom: "2rem",
      padding: "0.4rem 1.5rem 0.4rem 1rem",
      borderRadius: "0 50px 50px 0",
      background: `linear-gradient(266.8deg, ${palette.primary.main} -11.77%, ${palette.primary.dark} 198.06%)`,
    },
  })
);

export default AuthLayoutWrapper;
