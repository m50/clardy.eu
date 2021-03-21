import * as React from 'react';
import { Link } from 'gatsby';
import Header from 'components/Header';
import MainLayout from 'templates/MainLayout';
import Social from 'components/Social';
import Footer from 'components/Footer';
import { Gravatar } from 'components/Gravatar';
import Undraw from 'images/undraw';
import { ReactComponent as Pagely } from 'images/pagely.svg';

const heroClasses = `
	bg-gradient h-screen flex bg-indigo-400 text-white py-64
	justify-center items-center content-center flex-col
	md:h-auto md:flex-row
`;
const Hero = () => (
	<div className={heroClasses}>
		<div className="my-auto mx-auto md:mx-0 md:my-5">
			<h1 className="text-3xl font-extrabold lg:text-7xl tracking-wider text-center lg:text-left font-welcome">
				Hi, I'm Marisa!
			</h1>
			<h2 className="mt-5 text-xl lg:text-4xl max-w-lg text-center lg:text-left">
				I'm an native Texan, LGBT, Software Developer, with a passion for constant learning.
			</h2>
		</div>
		<div className="mt-10 md:mt-0 md:ml-10">
			<Gravatar />
			<div className="py-5 mx-5">
				<Social />
			</div>
		</div>
	</div>
);

const mainClasses = 'md:w-2/3 2xl:w-1/3 w-auto text-lg leading-loose mt-20 mb-40 md:mx-auto';
const IndexPage = () => (
	<MainLayout className="flex justify-between flex-col min-h-screen">
		<div>
			<Header />
			<Hero />
			<main className={mainClasses} aria-label="Content">
				<div className="flex flex-col md:flex-row items-start mx-5 my-20 justify-between">
					<Undraw name="work-as" className="fill-current w-full md:w-1/3 p-5 h-full" />
					<p className="w-full px-2 md:w-2/3">
						<div className="text-2xl bold">I currently work as</div> a software enginer at
						&nbsp;<Pagely aria-label="pagely" className="h-5 inline-block" style={{ fill: '#0f4f72' }} />,
						working on PHP microservices and a React front-end.
					</p>
				</div>
				<div className="flex flex-col md:flex-row items-start mx-5 my-20 justify-between">
					<Undraw name="recent-work" className="fill-current w-full md:w-1/3 p-5 h-full" />
					<p className="w-full px-2 md:w-2/3">
						<div className="text-2xl bold">Previously, I worked as</div> a
						Senior Developer on <span style={{ color: '#fab559' }}>SpamTitan</span> at
						<span style={{ color: '#1fb9a0' }}> TitanHQ</span>.
						I worked primarily on evolving a legacy codebase to modern standards.
						Working in Laravel for API generation, as well as modernizing framework-less
						PHP code as well. I worked on the full stack, on both the front-end web-GUI
						as well as the appliance back-end, and the full devops/CI/CD process as well.
					</p>
				</div>

				<div className="flex flex-col md:flex-row items-start mx-5 my-20 justify-between">
					<Undraw name="contribute" className="fill-current w-full md:w-1/3 p-5 h-full" />
					<p className="w-full px-2 md:w-2/3">
						<div className="text-2xl bold">I contribute</div> my freetime to open source software.
						See the
						<Link to="/projects" className="text-indigo-400 no-underline hover:underline"> projects </Link>
						page to see what I have worked on.
					</p>
				</div>

				<div className="flex flex-col md:flex-row items-start mx-5 my-20 justify-between">
					<Undraw name="outside" className="fill-current w-full md:w-1/3 p-5 h-full" />
					<p className="w-full px-2 md:w-2/3">
						<div className="text-2xl bold">Outside of the tech sphere</div>
						I have a passion for board games, love to travel and
						see new things.
					</p>
				</div>
			</main>

			<Footer />
		</div>
	</MainLayout>
);

export default IndexPage;
