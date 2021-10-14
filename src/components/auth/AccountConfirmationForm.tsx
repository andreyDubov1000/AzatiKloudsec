import NotificationManager from "@component/atoms/NotificationManager";
import { Span } from "@component/atoms/Typography";
import { Box, TextField } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import React, { Fragment, useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { confirmAccount } from "services/authService";

export interface AccountConfirmationFormProps {
  //   email: string;
  //   verification_type: string;
  //   verification_session: string;
}

const AccountConfirmationForm: React.FC<AccountConfirmationFormProps> = () => {
  const [loading, setLoading] = useState(false);
  const [otp, setOtp] = useState("");
  const { state } = useLocation<any>();
  const { search } = useLocation();
  const history = useHistory();

  const qr_code = state?.qr_code;

  const searchParams = new URLSearchParams(search.substr(1));
  const user_id = searchParams.get("user_id");
  const email = searchParams.get("email");

  const handleChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtp(e.target.value);
  };

  const handleAccountConfirmation = async () => {
    if (!!!otp.trim() || !user_id) return;

    setLoading(true);

    const data = await confirmAccount(
      {
        otp,
        email,
      },
      user_id
    );

    setLoading(false);

    if (data) {
      NotificationManager.success("Account was confirmed successfully");
      history.push("/login");
    }
    console.log(data);
  };

  console.log(state);

  return (
    <Fragment>
      {/* <H4 mb="2.5rem" color="primary.main" textAlign="center">
        Verify it's you
      </H4> */}

      {qr_code ? (
        <Fragment>
          <Box maxWidth="120px" mx="auto" mb="1rem">
            <img src={qr_code} width="100%" alt="qr-code" />
          </Box>

          <Span fontSize="12px" color="grey.600" textAlign="center" mb="1.5rem">
            Scan this QR Code with Google Authenticator to get OTP
          </Span>
        </Fragment>
      ) : (
        <Box mb="1rem"></Box>
      )}

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
        onClick={handleAccountConfirmation}
      >
        Confirm Account
      </LoadingButton>

      <a
        href="https://play.google.com/store/apps/details?id=com.google.android.apps.authenticator2&hl=en&gl=US"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Span
          display="block"
          color="primary.main"
          mt="2rem"
          textAlign="center"
          letterSpacing="1.1"
          fontSize="12px"
        >
          Google Authenticator (Android)
        </Span>
      </a>

      <a
        href="https://apps.apple.com/app/google-authenticator/id388497605"
        target="_blank"
        rel="noopener noreferrer"
      >
        <Span
          display="block"
          color="primary.main"
          mt="0.5rem"
          textAlign="center"
          letterSpacing="1.1"
          fontSize="12px"
        >
          Google Authenticator (iOS)
        </Span>
      </a>
    </Fragment>
  );
};

export default AccountConfirmationForm;
