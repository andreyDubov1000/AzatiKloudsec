import CustomBox from "@component/atoms/CustomBox";
import Loader from "@component/atoms/Loader";
import PageTitle from "@component/atoms/PageTitle";
import { H3 } from "@component/atoms/Typography";
import AwsScansRow from "@component/scans/AwsScansRow";
import awsServiceList from "@data/awsServiceList";
import { useAppSelector } from "@redux/hooks";
import React, { useEffect, useState } from "react";
import { getAWSAccounts } from "services/integrationsService";

const AwsScans = () => {
  const [loading, setLoading] = useState(true);
  const [accountList, setAccountList] = useState([]);

  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    const getAccountList = async (user_id: string) => {
      const list = await getAWSAccounts(user_id);

      if (list) {
        setAccountList(list.AwsAccounts);
      }

      setLoading(false);
    };

    if (user?.user_id) getAccountList(user.user_id);
  }, [user]);

  return (
    <CustomBox sx={{ p: "1.5rem" }}>
      <PageTitle title="Scans | AWS" />
      <H3 mb="1.5rem">Scans | AWS</H3>

      {loading && <Loader />}

      {accountList.map((item: any) => (
        <AwsScansRow
          {...item}
          scanOptions={scanOptions}
          userId={user?.user_id}
          key={item.AccountId}
        />
      ))}
    </CustomBox>
  );
};

const scanOptions = [
  {
    label: "All",
    value: "all",
  },
  ...awsServiceList,
];

export default AwsScans;
