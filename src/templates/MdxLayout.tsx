import * as React from 'react';

const MdxLayout: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <div className="prose px-5">{children}</div>
);

export default MdxLayout;
