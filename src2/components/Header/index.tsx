import * as React from 'react';
import { Link } from 'gatsby';
import HeaderLink from './HeaderLink';
import { usePages } from './usePages';

const headerClasses = `
	h-16 print:hidden flex items-center content-center justify-between
	bg-indigo-500 py-3 text-white fixed right-0 left-0 top-0 md:relative
`;
export const Header: React.FC = () => {
	const pages = usePages();
	return (
		<>
			<header className={headerClasses}>
				<div />
				<Link key="large" rel="author" to="/"
					className="hidden sm:inline-block uppercase text-xl tracking-wider"
				>
					Marisa Clardy
				</Link>
				<nav>
					{pages.map((page) => <HeaderLink key={page.path} page={page} />)}
				</nav>
				<div />
			</header>
			<div className="md:hidden">&nbsp;</div>
		</>
	);
};

export default Header;
