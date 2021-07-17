import PageTitle from "@component/atoms/PageTitle";
import { useAppSelector } from "@redux/hooks";
import React, { useEffect } from "react";
import {
  getOverallUserAccountStatus,
  getUserAccountStatus,
} from "services/incidentService";

const Incident = () => {
  const { user } = useAppSelector((store) => store.auth);

  useEffect(() => {
    if (user?.user_id) {
      getOverallUserAccountStatus(user.user_id).then((data) => {
        console.log(data);
      });

      getUserAccountStatus(user.user_id, "922706684423").then((data) => {
        console.log(data);
      });
    }
  }, [user]);

  return (
    <div>
      <PageTitle title="Current Security Incidents" />
      <div>dfaklsdkfsdf</div>
    </div>
  );
};

export default Incident;
