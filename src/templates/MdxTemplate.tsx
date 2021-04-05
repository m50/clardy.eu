import * as React from 'react';
import tw from 'tailwind-styled-components';
import { MDXProvider } from '@mdx-js/react';
import PageTemplate from './PageTemplate';

const Wrapper = tw.section`
  prose prose-purple px-5 max-w-none text-white
  xl:prose-xl print:prose-sm
`;
const h1 = tw.h1`!text-white font-header print:font-sans`;
const h2 = tw.h2`!text-white font-header print:font-sans`;
const h3 = tw.h3`!text-white font-subheader print:font-sans`;
const h4 = tw.h4`!text-white font-subheader print:font-sans`;
const h5 = tw.h5`!text-white font-subheader print:font-sans`;
const h6 = tw.h6`!text-white font-subheader print:font-sans`;

type AProps = React.DetailedHTMLProps<React.AnchorHTMLAttributes<HTMLAnchorElement>, HTMLAnchorElement>;

const components = {
  a: ({ href, children }: AProps) => <a href={href} target="_blank" rel="noreferrer">{children}</a>,
  // eslint-disable-next-line object-property-newline
  h1, h2, h3, h4, h5, h6,
};

const MdxTemplate: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <PageTemplate>
    <MDXProvider components={components}>
      <Wrapper>{children}</Wrapper>
    </MDXProvider>
  </PageTemplate>
);

export default MdxTemplate;
