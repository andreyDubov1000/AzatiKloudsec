import { Button } from "@material-ui/core";
import * as React from "react";

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
