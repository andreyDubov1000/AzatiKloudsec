import KloudApi from "./kloudApi";

export const scanAwsAccount = async (
  userId: string,
  accountId: string,
  scan_type: string[]
) => {
  return KloudApi.post(
    `https://api.dev.kloudsec.io/v1/users/${userId}/providers/aws/accounts/${accountId}/scan-requests`,
    {
      scan_type,
    }
  );
};

export const checkAwsScanReqest = async (
  userId: string,
  accountId: string,
  requestId: string
) => {
  return KloudApi.get(
    `https://api.dev.kloudsec.io/v1/users/${userId}/providers/aws/accounts/${accountId}/scan-requests/${requestId}`
  );
};
