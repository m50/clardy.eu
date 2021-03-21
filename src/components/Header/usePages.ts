import { useStaticQuery, graphql } from 'gatsby';

interface Data {
	allSitePage: {
		nodes: {
			id: string;
			path: string;
			internalComponentName: string;
		}[];
	};
}

export const usePages = () => {
	const { allSitePage } = useStaticQuery<Data>(graphql`
		query HeaderQuery {
			allSitePage(filter: {
					componentPath: {regex: "/^.*(?<!PostLayout\\.jsx)$/"},
					path: {regex: "/^\\/(?!(dev-)?404).*\\/$/"}
				}, sort: {fields: internalComponentName, order: ASC})
			{
				nodes {
					id
					path
					internalComponentName
				}
			}
		}
	`);

	return allSitePage.nodes;
};
