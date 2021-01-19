import * as React from 'react';
import DefaultLayout from './DefaultLayout';

const MdxLayout = ({ children }) => {
  return (
    <DefaultLayout>
      <div className="markdown px-5">{children}</div>
    </DefaultLayout>
  );
};

export default MdxLayout;
