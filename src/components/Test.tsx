import { Button } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import * as React from "react";

const useStyles = makeStyles(({ palette }) => ({}));
export interface TestProps {}

const Test: React.FC<TestProps> = () => {
  return (
    <div>
      {[...new Array(10000)].map((item, ind) => (
        <Button>testing</Button>
      ))}
    </div>
  );
};

export default Test;
