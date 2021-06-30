import {
  AuthAction,
  InitialAuthState,
  SAVE_TOKEN,
  SAVE_USER_INFO,
} from "./authTypes";

const initialState: InitialAuthState = {
  token: null,
  user: null,
};

const authReducer = (state = initialState, action: AuthAction) => {
  switch (action.type) {
    case SAVE_TOKEN: {
      localStorage.setItem("token", JSON.stringify(action.data));
      return { ...state, token: action.data };
    }
    case SAVE_USER_INFO: {
      return { ...state, user: action.data };
    }
    default: {
      return { ...state };
    }
  }
};

export default authReducer;
