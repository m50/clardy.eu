import * as React from 'react';
import PageTemplate from './PageTemplate';

const MdxTemplate: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <PageTemplate>
    <div className="prose px-5">{children}</div>
  </PageTemplate>
);

export default MdxTemplate;
