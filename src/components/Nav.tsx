import * as React from 'react';
import { Title } from 'components/svg/title';
import Social from 'components/Social';
import { NavLink } from 'components/styled/NavLink';
import Link from 'next/link';

const Nav = () => (
  <div className="w-full flex justify-center items-center h-full flex-grow relative">
    <nav className="flex justify-evenly w-full">
      <Link href="/about"><NavLink>About</NavLink></Link>
      <Link href="/cv"><NavLink>CV</NavLink></Link>
      <div className="flex justify-center items-center">
        <Title>Marisa Clardy</Title>
        <Social className="flex-col text-yellow-400 absolute items-center h-40 mt-64 pt-8" />
      </div>
      <Link href="/projects"><NavLink>Projects</NavLink></Link>
      <Link href="/blog"><NavLink>Blog</NavLink></Link>
    </nav>
  </div>
);

export default Nav;
