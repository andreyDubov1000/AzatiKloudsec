import { Button, Card, TextField } from "@material-ui/core";
import { Formik } from "formik";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { login } from "services/authService";
import * as yup from "yup";
import MFAVerification from "./MFAVerification";

const Login = () => {
  const [user, setUser] = useState<any>(null);

  const handleFormSubmit = async (values: any) => {
    console.log(values);
    const { data: loggedUser } = await login(values);
    console.log(loggedUser);
    setUser(loggedUser);
    // history.push("/payment");
  };

  return user ? (
    <MFAVerification
      email={user.email}
      verification_session={user.verification_session}
      verification_type={user.verification_type}
    />
  ) : (
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
              name="password"
              label="Full Name"
              type="password"
              fullWidth
              sx={{ mb: "1rem" }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.password || ""}
              error={!!touched.password && !!errors.password}
              helperText={touched.password && errors.password}
            />

            <Button variant="contained" color="primary" type="submit">
              Login
            </Button>

            <Link to="/signup">
              <Button variant="outlined" color="secondary" type="submit">
                Create Account
              </Button>
            </Link>
          </form>
        )}
      </Formik>
    </Card>
  );
};

const initialValues = {
  email: "lusanleng824@gmail.com",
  password: "7VB8uW548JTP_P%Rh",
};

const formSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  password: yup.string().required("required").max(250),
});

export default Login;
