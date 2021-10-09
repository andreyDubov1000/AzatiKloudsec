import NotificationManager from "@component/atoms/NotificationManager";
import { H4, Span } from "@component/atoms/Typography";
import { TextField } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { Formik } from "formik";
import MFAVerification, {
  MFAVerificationProps,
} from "pages/auth/MFAVerification";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "services/authService";
import * as yup from "yup";

export interface LoginFormProps {}

const LoginForm: React.FC<LoginFormProps> = () => {
  const [user, setUser] = useState<MFAVerificationProps>();

  const handleFormSubmit = async (values: any, { resetForm }: any) => {
    const loggedUser = await login(values);

    if (loggedUser) {
      setUser(loggedUser);

      NotificationManager.success(
        "You are one step away from login. Please provide your OTP code."
      );
    } else resetForm();
  };

  return user ? (
    <MFAVerification
      email={user.email}
      verification_session={user.verification_session}
      verification_type={user.verification_type}
    />
  ) : (
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
        setFieldValue,
        isSubmitting,
      }) => (
        <form onSubmit={handleSubmit}>
          <H4 mb="2rem" color="primary.main" textAlign="center">
            Login Your Account
          </H4>

          <TextField
            name="email"
            label="Email"
            type="email"
            fullWidth
            sx={{ mb: "1.25rem" }}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.email || ""}
            error={!!touched.email && !!errors.email}
            helperText={touched.email && errors.email}
          />
          <TextField
            name="password"
            label="Password"
            type="password"
            fullWidth
            sx={{ mb: "1.5rem" }}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.password || ""}
            error={!!touched.password && !!errors.password}
            helperText={touched.password && errors.password}
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
            Login
          </LoadingButton>

          <Link to="/signup">
            <Span
              display="block"
              color="primary.main"
              mt="2rem"
              textAlign="center"
              letterSpacing="1.1"
              fontSize="12px"
            >
              Create Account
            </Span>
          </Link>
          <Link to="/resend-otp">
            <Span
              display="block"
              color="primary.main"
              mt="0.5rem"
              textAlign="center"
              letterSpacing="1.1"
              fontSize="12px"
            >
              Forgot Password
            </Span>
          </Link>
        </form>
      )}
    </Formik>
  );
};

const initialValues = {
  email: "",
  password: "",
};

const formSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required"),
});

export default LoginForm;
