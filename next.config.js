const withMDX = require('@next/mdx')({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})
const { NODE_ENV, CONTEXT } = process.env;

require('./prepare');

module.exports = withMDX({
	pageExtensions: ['js', 'jsx', 'mdx', 'tsx'],
	target: 'experimental-serverless-trace',
	productionBrowserSourceMaps: NODE_ENV === 'production',
	env: {
		CONTEXT,
		RELEASE: process.env.COMMIT_REF,
	},
	webpack: (config) => {
		config.module.rules.push({
			test: /\.md$/,
			loader: 'frontmatter-markdown-loader',
			options: { mode: ['react-component'] },
		});

		return config;
	},
  redirects: async () => [
  ],
});
