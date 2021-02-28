import * as React from "react";
import { ReactComponent as GithubIcon } from '../../images/github.svg';

const Github: React.FC<{}> = () => {
  return (
    <a rel="me"
      className="hover:text-indigo-800"
      href="https://github.com/m50"
      title="github"
    >
      <GithubIcon className="w-5 h-5 fill-current inline-block" />
    </a>
  );
};

export default Github;
