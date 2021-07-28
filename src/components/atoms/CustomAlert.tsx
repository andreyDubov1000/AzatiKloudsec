import { Alert } from "@material-ui/core";
import { styled } from "@material-ui/core/styles";

const CustomAlert = styled(Alert)(({ severity, theme }) => ({
  borderLeft: "3px solid",
  borderColor: !!severity ? theme.palette[severity].main : "transparent",
  "& ul": {
    margin: 0,
    paddingLeft: "1.5rem",
  },
}));

export default CustomAlert;
