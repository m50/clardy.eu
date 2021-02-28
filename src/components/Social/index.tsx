import * as React from "react";
import Github from "./Github";
import Gitlab from "./Gitlab";
import Instagram from "./Instagram";
import Twitter from './Twitter';
import DevTo from './DevTo';

interface Props { }

const socials = [
  () => <Twitter />,
  () => <Github />,
  () => <Gitlab />,
  () => <Instagram />,
  () => <DevTo />,
];

const Social: React.FunctionComponent<Props> = (_props: Props) => {
  return (
    <ul className="print:hidden flex-grow flex justify-between py-3 h-5 content-center items-center">
      {socials.map((SocialLink, idx: number) => (
        <li className="list-none" key={idx}>
          {SocialLink()}
        </li>
      ))}
    </ul>
  )
}

export default Social;
