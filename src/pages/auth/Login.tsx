import LoginForm from "@component/auth/LoginForm";
import AuthLayout from "@component/layouts/AuthLayout";
import React from "react";

const Login = () => {
  return (
    <AuthLayout greetingText="Welcome back">
      <LoginForm />
    </AuthLayout>
  );
};

export default Login;
