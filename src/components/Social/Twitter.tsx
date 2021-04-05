import * as React from 'react';
import { ReactComponent as TwitterIcon } from '../svg/twitter.svg';

const Twitter: React.FC = () => (
  <a rel="me"
    className="hover:text-yellow-600"
    href="https://twitter.com/MarisaCodes"
    title="Twitter"
  >
    <TwitterIcon className="w-5 h-5 fill-current inline-block" />
  </a>
);

export default Twitter;
