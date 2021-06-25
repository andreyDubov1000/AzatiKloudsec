import Loader from "@component/atoms/Loader";
import React from "react";
export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <div>
      <div>testing.....</div>
      <Loader />
    </div>
  );
};

export default Dashboard;
