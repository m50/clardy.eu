import * as React from 'react';
import { ReactComponent as TwitterIcon } from '../../images/twitter.svg';

const Twitter: React.FC = () => (
  <a rel="me"
    className="hover:text-indigo-800"
    href="https://twitter.com/MarisaCodes"
    title="Twitter"
  >
    <TwitterIcon className="w-5 h-5 fill-current inline-block" />
  </a>
);

export default Twitter;
