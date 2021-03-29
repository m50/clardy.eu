import { GatsbyNode } from 'gatsby';
import { join } from 'path';
import { AllMarkdownRemark, query } from './posts.query';

const template = 'PostLayout';

export const createPosts: GatsbyNode['createPages'] = async ({ actions, graphql, reporter }) => {
	const result = await graphql<AllMarkdownRemark>(query);
	// Handle errors
	if (result.errors) {
		reporter.panicOnBuild('Error while running GraphQL query.');
		return;
	}
	result.data.allMarkdownRemark.edges.forEach(({ node }) => {
		actions.createPage({
			path: node.frontmatter.slug,
			component: join(process.cwd(), 'src', 'templates', `${template}.tsx`),
			context: {
				// additional data can be passed via context
				slug: node.frontmatter.slug,
			},
		});
	});
};
