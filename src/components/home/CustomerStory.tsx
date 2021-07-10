import CustomBox from "@component/atoms/CustomBox";
import CustomFlexBox from "@component/atoms/CustomFlexBox";
import CustomImage from "@component/atoms/CustomImage";
import { H5, Paragraph, Span } from "@component/atoms/Typography";
import { Avatar, Fab } from "@material-ui/core";
import { FormatQuote } from "@material-ui/icons";
import React from "react";
import CustomerStoryWrapper from "./CustomerStory.style";

export interface CustomerStoryProps {}

const CustomerStory: React.FC<CustomerStoryProps> = () => {
  return (
    <CustomerStoryWrapper>
      <div className="avatar-holder">
        <Avatar
          className="avatar"
          src="/assets/images/faces/Hafedh_Mounir.png"
        />
        <Fab
          color="secondary"
          sx={{
            position: "absolute",
            bottom: -10,
            right: -20,
          }}
        >
          <FormatQuote fontSize="large" sx={{ transform: "rotate(-180deg)" }} />
        </Fab>
      </div>
      <Paragraph fontSize="16px" mb="3rem" textAlign="center">
        At Cloudinit the security of AWS infrastructure is something important.
        The consulting compaany has tens of sensitive workloads served from AWS
        cloud and used by millions of customers, so the security is taken very
        seriousely and KloudSec helped us to achieve a very high standard level
        of security.
      </Paragraph>

      <CustomFlexBox sx={{ width: "100%", alignItems: "center" }}>
        <CustomBox sx={{ flex: "1 1 0" }}>
          <div>
            <H5 letterSpacing={1.1} mb="0.5rem">
              Hafedh Mounir
            </H5>
            <Span fontSize="16px" whiteSpace="pre-wrap" letterSpacing={2}>
              CEO / Security Manager
            </Span>
          </div>
        </CustomBox>
        <div className="vertical-bar" />
        <CustomBox sx={{ flex: "1 1 0" }}>
          <CustomImage
            src="/assets/images/company/Cloudinit_Logo.png"
            alt="brex"
            sx={{
              maxHeight: 80,
              maxWidth: "100%",
              mx: "auto",
              display: "block",
            }}
          />
        </CustomBox>
      </CustomFlexBox>
    </CustomerStoryWrapper>
  );
};

export default CustomerStory;
