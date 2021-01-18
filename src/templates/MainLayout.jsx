import * as React from 'react';
import '../styles/tailwind.css';
import '../styles/colorful.css';

const MainLayout = ({ children }) => (<div>
  <link href="https://fonts.googleapis.com/css?family=Kalam|Noto+Sans|Raleway&display=swap" rel="stylesheet"></link>
  {children}
</div>);

export default MainLayout;
