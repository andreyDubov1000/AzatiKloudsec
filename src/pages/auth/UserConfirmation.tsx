import { Box, Button, Card, TextField } from "@material-ui/core";
import { Formik } from "formik";
import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import { confirmUser } from "services/authService";
import * as yup from "yup";

// http://localhost:3000/confirm?user_id=c303103d-d814-460a-9a76-d169d389bb1c&email=lusanleng824@gmail.com

const qr =
  "https://auth-api-users-mfa-dev-ks.s3.amazonaws.com/users_mfa/c303103d-d814-460a-9a76-d169d389bb1c.png?AWSAccessKeyId=ASIAR4KOXG7NMTI3QBPX&Signature=ReyN0Oh8eYNflEq7MFEY421%2B%2BaI%3D&x-amz-security-token=IQoJb3JpZ2luX2VjEDsaCWV1LXdlc3QtMSJGMEQCIGqn6UWlxyKnbu%2BGaEOy8wclDTheydEd3I%2BQ%2BWglTq%2F4AiBEM6hRgj%2Bq8cA8InsQnlYGlRysZVUY4CMGJdKqBCkm6SqdAgjz%2F%2F%2F%2F%2F%2F%2F%2F%2F%2F8BEAMaDDEyOTU1MDk4OTI3NCIMf5ucPIM99D0xsr53KvEBNVywBN3pXmg6zsXbxuN4o1v8vGjfHChCkKkSJ8MRLNdMA0mQY6pmVWBQ0snsMuM2%2BJNvJWlO9tj0PUUy91cOF92%2BzrFkD4CiKAI7LTINvF5d%2BmNs0QJLI1hgQlxaxGAtCMUPQsGSlM5iLuvn698fZGp1a0R5CslgIU96BWrtKcGs5wtgvMssVGN5Gw1FnFGBqJjdQFQ6JQ4smF6K%2F7xRX97qdRCxFfrdkNJTA4s0GUR6gGU7MVQkAznhA20ghAReFTbXDOWzA5Ixu%2BKBxYLISaTzhHD9zHKQXwKpaS6EuvAVEMy3H86SpK6UP9CScql24DCmmJmGBjqbAT22IpYQ3EnXN9arlJewNsKRbFlPU3LfcOmMLx4Lfs6LvR8VwUVapZLKlBCWqBK8OTogvV1TAuL1APtPHeD51PdoEygZ0KDWBRuw85ITw5%2FAdeFWsqxwM36PNK%2FACElA63doIZYu2cjhDsm2yhMFSVND8F72KEUB3yIevN3uIYaOS4NABlnxRrQHC173qe7OD8wJgWMcE8oNoJ0F&Expires=1623609067";

const UserConfirmation = () => {
  const [qrCodeUrl, setQrCodeUrl] = useState<string | null>(qr);

  const { search } = useLocation();

  const searchParams = new URLSearchParams(search.substr(1));
  const user_id = searchParams.get("user_id");

  const handleFormSubmit = async (values: any) => {
    if (user_id) {
      try {
        const { data: user } = await confirmUser(values, user_id);
        console.log(user);

        setQrCodeUrl(user.qr_code_secret_url);
      } catch (error) {
        console.log(error.response?.data?.error_message);
      }
    }
    // history.push("/payment");
  };

  return (
    <Card sx={{ p: "2rem", maxWidth: 550, mx: "auto", mt: "2rem" }}>
      <Box maxWidth="100px" mx="auto">
        {qrCodeUrl && <img src={qrCodeUrl} alt={qrCodeUrl} />}
      </Box>
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
              label="Temporary Password"
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
              label="New Password"
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
  email: "lusanleng824@gmail.com",
  temporary_password: "7VB8uWJTP_P%Rh",
  new_password: "7VB8uW548JTP_P%Rh",
};

const formSchema = yup.object().shape({
  email: yup.string().email("invalid email").required("required"),
  temporary_password: yup.string().required("required").max(250),
  new_password: yup.string().required("required").max(250),
});

export default UserConfirmation;
