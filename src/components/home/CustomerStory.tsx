import CustomBox from "@component/atoms/CustomBox";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import CustomImage from "@component/atoms/CustomImage";
import { H5, Paragraph, Span } from "@component/atoms/Typography";
import { Avatar, Fab, Theme } from "@material-ui/core";
import { FormatQuote } from "@material-ui/icons";
import { makeStyles } from "@material-ui/styles";
import React from "react";

const useStyles = makeStyles(({ palette }: Theme) => ({
  root: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    maxWidth: 600,
    marginLeft: "auto",
    marginRight: "auto",
  },
  avatarHolder: {
    position: "relative",
    marginBottom: "3rem",
  },
  avatar: {
    height: 130,
    width: 130,
    transform: "rotate(-15deg)",
    border: `4px solid ${palette.primary.light}`,
  },
  verticalBar: {
    height: 64,
    width: 3,
    background: palette.primary.main,
    borderRadius: 300,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export interface CustomerStoryProps {}

const CustomerStory: React.FC<CustomerStoryProps> = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <div className={classes.avatarHolder}>
        <Avatar
          className={classes.avatar}
          src="/assets/images/faces/Hafedh_Mounir.png"
        />
        <Fab
          color="secondary"
          sx={{
            position: "absolute",
            bottom: -10,
            right: -20,
          }}
        >
          <FormatQuote fontSize="large" sx={{ transform: "rotate(-180deg)" }} />
        </Fab>
      </div>
      <Paragraph fontSize="16px" mb="3rem" textAlign="center">
        At Cloudinit the security of AWS infrastructure is something important.
        The consulting compaany has tens of sensitive workloads served from AWS
        cloud and used by millions of customers, so the security is taken very
        seriousely and KloudSec helped us to achieve a very high standard level
        of security.
      </Paragraph>

      <CustomFlexBox sx={{ width: "100%", alignItems: "center" }}>
        <CustomBox sx={{ flex: "1 1 0" }}>
          <div>
            <H5 letterSpacing={1.1} mb="0.5rem">
              Hafedh Mounir
            </H5>
            <Span fontSize="16px" whiteSpace="pre-wrap" letterSpacing={2}>
              CEO / Security Manager
            </Span>
          </div>
        </CustomBox>
        <div className={classes.verticalBar} />
        <CustomBox sx={{ flex: "1 1 0" }}>
          <CustomImage
            src="/assets/images/company/Cloudinit_Logo.png"
            alt="brex"
            sx={{
              maxHeight: 80,
              maxWidth: "100%",
              mx: "auto",
              display: "block",
            }}
          />
        </CustomBox>
      </CustomFlexBox>
      {/* <Grid container spacing={0} alignItems="center">
        <Grid item sm={5} xs={6}>
          <H5 letterSpacing={1.1} mb="0.5rem">
            Hafedh Mounir
          </H5>
          <Span fontSize="16px" letterSpacing={2}>
            CEO / Security Manager
          </Span>
        </Grid>
        <Grid item xs={1}>
          <div className={classes.verticalBar} />
        </Grid>
        <Grid item sm={5} xs={5}>
          <CustomImage
            src="/assets/images/company/Cloudinit_Logo.png"
            alt="brex"
            sx={{
              maxHeight: 80,
              maxWidth: "100%",
              mx: "auto",
              display: "block",
            }}
          />
        </Grid>
      </Grid> */}
    </div>
  );
};

export default CustomerStory;
