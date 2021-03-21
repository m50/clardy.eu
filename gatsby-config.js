const path = require('path');

module.exports = {
	siteMetadata: {
		title: 'clardy.eu',
	},
	plugins: [
		'gatsby-plugin-sharp',
		'gatsby-plugin-react-helmet',
		'gatsby-plugin-typescript',
		{
			resolve: 'gatsby-plugin-ts-config',
			options: {
				tsNode: true,
			},
		},
		'gatsby-plugin-postcss',
		'gatsby-plugin-svgr',
		{
			resolve: 'gatsby-plugin-root-import',
			options: {
				src: path.join(__dirname, 'src'),
				components: path.join(__dirname, 'src', 'components'),
				images: path.join(__dirname, 'src', 'images'),
				node: path.join(__dirname, 'src', 'node'),
				pages: path.join(__dirname, 'src', 'pages'),
				templates: path.join(__dirname, 'src', 'templates'),
				types: path.join(__dirname, 'src', 'types'),
			},
		},
		{
			resolve: '@sentry/gatsby',
			options: {
				dsn: process.env.SENTRY_DSN,
				sampleRate: 0.7,
			},
		},
		{
			resolve: 'gatsby-plugin-manifest',
			options: {
				icon: 'src/images/icon.svg',
			},
		},
		{
			resolve: 'gatsby-transformer-remark',
			options: {
				gfm: true,
				commonmark: true,
				plugins: [
					{
						resolve: 'gatsby-remark-table-of-contents',
						options: {
							exclude: 'Table of Contents',
							tight: false,
							ordered: false,
							fromHeading: 1,
							toHeading: 6,
							className: 'table-of-contents',
						},
					},
					'gatsby-remark-autolink-headers',
					{
						resolve: 'gatsby-remark-prismjs',
						options: {
							showLineNumbers: true,
						},
					},
				],
			},
		},
		{
			resolve: 'gatsby-plugin-mdx',
			options: {
				extensions: ['.mdx'],
				defaultLayouts: {
					default: require.resolve('./src/templates/MdxLayout.tsx'),
				},
			},
		},
		'gatsby-transformer-sharp',
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'images',
				path: './src/images/',
			},
			__key: 'images',
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'pages',
				path: './src/pages/',
			},
			__key: 'pages',
		},
		{
			resolve: 'gatsby-source-filesystem',
			options: {
				name: 'posts',
				path: './src/posts/',
			},
			__key: 'posts',
		},
	],
};
