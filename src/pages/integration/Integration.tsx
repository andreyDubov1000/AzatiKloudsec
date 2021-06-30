import CustomBox from "@component/atoms/CustomBox";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import { H5 } from "@component/atoms/Typography";
import AWSIcon from "@component/icons/AWSIcon";
import AddAccount from "@component/integrations/AddAccount";
import IntegrationAccount from "@component/integrations/IntegrationAccount";
import { IconButton } from "@material-ui/core";
import { useAppSelector } from "@redux/hooks";
import React, { useEffect, useState } from "react";
import { getAWSAccounts } from "services/integrationsService";

const Integration = () => {
  const [accountList, setAccountList] = useState([]);
  const { user } = useAppSelector((state) => state.auth);

  useEffect(() => {
    let interval: any = null;

    const getAccountList = async (user_id: string) => {
      const list = await getAWSAccounts(user_id);
      console.log(list);

      if (list) setAccountList(list.AwsAccounts);
    };

    if (user?.user_id) getAccountList(user.user_id);

    if (user?.user_id && !interval) {
      interval = setInterval(async () => {
        getAccountList(user.user_id);
      }, 5 * 60 * 1000);
    }

    return () => interval && clearInterval(interval);
  }, [user]);

  return (
    <CustomBox>
      <CustomFlexBox
        sx={{
          alignItems: "center",
          justifyContent: "space-between",
          mb: "2rem",
        }}
      >
        <CustomFlexBox
          sx={{
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <IconButton sx={{ bgcolor: "grey.100", p: "0.5rem", mr: "1rem" }}>
            <AWSIcon fontSize="large" />
          </IconButton>
          <H5>AWS Read Only</H5>
        </CustomFlexBox>

        <AddAccount user_id={user?.user_id} />
      </CustomFlexBox>

      {accountList.map((item, ind) => (
        <IntegrationAccount {...item} key={ind} />
      ))}
    </CustomBox>
  );
};

export default Integration;
