import React from "react";

export interface AnalyticsCardsProps {
  CRITICAL: number;
  HIGH: number;
  LOW: number;
  MEDIUM: number;
  children?: never;
  [key: string]: any;
}

const AnalyticsCards = (props: AnalyticsCardsProps) => {
  return <div>cards</div>;
};

export default AnalyticsCards;
