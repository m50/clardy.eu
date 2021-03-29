import * as React from 'react';
import PageTemplate from './PageTemplate';

const MdxTemplate: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <PageTemplate>
    <div className="prose prose-indigo xl:prose-lg px-5 print:prose-sm max-w-none">{children}</div>
  </PageTemplate>
);

export default MdxTemplate;
