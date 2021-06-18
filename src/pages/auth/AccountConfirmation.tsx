import AccountConfirmationForm from "@component/auth/AccountConfirmationForm";
import AuthLayout from "@component/layouts/AuthLayout";
import React from "react";

const AccountConfirmation = () => {
  return (
    <AuthLayout
      greetingText="Welcome to KloudSec"
      imgUrl="/assets/images/illustrations/password.svg"
    >
      <AccountConfirmationForm />
    </AuthLayout>
  );
};

export default AccountConfirmation;
