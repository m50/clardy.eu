import * as React from 'react';
import { BgGradient } from 'components/styled/BgGradient';
import Nav from 'components/Nav';

const DefaultTemplate: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <div className="flex justify-between flex-col min-h-screen bg-black">
    <BgGradient>
      <Nav />
      {children}
    </BgGradient>
  </div>
);

export default DefaultTemplate;
