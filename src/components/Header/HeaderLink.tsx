import * as React from 'react';
import Link from 'next/link';
import { Page } from './types';

interface Props {
  page: Page;
}
const HeaderLink: React.FC<Props> = ({ page }) => (
  <Link href={page.path}>
    <a className="uppercase text-lg flex-grow mx-3 hover:text-indigo-800">
      {page.name}
    </a>
  </Link>
);

export default HeaderLink;
