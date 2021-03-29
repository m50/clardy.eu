import * as React from 'react';
import { ReactComponent as InstragramIcon } from '../svg/instagram.svg';

const Instagram: React.FC<{}> = () => (
  <a rel="me"
    className="hover:text-indigo-800"
    href="https://www.instagram.com/marisaclardy1"
    title="instagram"
  >
    <InstragramIcon className="w-5 h-5 fill-current inline-block" />
  </a>
);

export default Instagram;
