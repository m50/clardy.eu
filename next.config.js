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
		config.module.rules.push({
			test: /\.(woff(2)?|ttf|eot|otf)$/,
			loader: 'file-loader',
			options: {
				name: '[name].[ext]',
				outputPath: 'fonts/',
			},
		});


		if (NODE_ENV === 'production' && SENTRY_ORG && SENTRY_PROJECT && SENTRY_AUTH_TOKEN) {
			config.plugins.push(new SentryWebpackPlugin({
				include: '.next',
				ignore: ['node_modules'],
				urlPrefix: "~/_next",
				stripPrefix: ['webpack://_N_E/'],
				ext: ['js', 'ts', 'map', 'jsbundle'],
				release: process.env.COMMIT_REF,
			}));
		}

		return config;
	},
  redirects: async () => [
  ],
});
