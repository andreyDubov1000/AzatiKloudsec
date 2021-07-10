import { styled } from "@material-ui/core/styles";

const CustomerStoryWrapper = styled("div")(({ theme: { palette } }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  maxWidth: 600,
  marginLeft: "auto",
  marginRight: "auto",

  "& .avatar-holder": {
    position: "relative",
    marginBottom: "3rem",
  },
  "& .avatar": {
    height: 130,
    width: 130,
    transform: "rotate(-15deg)",
    border: `4px solid ${palette.primary.light}`,
  },
  "& .vertical-bar": {
    height: 64,
    width: 3,
    background: palette.primary.main,
    borderRadius: 300,
    marginLeft: "auto",
    marginRight: "auto",
  },
}));

export default CustomerStoryWrapper;
