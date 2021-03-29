import * as React from 'react';

const DefaultLayout: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <main aria-label="Content"
    className="print:font-serif xl:w-5/6 2xl:w-1/2 w-auto text-lg leading-loose my-10 print:my-0 md:mx-auto"
  >
    <div className="mx-5">
      {children}
    </div>
  </main>
);

export default DefaultLayout;
