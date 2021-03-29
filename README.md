# NextJS TypeScript Starter

[![GitHub license](https://img.shields.io/badge/license-MIT-blue.svg)](https://oss.ninja/mit?organization=Marisa%20Clardy)

An opinionated starter template for building a TypeScript NextJS app on Netlify.

This comes with TypeScript, Github Actions, ESLint, Jest, TailwindCSS, and Netlify all setup out of the box.

___
## General details and features

- Framework: [NextJS](https://nextjs.com/)
- Markdown Rendering: [React Markdown](https://github.com/remarkjs/react-markdown)
- Code Highlighting: [React Syntax Highlighter](https://github.com/react-syntax-highlighter/react-syntax-highlighter)
- Hosting: [Netlify](https://www.netlify.com)
- CMS: [Netlify CMS](https://www.netlifycms.org)
- CI/CD: [Github Actions](https://github.com/features/actions)
- Styling: [TailwindCSS](https://tailwindcss.com)
- Language: [TypeScript](https://www.typescriptlang.org)
- Lint: [ESLint](https://eslint.org) with opinionated form of [AirBNB rules](https://www.npmjs.com/package/eslint-config-airbnb)
- Tests: [Jest](https://jestjs.io)

___
## Getting Started

Use this deploy button to get your own copy of the repository.

[![Deploy to Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/m50/next-ts-netlify-starter&stack=cms)

This button will do the following:

Connect to your GitHub account and create a new repository with the name you specify
- Deploy your copy of the repository and setup continuous deployment
- Send an invite to the email address associated with your Netlify account
- Accept the invite, set your password, then navigate to `/admin/` on your site to log in.

Now you're all set, and you can start customizing your static site!

## Local Development

After using the deploy button above, clone your copy of the repository and run:

```sh
$ yarn install
$ yarn start
```

Open http://localhost:3000 with your browser to see the result.

You can start editing the page by modifying `src/pages/index.js`. The page auto-updates as you edit the file.

API routes can be accessed on http://localhost:3000/api/hello. This endpoint can be edited in `src/pages/api/hello.js`.

The `src/pages/api` directory is mapped to `/api/*`. Files in this directory are treated as API routes instead of React pages.

___
## License

Released under the MIT License.
