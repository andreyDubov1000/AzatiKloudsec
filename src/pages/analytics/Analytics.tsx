import AnalyticsCards from "@component/analytics/AnalyticsCards";
import AnalyticsLineChart from "@component/analytics/AnalyticsLineChart";
import AnalyticsTable from "@component/analytics/AnalyticsTable";
import Loader from "@component/atoms/Loader";
import PageTitle from "@component/atoms/PageTitle";
import { useAppSelector } from "@redux/hooks";
import React, { useCallback, useEffect, useState } from "react";
import PerfectScrollbar from "react-perfect-scrollbar";
import { getHistoricList, getRiskMetrics } from "services/dashboardService";
import styles from "./Analytics.module.scss";

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
          <div className={styles.container}>
            <header className={styles.header}>
              <h3 className={styles.pageTitle}>Risk Management Analytics</h3>
            </header>
            <section className={styles.section}>
              <AnalyticsCards {...overview} />
            </section>
            <section className={styles.section}>
              <div className={styles.bigCard}>
                <AnalyticsTable accountList={accountList} loading={loading} />
              </div>
              <div className={styles.bigCard}>
                <AnalyticsLineChart />
              </div>
            </section>
          </div>
        </PerfectScrollbar>
      ) : (
        <Loader />
      )}
    </PageTitle>
  );
};

export default Analytics;
