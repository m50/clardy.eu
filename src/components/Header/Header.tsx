import * as React from "react";
import HeaderLink from './HeaderLink';
import { ReactComponent as Logo } from '../../images/icon.svg';
import { Data } from './types';
import { Link } from "gatsby";

interface Props { data: Data }
export const Header: React.FC<Props> = ({data}) => (
  <>
    <header className="h-16 print:hidden flex items-center content-center justify-between bg-indigo-500 py-3 text-white fixed right-0 left-0 top-0 md:relative">
      <div></div>
      <Link key="large" className="hidden sm:inline-block uppercase text-xl tracking-wider" rel="author" to="/">
        <Logo className="w-12 h-12 inline" />&nbsp;Marisa Clardy
      </Link>
      <nav>
        {data.allSitePage.nodes.map(node => <HeaderLink key={node.path} node={node} />)}
      </nav>
      <div></div>
    </header>
    <div className="md:hidden">&nbsp;</div>
  </>
);

export default Header;
