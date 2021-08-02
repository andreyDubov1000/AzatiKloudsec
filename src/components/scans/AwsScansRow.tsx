import CustomBox from "@component/atoms/CustomBox";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import CustomImage from "@component/atoms/CustomImage";
import CustomTableRow from "@component/atoms/CustomTableRow";
import { Span } from "@component/atoms/Typography";
import { Checkbox, FormControlLabel } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import React, { useEffect, useState } from "react";
import { scanAwsAccount } from "services/scanService";

export interface AwsScansRowProps {
  userId: string;
  AccountId: string;
  scanOptions: {
    label: string;
    value: string;
    imgUrl?: string;
  }[];
}

const AwsScansRow: React.FC<AwsScansRowProps> = ({
  userId,
  AccountId,
  scanOptions,
}) => {
  const [loading, setLoading] = useState(false);
  const [requestId, setRequestId] = useState("");
  const [checkedList, setCheckedList] = useState<string[]>([]);

  const handleChange = async (e: any) => {
    const name = e.currentTarget.name;

    if (checkedList?.includes(name)) {
      if (name === "all") {
        return setCheckedList([]);
      }
      setCheckedList(checkedList.filter((item) => item !== name));
    } else {
      if (name === "all") {
        return setCheckedList(scanOptions.map((item) => item.value));
      }
      setCheckedList([...checkedList, name]);
    }
  };

  const handleScan = async () => {
    if (!!checkedList.length && userId && AccountId) {
      setLoading(true);
      const checkRequest = await scanAwsAccount(userId, AccountId, checkedList);
      if (checkRequest) setRequestId(checkRequest.RequestId);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (requestId && AccountId) {
      window.open(
        `${window.location.origin}/scans/aws/${AccountId}/${requestId}`
      );
    }
  }, [AccountId, requestId]);

  return (
    <CustomTableRow sx={{ p: "0.5rem 1rem", mb: "0.5rem" }}>
      <Span color="text.hint" mr="1rem">
        {AccountId}
      </Span>
      {scanOptions.map((item) => (
        <FormControlLabel
          name={item.value}
          key={item.value}
          label={
            <CustomFlexBox sx={{ alignItems: "center" }}>
              {item.value !== "all" && (
                <CustomImage
                  width="20px"
                  src={`/assets/images/icons/${item.label}_32.svg`}
                  alt="iam"
                  sx={{ borderRadius: 1, mr: "0.5rem" }}
                />
              )}
              <Span>{item.label}</Span>
            </CustomFlexBox>
          }
          control={
            <Checkbox
              checked={checkedList?.includes(item.value)}
              size="small"
              onChange={handleChange}
            />
          }
        />
      ))}

      <CustomBox sx={{ textAlign: "center" }}>
        <LoadingButton
          variant="contained"
          color="primary"
          size="small"
          disableElevation
          sx={{ borderRadius: "300px", px: "1rem" }}
          loading={loading}
          onClick={handleScan}
        >
          Scan
        </LoadingButton>
      </CustomBox>
    </CustomTableRow>
  );
};

export default AwsScansRow;
