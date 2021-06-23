import Loader from "@component/atoms/Loader";
import DashboardLayout from "@component/layouts/DashboardLayout";
import React from "react";
export interface DashboardProps {}

const Dashboard: React.FC<DashboardProps> = () => {
  return (
    <DashboardLayout>
      <Loader />
    </DashboardLayout>
  );
};

export default Dashboard;
