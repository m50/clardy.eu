import * as React from 'react';
import PageTemplate from './PageTemplate';

const MdxTemplate: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <PageTemplate>
    <div className="prose prose-indigo px-5 max-w-none">{children}</div>
  </PageTemplate>
);

export default MdxTemplate;
