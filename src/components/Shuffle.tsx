import React from 'react';

interface Props2 {
  className?: string;
  children: React.ReactNode | React.ReactNode[];
}

export const Shuffle = ({ children, className = '' }: Props2) => {
  const childs = [...(Array.isArray(children) ? children : [children])];

  const sortedChildren = childs.sort(() => Math.round(Math.random() * 2 - 1));

  return (
    <div className={className}>
      {sortedChildren}
    </div>
  );
};
