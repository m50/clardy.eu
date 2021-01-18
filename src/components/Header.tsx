import * as React from "react";
import { useEffect, useState } from "react";
import { ReactComponent as Logo } from '../images/icon.svg';

interface Props { }

const Header: React.FunctionComponent<Props> = (_props: Props) => {
  const path = typeof window != 'undefined' ? window.location.pathname : '/';

  return (
    <>
      <header className="h-16 print:hidden flex items-center content-center justify-between bg-indigo-500 py-3 text-white fixed right-0 left-0 top-0 md:relative">
        <div></div>
        {path !== '/' ? (<a className="sm:hidden inline-block uppercase text-xl" rel="author" href="/"><Logo className="w-8 h-8 inline" /></a>) : <></>}
        <a className="hidden sm:inline-block uppercase text-xl tracking-wider" rel="author" href="/">
          <Logo className="w-12 h-12 inline" />&nbsp;Marisa Clardy
        </a>
        <nav>
          <a className="uppercase text-lg flex-grow mx-3 hover:text-indigo-800" href="/blog">Blog</a>
          <a className="uppercase text-lg flex-grow mx-3 hover:text-indigo-800" href="/cv">CV</a>
          <a className="uppercase text-lg flex-grow mx-3 hover:text-indigo-800" href="/projects">Projects</a>
        </nav>
        <div></div>
      </header>
      <div className="md:hidden">&nbsp;</div>
    </>
  );
};

export default Header;
