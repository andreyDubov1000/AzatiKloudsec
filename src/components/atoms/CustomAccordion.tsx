import { Button, Collapse } from "@material-ui/core";
import { KeyboardArrowDown } from "@material-ui/icons";
import { SxProps } from "@material-ui/system";
import React, { Fragment, useCallback, useEffect, useState } from "react";

export interface CustomAccordionProps {
  title: any;
  exapnded?: boolean;
  buttonSx?: SxProps;
  showIcon?: boolean;
}

const CustomAccordion: React.FC<CustomAccordionProps> = ({
  title,
  exapnded,
  buttonSx,
  showIcon,
  children,
}) => {
  const [open, setOpen] = useState(exapnded);

  const toggleOpen = useCallback(() => setOpen((open) => !open), []);

  useEffect(() => {
    setOpen(exapnded);
  }, [exapnded]);

  return (
    <Fragment>
      <Button
        fullWidth
        onClick={toggleOpen}
        sx={{ justifyContent: "space-between", ...buttonSx }}
      >
        {title}

        {showIcon && (
          <KeyboardArrowDown
            fontSize="small"
            sx={{
              transition: "transform 250ms ease-in-out",
              transform: `rotate(${open ? 0 : -90}deg)`,
            }}
          />
        )}
      </Button>
      <Collapse in={open}>{children}</Collapse>
    </Fragment>
  );
};

CustomAccordion.defaultProps = {
  buttonSx: {},
  showIcon: true,
};

export default CustomAccordion;
