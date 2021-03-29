import * as React from 'react';
import Header from 'components/Header';
import Footer from 'components/Footer';

const DefaultTemplate: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <div className="flex justify-between flex-col min-h-screen">
    <div>
      <Header />
      {children}
    </div>
    <Footer />
  </div>
);

export default DefaultTemplate;
