import * as React from 'react';
import { Link } from 'gatsby';

interface Props {
	page: {
		id: string;
		path: string;
		internalComponentName: string;
	};
}
const HeaderLink: React.FC<Props> = ({ page }) => (
	<Link className="uppercase text-lg flex-grow mx-3 hover:text-indigo-800" to={page.path}>
		{page.internalComponentName
			.replace('Component', '')
			.replace(/([A-Z])/g, ' $1')}
	</Link>
);

export default HeaderLink;
