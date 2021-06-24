import NotificationManager from "@component/atoms/NotificationManager";
import { H4 } from "@component/atoms/Typography";
import { TextField } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { SAVE_TOKEN } from "@redux/auth/authTypes";
import { useAppDispatch } from "@redux/hooks";
import React, { Fragment, useState } from "react";
import { useHistory } from "react-router-dom";
// import { Link } from "react-router-dom";
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

  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleMFAVerification = async () => {
    if (!!!otp.trim()) return;

    setLoading(true);

    const data = await verifyMFA({
      otp_code: otp.substr(0, 6),
      email,
      verification_session,
      verification_type,
    });

    setLoading(false);

    if (data) {
      data.email = email;
      dispatch({ type: SAVE_TOKEN, data });
      history.push("/dashboard");
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
        onClick={handleMFAVerification}
      >
        Confirm Login
      </LoadingButton>

      {/* <Link to="/login">
        <Span
          display="block"
          color="primary.main"
          mt="2rem"
          textAlign="center"
          letterSpacing="1.1"
          fontSize="12px"
        >
          Login
        </Span>
      </Link>

      <Link to="/signup">
        <Span
          display="block"
          color="primary.main"
          mt="0.5rem"
          textAlign="center"
          letterSpacing="1.1"
          fontSize="12px"
        >
          Create Account
        </Span>
      </Link> */}
    </Fragment>
  );
};

export default MFAVerification;
