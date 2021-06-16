import { Button, Card, TextField } from "@material-ui/core";
import { Formik } from "formik";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { createNewUser } from "services/authService";
import * as yup from "yup";

export interface SignupProps {}

const Signup: React.FC<SignupProps> = () => {
  const history = useHistory();

  const handleFormSubmit = async (values: any) => {
    const user = await createNewUser(values);
    console.log(user);

    history.push(`/confirm?user_id=${user.user_id}&email=${user.email}`);
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
              name="full_name"
              label="Full Name"
              fullWidth
              sx={{ mb: "1rem" }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.full_name || ""}
              error={!!touched.full_name && !!errors.full_name}
              helperText={touched.full_name && errors.full_name}
            />
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
              name="mobile_phone_number"
              label="Mobile Number"
              placeholder="+33XXXXXXXXX"
              fullWidth
              sx={{ mb: "1rem" }}
              onBlur={handleBlur}
              onChange={handleChange}
              value={values.mobile_phone_number || ""}
              error={
                !!touched.mobile_phone_number && !!errors.mobile_phone_number
              }
              helperText={
                touched.mobile_phone_number && errors.mobile_phone_number
              }
            />

            <Button variant="contained" color="primary" type="submit">
              Create Account
            </Button>

            <Link to="/login">
              <Button variant="outlined" color="secondary" type="submit">
                Login
              </Button>
            </Link>
          </form>
        )}
      </Formik>
    </Card>
  );
};

const initialValues = {
  full_name: "",
  email: "",
  mobile_phone_number: "",
};

const formSchema = yup.object().shape({
  full_name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  mobile_phone_number: yup.string().required("required"),
});

export default Signup;
