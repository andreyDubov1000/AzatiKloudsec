import NotificationManager from "@component/atoms/NotificationManager";
import { H4 } from "@component/atoms/Typography";
import { TextField } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { Formik } from "formik";
import { generate } from "generate-password";
import React, { useState } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { confirmPassword } from "services/authService";
import * as yup from "yup";

const randomPassword = generate({
  length: 14,
  lowercase: true,
  uppercase: true,
  numbers: true,
  symbols: true,
});

const PasswordConfirmationForm = () => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();
  const { search } = useLocation();

  const searchParams = new URLSearchParams(search.substr(1));
  const user_id = searchParams.get("user_id");
  const email = searchParams.get("email");

  const handleFormSubmit = async (values: typeof initialValues) => {
    if (user_id && email) {
      setLoading(true);
      const user = await confirmPassword(
        {
          email,
          new_password: values.new_password,
          temporary_password: values.temporary_password,
        },
        user_id
      );
      setLoading(false);

      if (user) {
        NotificationManager.success(
          "Password was changed successfully. Please complete the next step to confirm your account"
        );
        history.push(
          `/confirm-account?user_id=${user.user_id}&email=${user.email}`,
          { qr_code: user.qr_code_secret_url }
        );
      }
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
      }) => (
        <form onSubmit={handleSubmit}>
          <H4 mb="2rem" color="primary.main" textAlign="center">
            Confirm Your Password
          </H4>

          <TextField
            name="temporary_password"
            label="Temporary Password"
            type="password"
            fullWidth
            sx={{ mb: "1.25rem" }}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.temporary_password || ""}
            error={!!touched.temporary_password && !!errors.temporary_password}
            helperText={touched.temporary_password && errors.temporary_password}
          />
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
            name="confirm_password"
            label="Confirm New Password"
            type="password"
            fullWidth
            sx={{ mb: "1.5rem" }}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.confirm_password || ""}
            error={!!touched.confirm_password && !!errors.confirm_password}
            helperText={touched.confirm_password && errors.confirm_password}
          />

          <LoadingButton
            variant="contained"
            color="primary"
            type="submit"
            loading={loading}
            sx={{
              display: "flex",
              px: "2rem",
              mx: "auto",
              borderRadius: "50px",
            }}
          >
            Confirm New Password
          </LoadingButton>
        </form>
      )}
    </Formik>
  );
};

const initialValues = {
  temporary_password: "",
  new_password: "",
  confirm_password: "",
};

const formSchema = yup.object().shape({
  temporary_password: yup.string().required("required").max(250),
  new_password: yup
    .string()
    .matches(
      /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&`(){}[\]^;:'",.])(.*){14,}/,
      "Must contain one Uppercase, one Lowercase, one Number and one special case character"
    )
    .min(14, "Must contain 14 characters")
    .required("required"),
  confirm_password: yup
    .string()
    .oneOf([yup.ref("new_password"), null], "Passwords must match")
    .required("required")
    .max(250),
});

export default PasswordConfirmationForm;
