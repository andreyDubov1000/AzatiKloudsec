import KloudApi from "./kloudApi";

export const getRiskMetrics = async (user_id: string) => {
  return KloudApi.get(`/users/${user_id}/providers/aws/metrics`);
};

export const getHistoricList = async (user_id: string) => {
  return KloudApi.get(`/users/${user_id}/providers/aws/historic`);
};
