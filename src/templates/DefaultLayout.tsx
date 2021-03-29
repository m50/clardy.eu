import * as React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';

const DefaultLayout: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
	<div className="flex justify-between flex-col min-h-screen">
		<div>
			<Header />
			<main aria-label="Content"
				className="print:font-serif xl:w-5/6 2xl:w-1/2 w-auto text-lg leading-loose my-10 print:my-0 md:mx-auto"
			>
				<div className="mx-5">
					{children}
				</div>
			</main>
		</div>
		<Footer />
	</div>
);

export default DefaultLayout;
