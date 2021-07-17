import KloudApi from "./kloudApi";

export const getOverallUserAccountStatus = async (user_id: string) => {
  return KloudApi.get(`/users/${user_id}/providers/aws/status`);
};

export const getUserAccountStatus = async (
  user_id: string,
  account_id: string
) => {
  return KloudApi.get(
    `/users/${user_id}/providers/aws/accounts/${account_id}/status`
  );
};
