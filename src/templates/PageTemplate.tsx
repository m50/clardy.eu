import { cl } from 'lib/helpers';
import * as React from 'react';

const mainClasses = cl`
  w-auto text-lg leading-loose my-10 h-auto
  md:mx-auto xl:w-5/6 2xl:w-1/2
  print:font-serif print:my-0
`;
const DefaultLayout: React.FC<React.PropsWithChildren<any>> = ({ children }) => (
  <main aria-label="Content" className={mainClasses}>
    <div className="mx-5">
      {children}
    </div>
  </main>
);

export default DefaultLayout;
