import KloudApi from "./kloudApi";

export const getAWSAccounts = async (user_id: string) => {
  return KloudApi.get(`/users/${user_id}/providers/aws/accounts`);
};
