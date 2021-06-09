import { H5, Paragraph, Span } from "@component/atoms/Typography";
import { Avatar, Fab, Grid, Theme } from "@material-ui/core";
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
          src="/assets/images/faces/face-6.jpg"
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
        Lorem Ipsum is simply dummy text of the printing and typesetting
        industry. Lorem Ipsum has been the industry's standard dummy text ever
        since the 1500s, when an unknown printer took a galley of type and
        scrambled
      </Paragraph>

      <Grid container spacing={0} alignItems="center">
        <Grid item sm={5} xs={6}>
          <H5 letterSpacing={1.1} mb="0.5rem">
            Adward Johnson
          </H5>
          <Span fontSize="16px" letterSpacing={2}>
            Security Manager
          </Span>
        </Grid>
        <Grid item xs={1}>
          <div className={classes.verticalBar} />
        </Grid>
        <Grid item sm={5} xs={5}>
          <img
            src="/assets/images/brex.png"
            style={{
              maxHeight: 38,
              maxWidth: "100%",
            }}
            alt="brex"
          />
        </Grid>
      </Grid>
    </div>
  );
};

export default CustomerStory;
