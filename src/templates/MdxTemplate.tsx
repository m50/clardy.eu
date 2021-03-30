import * as React from 'react';
import tw from 'tailwind-styled-components';
import { MDXProvider } from '@mdx-js/react';
import PageTemplate from './PageTemplate';

const Wrapper = tw.section`
  prose prose-indigo px-5 max-w-none
  xl:prose-lg print:prose-sm
`;

const components = {
  a: ({ href, children }) => <a href={href} target="_blank" rel="noreferrer">{children}</a>,
};

const MdxTemplate: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <PageTemplate>
    <MDXProvider components={components}>
      <Wrapper>{children}</Wrapper>
    </MDXProvider>
  </PageTemplate>
);

export default MdxTemplate;
