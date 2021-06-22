import { Theme } from "@material-ui/core";
import { makeStyles } from "@material-ui/styles";
import clsx from "clsx";
import React from "react";

const useStyles = makeStyles(({ palette, ...theme }: Theme) => ({
  root: {
    position: "absolute",
    left: 0,
    right: 0,
    top: "50%",
    transform: "translateY(-50%)",
    margin: "auto",
  },
}));

const Loader = () => {
  const classes = useStyles();

  return (
    <div className={clsx("flex justify-center items-center", classes.root)}>
      <div className="sk-cube-grid">
        <div className="sk-cube sk-cube1"></div>
        <div className="sk-cube sk-cube2"></div>
        <div className="sk-cube sk-cube3"></div>
        <div className="sk-cube sk-cube4"></div>
        <div className="sk-cube sk-cube5"></div>
        <div className="sk-cube sk-cube6"></div>
        <div className="sk-cube sk-cube7"></div>
        <div className="sk-cube sk-cube8"></div>
        <div className="sk-cube sk-cube9"></div>
      </div>
    </div>
  );
};

export default Loader;
