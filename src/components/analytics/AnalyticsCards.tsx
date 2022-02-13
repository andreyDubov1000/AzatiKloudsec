import { RiskButton } from "@component/elements";
import React from "react";
import styles from "./AnalyticsCards.module.scss";

export interface AnalyticsCardsProps {
  CRITICAL: number;
  HIGH: number;
  LOW: number;
  MEDIUM: number;
}

const AnalyticsCards = ({
  CRITICAL,
  HIGH,
  LOW,
  MEDIUM,
}: AnalyticsCardsProps) => {
  return (
    <div className={styles.cards}>
      <RiskButton risk="low" variant="big">
        {LOW}
      </RiskButton>
      <RiskButton risk="medium" variant="big">
        {MEDIUM}
      </RiskButton>
      <RiskButton risk="high" variant="big">
        {HIGH}
      </RiskButton>
      <RiskButton risk="critical" variant="big">
        {CRITICAL}
      </RiskButton>
    </div>
  );
};

export default AnalyticsCards;
