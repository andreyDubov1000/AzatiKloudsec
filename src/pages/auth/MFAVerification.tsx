import NotificationManager from "@component/atoms/NotificationManager";
import { Button, Card, TextField } from "@material-ui/core";
import React, { useState } from "react";
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
  const [otp, setOtp] = useState("");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleLogin = async () => {
    const data = await verifyMFA({
      otp_code: otp,
      email,
      verification_session,
      verification_type,
    });

    if (data) {
      NotificationManager.success("Login Successful");
    }
    console.log(data);
  };

  return (
    <Card sx={{ p: "2rem", maxWidth: 550, mx: "auto", mt: "2rem" }}>
      <TextField
        label="OTP"
        fullWidth
        sx={{ mb: "1rem" }}
        onChange={handleChange}
      />

      <Button variant="contained" color="primary" onClick={handleLogin}>
        Confirm Login
      </Button>
    </Card>
  );
};

export default MFAVerification;
