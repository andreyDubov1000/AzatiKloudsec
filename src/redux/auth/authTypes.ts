export const SAVE_TOKEN = "SAVE_TOKEN";
export const SAVE_USER_INFO = "SAVE_USER_INFO";

export type Token = {
  email?: string;
  access_token: string;
  refresh_token: string;
  id_token: string;
  expires_in: number;
};

export type User = {
  user_id: string;
  email: string;
  family_name: string;
  given_name: string;
  groups: [any];
};

export type InitialAuthState = {
  token: Token | null;
  user: User | null;
};

export type AuthAction =
  | {
      type: "SAVE_TOKEN";
      data: Token;
    }
  | {
      type: "SAVE_USER_INFO";
      data: User;
    };
