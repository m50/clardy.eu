import * as React from 'react';
import 'prismjs/themes/prism-coy.css';
import 'prismjs/plugins/line-numbers/prism-line-numbers.css';
import '../styles/tailwind.css';
import '../styles/gatsby.css';

interface Props extends React.PropsWithChildren<any> {
  readonly className?: string;
}

const MainLayout: React.FC<Props> = ({ children, className }) => <div className={className}>{children}</div>;

export default MainLayout;
