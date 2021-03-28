export interface AllMarkdownRemark {
	allMarkdownRemark: {
		edges: {
			node: {
				frontmatter: {
					slug: string;
				};
			};
		}[];
	};
}

export const query = `{
  allMarkdownRemark(
    sort: { order: DESC, fields: [frontmatter___date] }
    limit: 1000
  ) {
    edges {
      node {
        frontmatter {
          slug
        }
      }
    }
  }
}`;
