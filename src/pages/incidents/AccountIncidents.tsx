import CustomBox from "@component/atoms/CustomBox";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import PageTitle from "@component/atoms/PageTitle";
import IntegrationsSidenav from "@component/layouts/IntegrationsSidenav";
import { useAppSelector } from "@redux/hooks";
import React, { useEffect } from "react";
import { useParams } from "react-router-dom";
import { getUserAccountStatus } from "services/incidentService";

const AccountIncidents = () => {
  const { user } = useAppSelector((store) => store.auth);
  const { slug }: any = useParams();

  useEffect(() => {
    if (user?.user_id && slug) {
      getUserAccountStatus(user.user_id, slug).then((data) => {
        console.log(data);
      });
    }
  }, [slug, user]);

  return (
    <CustomFlexBox>
      <PageTitle title="Current Security Incidents" />
      <IntegrationsSidenav />
      <CustomBox
        sx={{
          p: "1rem",
          bgcolor: "white",
          flex: "1 1 0",
          height: "100vh",
          overflow: "auto",
        }}
      >
        <h1>{slug}</h1>
      </CustomBox>
    </CustomFlexBox>
  );
};

export default AccountIncidents;
