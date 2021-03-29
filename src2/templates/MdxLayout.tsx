import * as React from 'react';
import DefaultLayout from './DefaultLayout';

const MdxLayout: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
	<DefaultLayout>
		<div className="markdown px-5">{children}</div>
	</DefaultLayout>
);

export default MdxLayout;
