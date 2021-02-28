import * as React from "react";
import Github from "./Github";
import Gitlab from "./Gitlab";
import Instagram from "./Instagram";
import Twitter from './Twitter';
import DevTo from './DevTo';

const socials: JSX.Element[] = [
  <Twitter />,
  <Github />,
  <Gitlab />,
  <Instagram />,
  <DevTo />,
];

const Social: React.FC = () => {
  return (
    <ul className="print:hidden flex-grow flex justify-between py-3 h-5 content-center items-center">
      {socials.map((S, idx: number) => <li className="list-none" key={idx}>{S}</li>)}
    </ul>
  )
}

export default Social;
