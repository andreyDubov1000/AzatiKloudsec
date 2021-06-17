import FlexBox from "@component/atoms/FlexBox";
import { Card, Grid } from "@material-ui/core";
import { Theme } from "@material-ui/core/styles";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles(
  ({ palette: { primary }, breakpoints }: Theme) => ({
    root: {
      minHeight: "100vh",
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      background: `url(/assets/images/backgrounds/login-abstract.svg) center/cover, linear-gradient(118.65deg, ${primary.light} -2.55%, ${primary.main} -2.54%, ${primary.dark} 95.19%)`,
    },
    card: {
      width: 750,
      margin: "2rem 1rem",
      borderRadius: "1rem !important",
      boxShadow: `0 0 20px 8px rgba(0,0,0,0.35)`,
      [breakpoints.down("sm")]: {
        width: "calc(100% - 1rem)",
      },
    },
    cardLeftSide: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      padding: "4rem 2rem",
      height: "100%",
      background: `linear-gradient(241.16deg, ${primary.light} 8.11%, ${primary.main} 89.03%)`,
      "& > img": {
        maxWidth: 300,
        margin: "0px auto",
      },
    },
    cardTitle: {
      display: "inline-block",
      color: primary.contrastText,
      marginTop: "0.5rem",
      marginBottom: "2rem",
      padding: "0.4rem 1.5rem 0.4rem 1rem",
      borderRadius: "0 50px 50px 0",
      background: `linear-gradient(266.8deg, ${primary.main} -11.77%, ${primary.dark} 198.06%)`,
    },
  })
);

type AuthLayoutProps = {
  greetingText: string;
  imgUrl?: string;
};

const AuthLayout: React.FC<AuthLayoutProps> = ({
  greetingText,
  imgUrl,
  children,
}) => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Card className={classes.card}>
        <Grid container>
          <Grid item md={7} sm={7} xs={12}>
            <div className={classes.cardLeftSide}>
              <img src={imgUrl} width="100%" alt="welcome" />
            </div>
          </Grid>
          <Grid item md={5} sm={5} xs={12}>
            <div className={classes.cardTitle}>{greetingText}</div>
            <FlexBox
              sx={{
                flexDirection: "column",
                alignItems: "center",
                p: { xs: "0rem 1rem 1rem", sm: "0rem 2rem 2rem" },
              }}
            >
              {children}
            </FlexBox>
          </Grid>
        </Grid>
      </Card>
    </div>
  );
};

AuthLayout.defaultProps = {
  imgUrl: "/assets/images/login-welcome.svg",
};

export default AuthLayout;
