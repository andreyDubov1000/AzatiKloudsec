import React from "react";

type Account = {
  AccountId: string;
  CRITICAL: number;
  HIGH: number;
  LOW: number;
  MEDIUM: number;
};

export interface AnalyticsTableProps {
  accountList: Account[];
  loading: boolean;
}
const AnalyticsTable = (props: AnalyticsTableProps) => {
  return <div>
    table
  </div>;
};

export default AnalyticsTable;
