import NotificationManager from "@component/atoms/NotificationManager";
import { H4, Span } from "@component/atoms/Typography";
import AuthLayout from "@component/layouts/AuthLayout";
import { TextField } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { Formik } from "formik";
import React from "react";
import { Link, useHistory, useLocation } from "react-router-dom";
import { resetPassword } from "services/authService";
import * as yup from "yup";

const ResetPassword = () => {
  const history = useHistory();
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search.substr(1));
  const user_id = searchParams.get("user_id");
  const email = searchParams.get("email");

  const handleFormSubmit = async (values: any) => {
    if (user_id && email) {
      const data = await resetPassword({ ...values, email }, user_id);

      if (data) {
        NotificationManager.success(
          "You will receive an email shortly. Please follow the link to reset your password."
        );
        history.push("/login");
      }
    }
  };

  return (
    <AuthLayout
      greetingText="Welcome to KloudSec"
      imgUrl="/assets/images/illustrations/password.svg"
    >
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
            <H4 mb="2rem" color="primary.main" textAlign="center">
              Reset Password
            </H4>

            <TextField
              name="new_password"
              label="New Password"
              type="password"
              fullWidth
              sx={{ mb: "1.25rem" }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.new_password || ""}
              error={!!touched.new_password && !!errors.new_password}
              helperText={touched.new_password && errors.new_password}
            />

            <TextField
              name="verification_code"
              label="Verification Code"
              fullWidth
              sx={{ mb: "1.25rem" }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.verification_code || ""}
              error={!!touched.verification_code && !!errors.verification_code}
              helperText={touched.verification_code && errors.verification_code}
            />

            <LoadingButton
              variant="contained"
              color="primary"
              type="submit"
              loading={isSubmitting}
              sx={{
                display: "flex",
                px: "2rem",
                mx: "auto",
                borderRadius: "50px",
              }}
            >
              Change Password
            </LoadingButton>

            <Link to="/login">
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
            </Link>
          </form>
        )}
      </Formik>
    </AuthLayout>
  );
};

const initialValues = {
  verification_code: "",
  new_password: "",
};

const formSchema = yup.object().shape({
  verification_code: yup.string().required("required"),
  new_password: yup.string().required("required"),
});

export default ResetPassword;
