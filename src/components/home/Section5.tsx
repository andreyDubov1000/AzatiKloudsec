import FlexBox from "@component/atoms/FlexBox";
import { H2, H3, Paragraph, Span } from "@component/atoms/Typography";
import { Button, Card, Grid } from "@material-ui/core";
import { Done } from "@material-ui/icons";
import { Box } from "@material-ui/system";
import React from "react";

const Section5 = () => {
  return (
    <Box py="5rem" bgcolor="primary.main" id="pricing">
      <Box sx={{ maxWidth: 1050, mx: "auto", px: "1rem" }}>
        <Grid container spacing={4}>
          {planList.map((plan, ind) => (
            <Grid item md={4} sm={6} xs={12} key={plan.name}>
              <Card
                elevation={6}
                sx={{
                  textAlign: "center",
                  p: "2.16em",
                  border: "2px solid",
                  borderColor: plan.color,
                  // height: "100%",
                }}
              >
                <Box>
                  <H2 color={plan.color} mb="1rem">
                    {plan.name}
                  </H2>

                  <Paragraph
                    color="grey.700"
                    maxWidth="240px"
                    mx="auto"
                    mb="1rem"
                  >
                    {plan.subtitle}
                  </Paragraph>

                  <H3 color="primary.light" mb="0.25rem">
                    ${plan.price}/month
                  </H3>
                  <Paragraph color="grey.700" mb="2.5rem">
                    {plan.offerings}
                  </Paragraph>

                  <Button
                    variant="contained"
                    color="primary"
                    fullWidth
                    sx={{
                      borderRadius: 300,
                      height: 44,
                      mb: "2rem",
                      bgcolor: plan.color,
                    }}
                  >
                    {plan.buttonText}
                  </Button>

                  <div>
                    {plan.serviceList.map((item, ind) => (
                      <FlexBox sx={{ my: "0.5rem" }} key={ind}>
                        <Done
                          fontSize="small"
                          sx={{ color: "success.main", mr: "0.5rem" }}
                        />
                        <Span textAlign="left">{item}</Span>
                      </FlexBox>
                    ))}
                  </div>
                </Box>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Box>
    </Box>
  );
};

const planList = [
  {
    color: "primary.main",
    name: "Community",
    subtitle: "IaC scanning for small infrastructure projects.",
    price: 0,
    offerings: "For up to 50 resources",
    buttonText: "START FOR FREE",
    serviceList: [
      "IaC scanning powered by Checkov",
      "Access to core Bridgecrew platform",
      "Pull request fixes for IaC",
    ],
  },
  {
    color: "secondary.main",
    name: "Standard",
    subtitle: "Commit to cloud security coverage for teams.",
    price: 99,
    offerings: "For 150 resources",
    buttonText: "START FREE TRIAL",
    serviceList: [
      "IaC, cloud, and workload scanning",
      "Resource and policy management",
      "Dashboards and reports",
      "Custom policies",
    ],
  },
  {
    color: "secondary.dark",
    name: "Premium",
    subtitle: "Customized codified cloud security for your team.",
    price: 999,
    offerings: "Starts at 300 resources",
    buttonText: "SCHEDULE A DEMO",
    serviceList: [
      "Everything in Standard",
      "Roles and teams",
      "On-prem/self-hosted VCS",
      "Priority support and engineering support",
    ],
  },
];

export default Section5;
