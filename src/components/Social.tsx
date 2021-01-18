import * as React from "react";
import { ReactComponent as DevTo } from '../images/dev.to.svg';
import { ReactComponent as Github } from '../images/github.svg';
import { ReactComponent as Gitlab } from '../images/gitlab.svg';
import { ReactComponent as Twitter } from '../images/twitter.svg';
import { ReactComponent as Instragram } from '../images/instagram.svg';

interface Props { }

const Social: React.FunctionComponent<Props> = (_props: Props) => {
  return (
    <ul className="print:hidden flex-grow flex justify-between py-3 h-5 content-center items-center">
      <li className="list-none">
        <a rel="me"
          className="hover:text-indigo-800"
          href="https://twitter.com/MarisaCodes"
          title="Twitter">
          <Twitter className="w-5 h-5 fill-current inline-block" />
        </a>
      </li>

      <li className="list-none">
        <a rel="me"
          className="hover:text-indigo-800"
          href="https://github.com/m50"
          title="github">
          <Github className="w-5 h-5 fill-current inline-block" />
        </a>
      </li>

      <li className="list-none">
        <a rel="me"
          className="hover:text-indigo-800"
          href="https://gitlab.com/MarisaCodes"
          title="Gitlab">
          <Gitlab className="w-5 h-5 fill-current inline-block" />
        </a>
      </li>

      <li className="list-none">
        <a rel="me"
          className="hover:text-indigo-800"
          href="https://www.instagram.com/marisaclardy1"
          title="instagram">
          <Instragram className="w-5 h-5 fill-current inline-block" />
        </a>
      </li>

      <li className="list-none">
        <a href="https://dev.to/m50"
          className="hover:text-indigo-800"
          title="Dev">
          <DevTo className="w-5 h-5 fill-current inline-block" />
        </a>
      </li>
    </ul>
  )
}

export default Social;
