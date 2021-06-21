import NotificationManager from "@component/atoms/NotificationManager";
import { H4, Span } from "@component/atoms/Typography";
import AuthLayout from "@component/layouts/AuthLayout";
import { TextField } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { Formik } from "formik";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { forgotPassword } from "services/authService";
import * as yup from "yup";

const ForgotPassword = () => {
  const history = useHistory();

  const handleFormSubmit = async (values: any) => {
    const data = await forgotPassword(values);
    if (data) {
      NotificationManager.success(
        "You will receive an email shortly. Please follow the link to reset your password."
      );
      history.push("/login");
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
              Forgot Password
            </H4>

            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              sx={{ mb: "1.5rem" }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email || ""}
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
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
              Send OTP
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
  email: "",
};

const formSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
});

export default ForgotPassword;
