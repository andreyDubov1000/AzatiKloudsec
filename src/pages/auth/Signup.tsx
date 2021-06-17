import SignupForm from "@component/auth/SignupForm";
import AuthLayout from "@component/layouts/AuthLayout";
import React from "react";

const Signup = () => {
  return (
    <AuthLayout greetingText="Welcome to KloudSec">
      <SignupForm />
    </AuthLayout>
  );
};

export default Signup;
