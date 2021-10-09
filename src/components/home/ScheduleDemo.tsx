import CustomBox from "@component/atoms/CustomBox";
import NotificationManager from "@component/atoms/NotificationManager";
import { H4, Paragraph } from "@component/atoms/Typography";
import { Card, Grid, TextField } from "@material-ui/core";
import { LoadingButton } from "@material-ui/lab";
import { Formik } from "formik";
import React from "react";
import { scheduleDemo } from "services/homeService";
import * as yup from "yup";

export interface ScheduleDemoProps {}

const ScheduleDemo: React.FC<ScheduleDemoProps> = () => {
  const handleFormSubmit = async (values: any, { resetForm }: any) => {
    const data = await scheduleDemo(values);

    if (data) {
      resetForm();
      NotificationManager.success(
        "Thanks for your interest in using KloudSec. We will contact you shortly."
      );
    }
  };

  return (
    <CustomBox id="schedule-a-demo" sx={{ py: "5rem" }}>
      <CustomBox
        sx={{ maxWidth: 600, mx: "auto", px: "1rem", textAlign: "center" }}
      >
        <H4 mb="1rem" color="primary.main" textAlign="center">
          Want to learn more about our all-in-one KloudSec solution?
        </H4>
        <Paragraph mb="2rem">
          Fill out the form below to schedule a personalized demo with one of
          our cloud security experts
        </Paragraph>

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
            <Card
              sx={{ px: "1.5rem", py: "2rem", backgroundColor: "grey.100" }}
              elevation={1}
            >
              <form onSubmit={handleSubmit}>
                <Grid container spacing={3}>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="first_name"
                      label="First Name"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.first_name || ""}
                      error={!!touched.first_name && !!errors.first_name}
                      helperText={touched.first_name && errors.first_name}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="last_name"
                      label="Last Name"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.last_name || ""}
                      error={!!touched.last_name && !!errors.last_name}
                      helperText={touched.last_name && errors.last_name}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="email"
                      label="Email"
                      type="email"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.email || ""}
                      error={!!touched.email && !!errors.email}
                      helperText={touched.email && errors.email}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="mobile_number"
                      label="Mobile Number"
                      placeholder="+33XXXXXXXXX"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.mobile_number || ""}
                      error={!!touched.mobile_number && !!errors.mobile_number}
                      helperText={touched.mobile_number && errors.mobile_number}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="company_name"
                      label="Company Name"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.company_name || ""}
                      error={!!touched.company_name && !!errors.company_name}
                      helperText={touched.company_name && errors.company_name}
                    />
                  </Grid>
                  <Grid item sm={6} xs={12}>
                    <TextField
                      name="job_title"
                      label="Job Title"
                      fullWidth
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.job_title || ""}
                      error={!!touched.job_title && !!errors.job_title}
                      helperText={touched.job_title && errors.job_title}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      name="contact_message"
                      label="Tell us a bit about your infrastructure and how we can help"
                      fullWidth
                      multiline
                      minRows={6}
                      onBlur={handleBlur}
                      onChange={handleChange}
                      value={values.contact_message || ""}
                      error={
                        !!touched.contact_message && !!errors.contact_message
                      }
                      helperText={
                        touched.contact_message && errors.contact_message
                      }
                    />
                  </Grid>
                </Grid>

                <LoadingButton
                  variant="contained"
                  color="primary"
                  type="submit"
                  loading={isSubmitting}
                  sx={{
                    display: "flex",
                    px: "2rem",
                    mx: "auto",
                    mt: "1.5rem",
                    borderRadius: "50px",
                  }}
                >
                  Submit
                </LoadingButton>
              </form>
            </Card>
          )}
        </Formik>
      </CustomBox>
    </CustomBox>
  );
};

const initialValues = {
  first_name: "",
  last_name: "",
  company_name: "",
  job_title: "",
  contact_message: "",
  email: "",
  mobile_number: "",
};

const formSchema = yup.object().shape({
  first_name: yup.string().required("required"),
  last_name: yup.string().required("required"),
  company_name: yup.string().required("required"),
  email: yup.string().email("invalid email").required("required"),
  mobile_number: yup.string().required("required"),
  contact_message: yup.string().required("required"),
  job_title: yup.string().required("required"),
});

export default ScheduleDemo;
