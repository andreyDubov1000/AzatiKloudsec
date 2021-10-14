import CustomFlexBox from "@component/atoms/CustomFlexBox";
import NotificationManager from "@component/atoms/NotificationManager";
import { H4, Span } from "@component/atoms/Typography";
import { TextField, Tooltip } from "@material-ui/core";
import { Help } from "@material-ui/icons";
import { LoadingButton } from "@material-ui/lab";
import { Formik } from "formik";
import React from "react";
import { Link, useHistory } from "react-router-dom";
import { createNewUser } from "services/authService";
import * as yup from "yup";

export interface SignupFormProps {}

const SignupForm: React.FC<SignupFormProps> = () => {
  const history = useHistory();

  const handleFormSubmit = async (values: any) => {
    const user = await createNewUser(values);

    if (user) {
      NotificationManager.success(
        "Thanks for your signup, you will receive an email shortly to confirm your registration"
      );
      console.log(user);
      history.push("/");
      // history.push(
      //   `/confirm-password?user_id=${user.user_id}&email=${user.email}`
      // );
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
          <H4 mb="2rem" color="primary.main" textAlign="center">
            Create Account
          </H4>

          <TextField
            name="full_name"
            label="Full Name"
            fullWidth
            sx={{ mb: "1.25rem" }}
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
            sx={{ mb: "1.25rem" }}
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
            sx={{ mb: "1.5rem" }}
            onBlur={handleBlur}
            onChange={handleChange}
            value={values.mobile_phone_number || ""}
            InputProps={{
              sx: { pr: 1 },
              endAdornment: (
                <Tooltip title="+(country code)(phone number)">
                  <Help
                    fontSize="small"
                    sx={{ color: "grey.700", cursor: "pointer" }}
                  />
                </Tooltip>
              ),
            }}
            error={
              !!touched.mobile_phone_number && !!errors.mobile_phone_number
            }
            helperText={
              touched.mobile_phone_number && errors.mobile_phone_number
            }
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
            Create Account
          </LoadingButton>

          <CustomFlexBox
            sx={{ mt: "2rem", justifyContent: "center", fontSize: "12px" }}
          >
            <Span color="grey.600" mr="0.25rem" fontSize="inherit">
              Already have an account?
            </Span>
            <Link to="/login">
              <Span color="primary.main" letterSpacing="1.1" fontSize="inherit">
                Login
              </Span>
            </Link>
          </CustomFlexBox>
        </form>
      )}
    </Formik>
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

export default SignupForm;
