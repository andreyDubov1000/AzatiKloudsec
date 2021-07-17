import AnalyticsCards from "@component/analytics/AnalyticsCards";
import AnalyticsLineChart from "@component/analytics/AnalyticsLineChart";
import AnalyticsTable from "@component/analytics/AnalyticsTable";
import AnalyticsTitle from "@component/analytics/AnalyticsTitle";
import CustomBox from "@component/atoms/CustomBox";
import Loader from "@component/atoms/Loader";
import PageTitle from "@component/atoms/PageTitle";
import { useAppSelector } from "@redux/hooks";
import React, { useCallback, useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { getHistoricList, getRiskMetrics } from "services/dashboardService";

const Analytics = () => {
  const [loading, setLoading] = useState(true);
  const [totalAccount, setTotalAccount] = useState(0);
  const [overview, setOverview] = useState<any>({});
  const [accountList, setAccountList] = useState<any[]>([]);
  const [vulnerabilityHistory, setVulnerabilityHistory] = useState<any[]>([]);

  const { user } = useAppSelector((state) => state.auth);

  const loadAnalyticsData = useCallback(async () => {
    if (!user) return;

    const [res1, res2] = await Promise.all([
      getRiskMetrics(user.user_id),
      getHistoricList(user.user_id),
    ]);

    if (res1) {
      const list =
        res1.AwsAccounts?.map((item: any) => ({
          ...item.AccountVulnerabilityMetrics,
          alias: item.AccountAlias,
          id: item.AccountId,
        })) || [];

      setAccountList(list);
      setTotalAccount(res1.TotalAwsAccounts || 0);
      setOverview(res1.UserVulnerabilityMetrics);
    }

    if (res2) {
      setVulnerabilityHistory(res2.UserSecurityVulnerabilityMetricsHistory);
    }

    setLoading(false);
  }, [user]);

  useEffect(() => {
    loadAnalyticsData();
  }, [loadAnalyticsData]);

  return (
    <PageTitle title="Dashboard | Risk Management">
      {!loading ? (
        <PerfectScrollbar options={{ suppressScrollX: false }}>
          <CustomBox sx={{ p: "1.5rem" }}>
            <AnalyticsTitle
              title="Risk Management Analytics"
              total={totalAccount}
            />
            <AnalyticsCards {...overview} />
            <AnalyticsTable accountList={accountList} loading={loading} />
            <AnalyticsLineChart vulnerabilityHistory={vulnerabilityHistory} />
          </CustomBox>
        </PerfectScrollbar>
      ) : (
        <Loader />
      )}
    </PageTitle>
  );
};

export default Analytics;
