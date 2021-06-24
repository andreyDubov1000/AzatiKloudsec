import Loader from "@component/atoms/Loader";
import { SAVE_TOKEN } from "@redux/auth/authTypes";
import { useAppDispatch, useAppSelector } from "@redux/hooks";
import React, { Fragment, useCallback, useEffect, useState } from "react";
import { refreshToken } from "services/authService";

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
      }
    }

    setLoading(false);
  }, [dispatch]);

  useEffect(() => {
    if (token) {
      setLoading(false);
    } else {
      checkToken();
    }
  }, [checkToken, dispatch, token]);

  return loading ? <Loader /> : <Fragment>{children}</Fragment>;
};

export default Auth;
