import NotificationManager from "@component/atoms/NotificationManager";
import { Span } from "@component/atoms/Typography";
import { Box, TextField } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { Formik } from "formik";
import React, { Fragment } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { confirmAccount } from "services/authService";
import * as yup from "yup";

const AccountConfirmationForm = () => {
  const { state } = useLocation<any>();
  const { search } = useLocation();
  const history = useHistory();

  const qr_code = state?.qr_code;

  const searchParams = new URLSearchParams(search.substr(1));
  const user_id = searchParams.get("user_id");
  const email = searchParams.get("email");

  const handleFormSubmit = async (values: typeof initialValues) => {
    if (!user_id) return;

    const data = await confirmAccount(
      {
        email,
        ...values,
      },
      user_id
    );

    if (data) {
      NotificationManager.success("Account was confirmed successfully");
      history.push("/login");
    }
  };

  return (
    <Fragment>
      <Formik
        initialValues={initialValues}
        validationSchema={formSchema}
        onSubmit={handleFormSubmit}
      >
        {({
          values,
          errors,
          touched,
          handleChange,
          handleBlur,
          handleSubmit,
          isSubmitting,
        }) => (
          <form onSubmit={handleSubmit}>
            {qr_code ? (
              <Fragment>
                <Box maxWidth="120px" mx="auto" mb="1rem">
                  <img src={qr_code} width="100%" alt="qr-code" />
                </Box>

                <Span
                  fontSize="12px"
                  color="grey.600"
                  textAlign="center"
                  mb="1.5rem"
                >
                  Scan this QR Code with Google Authenticator to get OTP
                </Span>
              </Fragment>
            ) : (
              <Box mb="1rem"></Box>
            )}

            <TextField
              name="otp"
              label="OTP"
              fullWidth
              sx={{ mb: "1.5rem" }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.otp || ""}
              error={!!touched.otp && !!errors.otp}
              helperText={touched.otp && errors.otp}
            />

            <LoadingButton
              variant="contained"
              color="primary"
              type="submit"
              sx={{
                display: "flex",
                px: "2rem",
                mx: "auto",
                borderRadius: "50px",
              }}
              loading={isSubmitting}
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
          </form>
        )}
      </Formik>
    </Fragment>
  );
};

const initialValues = {
  otp: "",
};

const formSchema = yup.object().shape({
  otp: yup
    .string()
    .min(6)
    .max(6)
    .required("required")
    .matches(/\d{6}/, "OTP must me digit"),
});

export default AccountConfirmationForm;
