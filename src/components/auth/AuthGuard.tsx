import NotificationManager from "@component/atoms/NotificationManager";
import { useAppSelector } from "@redux/hooks";
import React from "react";
import { Redirect, Route, useHistory } from "react-router-dom";

export interface AuthGuardProps {
  component: React.FC<any>;
  isPrivate: boolean;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  component: Component,
  isPrivate,
  ...rest
}) => {
  const history = useHistory();
  const { user } = useAppSelector((store) => store.auth);

  const checkRouteAccess = () => {
    if (!!user?.uid && !user?.emailVerified) {
      NotificationManager.info("Please, verify your email");
      history.push("/verify-email");
      // return user?.emailVerified;
    } else if (!!user?.uid && !user?.can_join) {
      NotificationManager.info("Account is not approved yet");
      return user?.can_join;
    }
    return !!user?.uid;
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return checkRouteAccess() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/signin" />
        );
      }}
    />
  );
};

export default AuthGuard;
