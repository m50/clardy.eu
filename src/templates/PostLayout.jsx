import * as React from 'react';
import DefaultLayout from './DefaultLayout';
import { graphql } from "gatsby";

const PostLayout = ({ data }) => {
	const { markdownRemark } = data;
	const { frontmatter, html } = markdownRemark;
	const headerBG = { backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${frontmatter.image}')` };
	return (
		<DefaultLayout>
			<article className="pt-5 mb-40 md:mb-auto">
				<header style={headerBG}
					className="-mx-3 md:mx-0 h-40 md:h-64 bg-gray-800 mb-10 px-2 md:px-8 rounded-lg bg-cover bg-center text-white flex content-center items-center"
				>
					<div>
						<h1 className="text-4xl md:text-6xl font-bold font-welcome leading-tight tracking-wide">{frontmatter.title}</h1>
						<h2 className="text-4xl md:text-3xl font-bold font-welcome">{frontmatter.subtitle}</h2>
						<p className="ml-10 font-bold text-sm">
							<time dateTime={frontmatter.date}>
								Published on: {frontmatter.date}
							</time>
							~
							<time dateTime={frontmatter.dateModified}>
								Modified on: {frontmatter.dateModified}
							</time>
						</p>
					</div>
				</header>

				<div className="markdown px-5" dangerouslySetInnerHTML={{ __html: html }}></div>
			</article>
		</DefaultLayout>
	);
};

export default PostLayout;

// export const pageQuery = graphql`
//   query($slug: String!) {
//     markdownRemark(frontmatter: { slug: { eq: $slug } }) {
//       html
//       frontmatter {
// 				slug
// 				title
// 				layout
// 				date(formatString: "MMMM DD, YYYY")
// 				dateModified(formatString: "MMMM DD, YYYY")
//       }
//     }
//   }
// `;

