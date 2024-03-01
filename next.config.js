const SentryWebpackPlugin = require('@sentry/webpack-plugin');
const withMDX = require('@next/mdx')({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
})
const { SENTRY_ORG, SENTRY_PROJECT, SENTRY_AUTH_TOKEN, NODE_ENV } = process.env;
const { CONTEXT } = process.env;

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
