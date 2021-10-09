import { User } from "@redux/auth/authTypes";
import KloudApi from "./kloudApi";

type createNewUserProps = {
  user_id: string;
  email: string;
};

type confirmPasswordProps = {
  user_id: string;
  email: string;
  qr_code_secret_url: string;
};

type loginPops = {
  email: string;
  verification_type: string;
  verification_session: string;
};

// ============== Signup API ========================

export const createNewUser = async (data: any): Promise<createNewUserProps> => {
  return await KloudApi.post("/users", data);
};

export const confirmPassword = async (
  data: any,
  user_id: string
): Promise<confirmPasswordProps> => {
  return await KloudApi.post(`/users/${user_id}/confirm`, data);
};

export const confirmAccount = async (data: any, user_id: string) => {
  return await KloudApi.post(`/users/${user_id}/confirm-mfa`, data);
};

// ============== Login API ========================

export const login = async (data: any): Promise<loginPops> => {
  return await KloudApi.post("/login", data);
};

export const verifyMFA = async (data: any) => {
  return await KloudApi.post("/mfa-verify", data);
};

export const forgotPassword = async (data: any) => {
  return await KloudApi.post("/forgot-password", data);
};

export const resetPassword = async (data: any, user_id: string) => {
  return await KloudApi.post(`/users/${user_id}/confirm-password`, data);
};

export const refreshToken = async (data: any) => {
  return await KloudApi.post(`/refresh-token`, data);
};

export const getUserInfo = async (): Promise<User> => {
  return await KloudApi.get(`/userinfos`);
};

export const signOut = async (data: any) => {
  return await KloudApi.post(`/logout`, data);
};

export const setApiHeader = (id_token: string) => {
  KloudApi.setHeader(id_token);
};
