import React from 'react';
import { cl } from 'lib/helpers';
import tw from 'tailwind-styled-components';

export const Grad = tw.div`
  bg-gradient-to-br from-purple-400 to-purple-900
  flex flex-grow
`;

type Props = React.DetailedHTMLProps<React.HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export const BgGradient: React.FC<Props> = ({ children, className, ...props }) => (
  <Grad {...props}>
    <div className={cl`flex-grow bg-black bg-opacity-60 flex ${className ?? ''}`}>
      {children}
    </div>
  </Grad>
);
