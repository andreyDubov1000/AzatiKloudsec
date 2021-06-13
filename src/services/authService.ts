import axios from "axios";

// user_id: "514d4201-5585-4018-b5b4-ffee9c7f04e2"
type createNewUserProps = {
  data: {
    user_id: string;
    email: string;
  };
};

type confirmUserProps = {
  data: {
    user_id: string;
    email: string;
    qr_code_secret_url: string;
  };
};

type loginPops = {
  data: {
    email: string;
    verification_type: string;
    verification_session: string;
  };
};

export const createNewUser = async (data: any): Promise<createNewUserProps> =>
  await axios.post("/users", data);

export const confirmUser = async (
  data: any,
  user_id: string
): Promise<confirmUserProps> =>
  await axios.post(`/users/${user_id}/confirm`, data);

export const login = async (data: any): Promise<loginPops> =>
  await axios.post("/login", data);

export const verifyMFA = async (data: any) => {
  return await axios.post("/mfa-verify", data);
};
