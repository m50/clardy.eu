import { cl } from 'lib/helpers';
import React from 'react';

const colorMap = {
  red: 'bg-red-400 text-white',
  blue: 'bg-blue-400 text-white',
  green: 'bg-green-400 text-white',
  purple: 'bg-purple-400 text-white',
  indigo: 'bg-indigo-400 text-white',
  yellow: 'bg-yellow-300 text-black',
  pink: 'bg-pink-300 text-black',
  brown: 'bg-yellow-800 text-white',
  gray: 'bg-gray-400 text-white',
  orange: 'bg-yellow-500 text-white',
  black: 'bg-black text-white',
};

type Props = React.PropsWithChildren<{
  color?: 'random' | keyof typeof colorMap;
  className?: string;
}>;

export const Tag = ({ children, color = 'random', className = '' }: Props) => {
  let colorClass = '';
  if (color === 'random') {
    const colors = Object.values(colorMap);
    colorClass = colors[Math.floor(Math.random() * colors.length)];
  } else {
    colorClass = colorMap[color];
  }
  return (
    <span className={cl`px-3 py-0.5 h-full rounded-full ${colorClass} ${className}
      print:text-black print:p-0`}
    >
      {children}
    </span>
  );
};
