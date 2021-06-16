import KloudApi from "./kloudApi";

type createNewUserProps = {
  user_id: string;
  email: string;
};

type confirmUserProps = {
  user_id: string;
  email: string;
  qr_code_secret_url: string;
};

type loginPops = {
  email: string;
  verification_type: string;
  verification_session: string;
};

export const createNewUser = async (data: any): Promise<createNewUserProps> =>
  await KloudApi.post("/users", data);

export const confirmUser = async (
  data: any,
  user_id: string
): Promise<confirmUserProps> =>
  await KloudApi.post(`/users/${user_id}/confirm`, data);

export const login = async (data: any): Promise<loginPops> =>
  await KloudApi.post("/login", data);

export const verifyMFA = async (data: any) => {
  return await KloudApi.post("/mfa-verify", data);
};
