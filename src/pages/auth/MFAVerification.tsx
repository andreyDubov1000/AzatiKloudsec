import NotificationManager from "@component/atoms/NotificationManager";
import { H4 } from "@component/atoms/Typography";
import { TextField } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { SAVE_TOKEN } from "@redux/auth/authTypes";
import { useAppDispatch } from "@redux/hooks";
// import { Link } from "react-router-dom";
import { Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { verifyMFA } from "services/authService";
import * as yup from "yup";

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
  const history = useHistory();
  const dispatch = useAppDispatch();

  const handleFormSubmit = async (values: typeof initialValues) => {
    const data = await verifyMFA({
      ...values,
      email,
      verification_session,
      verification_type,
    });

    if (data) {
      data.email = email;
      dispatch({ type: SAVE_TOKEN, data });
      history.push("/dashboard/risk-management");
      NotificationManager.success("Login Successful");
    }
  };

  return (
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
          <H4 mb="2.5rem" color="primary.main" textAlign="center">
            Verify it's you
          </H4>

          <TextField
            name="otp_code"
            label="OTP"
            fullWidth
            sx={{ mb: "1.5rem" }}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.otp_code || ""}
            error={!!touched.otp_code && !!errors.otp_code}
            helperText={touched.otp_code && errors.otp_code}
          />

          <LoadingButton
            variant="contained"
            color="primary"
            loading={isSubmitting}
            type="submit"
            sx={{
              display: "flex",
              px: "2rem",
              mx: "auto",
              borderRadius: "50px",
            }}
          >
            Confirm Login
          </LoadingButton>
        </form>
      )}
    </Formik>
  );
};

const initialValues = {
  otp_code: "",
};

const formSchema = yup.object().shape({
  otp_code: yup
    .string()
    .min(6)
    .max(6)
    .required("required")
    .matches(/\d{6}/, "OTP must me digit"),
});

export default MFAVerification;
