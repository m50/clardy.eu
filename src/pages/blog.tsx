import * as React from 'react';
import { graphql, Link } from 'gatsby';
import DefaultLayout from 'templates/DefaultLayout';
import { ReactComponent as Updated } from 'images/undraw/updated.svg';

interface Node {
	frontmatter: {
		slug: string
		title: string
		date: string
	}
}
interface Data { allMarkdownRemark: { nodes: Node[] } }
interface Props {
	data: Data
}

const Blog: React.FunctionComponent<Props> = ({ data: { allMarkdownRemark: { nodes } } }: Props) => (
	<DefaultLayout>
		<div className="mx-2 md:mx-10 mb-10">
			<section className="flex justify-between h-64 items-center">
				<Updated className="h-full p-5" />
				<h1 className="text-4xl bold mb-5 w-full border-b border-gray-300">Recent posts</h1>
			</section>
			<ul className="flex flex-wrap justify-start">
				{nodes.map(({ frontmatter }, idx) => (
					<li className="p-2 w-full md:w-1/2 lg:w-1/3 2xl:w-1/4" key={idx}>
						<section className="border-l-2 border-indigo-600 bg-gray-200 p-5 hover:bg-gray-300 w-full">
							<Link to={`/${frontmatter.slug}`}>
								<h3 className="text-2xl bold text-indigo-600">{frontmatter.title}</h3>
								<ul><li className="ml-3 mt-2 text-sm">Released: {frontmatter.date}</li></ul>
							</Link>
						</section>
					</li>
				))}
			</ul>
		</div>
	</DefaultLayout>
);

export default Blog;

export const pageQuery = graphql`
	query BlogQuery {
		allMarkdownRemark(limit: 10, sort: {order: DESC, fields: frontmatter___date}) {
			nodes {
				id
				frontmatter {
					title
					slug
					date(formatString: "MMMM DD, YYYY")
				}
			}
		}
	}
`;
