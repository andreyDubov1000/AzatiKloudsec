import KloudApi from "./kloudApi";

type SecurityException = {
  resource_vulnerability_id: string;
  cloud_service: string;
  security_exception_comment: string;
  security_exception_author: string;
};

export const getOverallUserAccountStatus = async (user_id: string) => {
  return KloudApi.get(`/users/${user_id}/providers/aws/status`);
};

export const createSecurityException = async (
  user_id: string,
  account_id: string,
  data: SecurityException
) => {
  return KloudApi.post(
    `/users/${user_id}/providers/aws/accounts/${account_id}/security-exceptions`,
    data
  );
};

export const getAllSecurityExcepions = async (
  user_id: string,
  account_id: string
) => {
  return KloudApi.get(
    `/users/${user_id}/providers/aws/accounts/${account_id}/security-exceptions`
  );
};

export const deleteSecurityException = async (
  user_id: string,
  account_id: string,
  resource_vulnerability_id: string
) => {
  return KloudApi.delete(
    `/users/${user_id}/providers/aws/accounts/${account_id}/security-exceptions/${resource_vulnerability_id}`
  );
};
