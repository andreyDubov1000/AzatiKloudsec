import NotificationManager from "@component/atoms/NotificationManager";
import { H4 } from "@component/atoms/Typography";
import { TextField } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import React, { Fragment, useState } from "react";
import { verifyMFA } from "services/authService";

export interface MFAVerificationProps {
  email: string;
  verification_type: string;
  verification_session: string;
}

const MFAVerification: React.FC<MFAVerificationProps> = ({
  email,
  verification_type,
  verification_session,
}) => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleLogin = async () => {
    if (!!!otp.trim()) return;

    setLoading(true);

    const data = await verifyMFA({
      otp_code: otp,
      email,
      verification_session,
      verification_type,
    });

    setLoading(false);

    if (data) {
      NotificationManager.success("Login Successful");
    }
    console.log(data);
  };

  return (
    <Fragment>
      <H4 mb="2.5rem" color="primary.main" textAlign="center">
        Verify it's you
      </H4>

      <TextField
        label="OTP"
        fullWidth
        sx={{ mb: "1.5rem" }}
        onChange={handleChange}
      />

      <LoadingButton
        variant="contained"
        color="primary"
        sx={{
          display: "flex",
          px: "2rem",
          mx: "auto",
          borderRadius: "50px",
        }}
        loading={loading}
        onClick={handleLogin}
      >
        Confirm Login
      </LoadingButton>
    </Fragment>
  );
};

export default MFAVerification;
