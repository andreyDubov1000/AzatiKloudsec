import { useAppSelector } from "@redux/hooks";
import React from "react";
import { Redirect, Route } from "react-router-dom";

export interface AuthGuardProps {
  component: React.FC<any>;
  path: string;
}

const AuthGuard: React.FC<AuthGuardProps> = ({
  component: Component,
  ...rest
}) => {
  const { token } = useAppSelector((store) => store.auth);

  const checkRouteAccess = () => {
    return !!token?.id_token;
    // return true;
  };

  return (
    <Route
      {...rest}
      render={(props) => {
        return checkRouteAccess() ? (
          <Component {...props} />
        ) : (
          <Redirect to="/login" />
        );
      }}
    />
  );
};

export default AuthGuard;
