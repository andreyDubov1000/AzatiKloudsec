import CustomBox from "@component/atoms/CustomBox";
import FlexBox from "@component/atoms/CustomFlexBox";
import { H2, H3, Paragraph, Span } from "@component/atoms/Typography";
import { Button, Card, Grid } from "@material-ui/core";
import { Done } from "@material-ui/icons";
import { Box } from "@material-ui/system";
import React from "react";
import { Link } from "react-router-dom";
import { Link as Scroll } from "react-scroll";

const Pricing = () => {
  return (
    <CustomBox
      id="pricing"
      sx={{
        position: "relative",
        py: "5rem",
        backgroundColor: "grey.100",
        zIndex: 1,
        height: "100%",
        color: "grey.300",
        "&:after": {
          content: '"KloudSec"',
          fontSize: "20vw",
          color: "inherit",
          background: "inherit",
          fontWeight: 700,
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          zIndex: -1,
          maxHeight: "100%",
        },
        // background: "url(/assets/images/backgrounds/pricing.svg) center/cover",
      }}
    >
      <Box sx={{ maxWidth: 1050, mx: "auto", px: "1rem" }}>
        <Grid container spacing={4}>
          {planList.map((plan, ind) => (
            <Grid item md={4} sm={6} xs={12} key={plan.name}>
              <Card
                elevation={6}
                sx={{
                  textAlign: "center",
                  p: "2.16em",
                  border: "1px solid",
                  borderColor: plan.color,
                  borderRadius: "8px !important",
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

                  {plan.scrollId ? (
                    <Scroll to={plan.scrollId} duration={400} smooth={true}>
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
                    </Scroll>
                  ) : (
                    <Link to={`${plan.url}`}>
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
                    </Link>
                  )}

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
    </CustomBox>
  );
};

const planList = [
  {
    color: "primary.main",
    name: "Developer",
    subtitle: "For individual engineers.",
    price: 15,
    offerings: "For up to 100 resources",
    buttonText: "START FREE TRIAL",
    scrollId: "schedule-a-demo",
    serviceList: [
      "Api Key: 10 calls per day",
      "Scheduled Scans: Once every 24 hours",
      "Dashboards and reports",
      "On-Demand Scans: 10 per day",
    ],
  },
  {
    color: "secondary.main",
    name: "Standard",
    subtitle: "Customized codified cloud security for your team.",
    price: 79,
    offerings: "For up to 200 resources",
    buttonText: "SCHEDULE A DEMO",
    url: "/signup",
    serviceList: [
      "Everything in Developer",
      "Api Key: 50 calls per day",
      "Scheduled Scans: Once every 6 hours",
      "On-Demand Scans: 50 per day",
      "Engineering support",
    ],
  },
  {
    color: "secondary.dark",
    name: "Enterprise",
    subtitle: "Dedicated team for your cloud security.",
    price: 799,
    offerings: "Starting from 201 resources",
    buttonText: "SCHEDULE A DEMO",
    url: "/signup",
    serviceList: [
      "Everything in Standard",
      "Api Key: starting from 51 calls per day",
      "Scheduled Scans: Till Once every 5 minutes",
      "On-Demand Scans: 51 per day and more",
      "Dedicated Engineering support team",
    ],
  },
];

export default Pricing;
