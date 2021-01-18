import * as React from 'react';
import DefaultLayout from './DefaultLayout';

interface Props {
	title: string,
	subtitle: string,
	date: string,
	dateModified: string,
	image: string,
	children?: JSX.Element,
}

const PostLayout = (props: Props) => {
	const headerBG = { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${props.image}')` };
	return (
		<DefaultLayout>
			<article className="pt-5 mb-40 md:mb-auto">
				<header style={headerBG}
					className="-mx-3 md:mx-0 h-40 md:h-64 bg-gray-800 mb-10 px-2 md:px-8 rounded-lg bg-cover bg-center text-white flex content-center items-center"
				>
					<div>
						<h1 className="text-4xl md:text-6xl font-bold font-welcome leading-tight tracking-wide">{props.title}</h1>
						<h2 className="text-4xl md:text-3xl font-bold font-welcome">{props.subtitle}</h2>
						<p className="ml-10 font-bold text-sm">
							<time dateTime={props.date}>
								Published on: {props.date}
							</time>
							~
							<time dateTime={props.dateModified}>
								Modified on: {props.dateModified}
							</time>
						</p>
					</div>
				</header>

				<div className="markdown px-5">
					{props.children}
				</div>
			</article>
		</DefaultLayout>
	);
};

export default PostLayout;


