import DashboardLayout from "@component/layouts/DashboardLayout";
import React from "react";
export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <DashboardLayout>
      {[...new Array(100)].map((item, ind) => (
        <h1>shah ali</h1>
      ))}
    </DashboardLayout>
  );
};

export default Dashboard;
