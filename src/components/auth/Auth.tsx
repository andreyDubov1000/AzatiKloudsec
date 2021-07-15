import Loader from "@component/atoms/Loader";
import { SAVE_TOKEN, SAVE_USER_INFO, SIGN_OUT } from "@redux/auth/authTypes";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { getUserInfo, refreshToken, setApiHeader } from "services/authService";

const Auth: React.FC = ({ children }) => {
  const [loading, setLoading] = useState(true);

  const dispatch = useAppDispatch();
  const { token } = useAppSelector((store) => store.auth);

  const checkToken = useCallback(async () => {
    const tokenString = localStorage.getItem("token");

    if (tokenString) {
      const { email, refresh_token } = JSON.parse(tokenString);
      const data = await refreshToken({ email, refresh_token });
      if (data) {
        dispatch({ type: SAVE_TOKEN, data });
      } else {
        dispatch({ type: SIGN_OUT });
      }
    } else {
      dispatch({ type: SIGN_OUT });
    }

    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      setLoading(false);
      // get user info
      setApiHeader(token.id_token);
      getUserInfo().then((data) => {
        dispatch({ type: SAVE_USER_INFO, data });
      });
    } else {
      checkToken();
    }
  }, [checkToken, dispatch, token]);

  // refresh token after 1 hour
  useEffect(() => {
    let interval: any = null;

    interval = setInterval(() => {
      checkToken();
    }, 3000 * 1000);

    return () => {
      interval && clearInterval(interval);
    };
  }, [checkToken]);

  return loading ? <Loader /> : <Fragment>{children}</Fragment>;
};

export default Auth;
