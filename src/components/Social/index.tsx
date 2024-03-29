import * as React from 'react';
import Github from './Github';
// import Gitlab from './Gitlab';
// import Instagram from './Instagram';
// import Twitter from './Twitter';
// import DevTo from './DevTo';

// eslint-disable-next-line no-undef
const socials: JSX.Element[] = [
  <Github />,
];

const Social: React.FC = () => (
  <ul className="print:hidden flex-grow flex justify-between py-3 h-5 content-center items-center">
    {socials.map((S, idx: number) => <li className="list-none !my-0" key={idx}>{S}</li>)}
  </ul>
);

export default Social;
