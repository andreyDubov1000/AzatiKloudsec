import PasswordConfirmationForm from "@component/auth/PasswordConfirmationForm";
import AuthLayout from "@component/layouts/AuthLayout";
import React from "react";

const PasswordConfirmation = () => {
  return (
    <AuthLayout
      greetingText="Welcome to KloudSec"
      imgUrl="/assets/images/illustrations/password.svg"
    >
      <PasswordConfirmationForm />
    </AuthLayout>
  );
};

export default PasswordConfirmation;
