import React from 'react';
import { cl } from 'lib/clean-lines';

interface Props {
  className?: string;
}
export const Gravatar: React.FC<Props> = ({ className = '' }) => (
  <img alt="Marisa" className={cl`rounded-full border-2 border-white shadow-lg ${className}`}
    src="https://www.gravatar.com/avatar/febc3d5f662cd665425a91c67e68bedc?s=240"
  />
);

export default Gravatar;
