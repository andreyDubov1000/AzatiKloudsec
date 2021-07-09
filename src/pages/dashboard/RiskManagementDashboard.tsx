import CustomBox from "@component/atoms/CustomBox";
import Loader from "@component/atoms/Loader";
import DashboardOverViewCards from "@component/dashboard/DashboardOverviewCards";
import DashboardTable from "@component/dashboard/DashboardTable";
import DashboardTitle from "@component/dashboard/DashboardTitle";
import { useAppSelector } from "@redux/hooks";
import React, { useEffect, useState } from "react";
import { getRiskMetrics } from "services/dashboardService";

const RiskManagementDashboard = () => {
  const [loading, setLoading] = useState(true);
  const [overview, setOverview] = useState<any>({});
  const [accountList, setAccountList] = useState<any[]>([]);
  const [totalAccount, setTotalAccount] = useState(0);

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      getRiskMetrics(user.user_id).then((data) => {
        if (data) {
          const list =
            data.AwsAccounts?.map((item: any) => ({
              LOW: item.VulnerabilityMetrics.LOW,
              MEDIUM: item.VulnerabilityMetrics.MEDIUM,
              HIGH: item.VulnerabilityMetrics.HIGH,
              CRITICAL: item.VulnerabilityMetrics.CRITICAL,
              id: item.AccountId,
            })) || [];

          setAccountList(list);
          setTotalAccount(data.TotalAwsAccounts || 0);
          setOverview(data.UserVulnerabilityMetrics);
        }
        setLoading(false);
      });
    }
  }, [user]);

  return !loading ? (
    <CustomBox sx={{ p: "1.5rem" }}>
      <DashboardTitle title="Risk Management Analytics" total={totalAccount} />
      <DashboardOverViewCards {...overview} />
      <DashboardTable accountList={accountList} loading={loading} />
    </CustomBox>
  ) : (
    <Loader />
  );
};

export default RiskManagementDashboard;
