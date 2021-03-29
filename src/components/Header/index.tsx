import * as React from 'react';
import Link from 'next/link';
import { cl } from 'lib/clean-lines';
import HeaderLink from './HeaderLink';
import { Page } from './types';

const headerClasses = cl`
  h-16 print:hidden flex items-center content-center justify-between
  bg-indigo-500 py-3 text-white fixed right-0 left-0 top-0 md:relative
`;
const pages: Page[] = [
  { id: '', path: '', internalComponentName: '' },
];

export const Header: React.FC = () => (
  <>
    <header className={headerClasses}>
      <div />
      <Link href="/">
        <a key="large" rel="author"
          className="hidden sm:inline-block uppercase text-xl tracking-wider"
        >
          Marisa Clardy
        </a>
      </Link>
      <nav>
        {pages.map((page) => <HeaderLink key={page.path} page={page} />)}
      </nav>
      <div />
    </header>
    <div className="md:hidden">{' '}</div>
  </>
);

export default Header;
