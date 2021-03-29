import * as React from 'react';
import { ReactComponent as GitlabIcon } from '../../images/gitlab.svg';

const Gitlab: React.FC<{}> = () => (
  <a rel="me"
    className="hover:text-indigo-800"
    href="https://gitlab.com/MarisaCodes"
    title="Gitlab"
  >
    <GitlabIcon className="w-5 h-5 fill-current inline-block" />
  </a>
);

export default Gitlab;
