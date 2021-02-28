import * as React from "react";
import { ReactComponent as DevToIcon } from '../../images/dev.to.svg';

const DevTo: React.FC<{}> = () => {
  return (
    <a href="https://dev.to/m50"
      className="hover:text-indigo-800"
      title="Dev"
    >
      <DevToIcon className="w-5 h-5 fill-current inline-block" />
    </a>
  );
};

export default DevTo;
