import KloudApi from "./kloudApi";

export const scheduleDemo = async (data: any) => {
  return KloudApi.post(`/schedule-demo`, data);
};
