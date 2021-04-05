import * as React from 'react';
import { ReactComponent as GitlabIcon } from '../svg/gitlab.svg';

const Gitlab: React.FC<{}> = () => (
  <a rel="me"
    className="hover:text-yellow-600"
    href="https://gitlab.com/MarisaCodes"
    title="Gitlab"
  >
    <GitlabIcon className="-ml-1 w-5 h-5 fill-current inline-block" />
  </a>
);

export default Gitlab;
