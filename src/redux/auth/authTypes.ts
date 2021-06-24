export const SAVE_TOKEN = "SAVE_TOKEN";

export type Token = {
  email?: string;
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
};

export type InitialAuthState = {
  token: Token | null;
};

export type AuthAction = {
  type: "SAVE_TOKEN";
  data: Token;
};
