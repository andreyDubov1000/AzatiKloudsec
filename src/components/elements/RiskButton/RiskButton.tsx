import classNames from "classnames";
import React, { ReactNode } from "react";
import { Button } from "react-bootstrap";
import styles from "./RiskButton.module.scss";

type RiskButtonPropsType = {
  children?: number;
  showAsClicked?: boolean;
  inactive?: boolean;
  disabled?: boolean;
  onClick?: () => any;
  className?: string;
  variant?: "big" | "small" | "circle" | "ring";
  risk?: "low" | "medium" | "high" | "critical";
};

const RiskButton = ({
  children,
  showAsClicked,
  onClick,
  className,
  inactive,
  disabled,
  risk = "low",
  variant = "big",
}: RiskButtonPropsType) => {
  return (
    <Button
      disabled={disabled}
      className={classNames(
        styles.button,
        showAsClicked && styles.asClicked,
        styles[variant],
        styles[risk],
        inactive && "inactive",
        className
      )}
      onClick={onClick}
    >
      {variant === "big" && `${children} ${risk}`}
      {variant === "small" && risk}
    </Button>
  );
};

export default RiskButton;
