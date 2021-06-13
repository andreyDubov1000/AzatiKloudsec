import { Button, Card, TextField } from "@material-ui/core";
import { Formik } from "formik";
import React from "react";
import { useHistory } from "react-router-dom";
import { createNewUser } from "services/authService";
import * as yup from "yup";

export interface PasswordResetProps {}

const PasswordReset: React.FC<PasswordResetProps> = () => {
  const history = useHistory();

  const handleFormSubmit = async (values: any) => {
    console.log(values);
    createNewUser(values);
    // history.push("/payment");
  };

  return (
    <Card sx={{ p: "2rem", maxWidth: 550, mx: "auto", mt: "2rem" }}>
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
        }) => (
          <form onSubmit={handleSubmit}>
            <TextField
              name="email"
              label="Email"
              type="email"
              fullWidth
              sx={{ mb: "1rem" }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.email || ""}
              error={!!touched.email && !!errors.email}
              helperText={touched.email && errors.email}
            />
            <TextField
              name="temporary_password"
              label="Full Name"
              type="password"
              fullWidth
              sx={{ mb: "1rem" }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.temporary_password || ""}
              error={
                !!touched.temporary_password && !!errors.temporary_password
              }
              helperText={
                touched.temporary_password && errors.temporary_password
              }
            />
            <TextField
              name="new_password"
              label="Full Name"
              type="password"
              fullWidth
              sx={{ mb: "1rem" }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.new_password || ""}
              error={!!touched.new_password && !!errors.new_password}
              helperText={touched.new_password && errors.new_password}
            />
            <Button variant="contained" color="primary" type="submit">
              Confirm Account
            </Button>
          </form>
        )}
      </Formik>
    </Card>
  );
};

const initialValues = {
  email: "",
  temporary_password: "",
  new_password: "",
};

const formSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  temporary_password: yup.string().required("required").max(250),
  new_password: yup.string().required("required").max(250),
});

export default PasswordReset;
