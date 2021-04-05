import React from 'react';
import { cl } from 'lib/helpers';
import Social from './Social';

const Footer: React.FC = () => (
  <footer className="print:hidden w-full static py-10 border-t border-yellow-400 bg-black text-white">
    <div className="flex flex-col md:flex-row justify-center content-center items-center w-full">
      <div className="px-10 text-center md:text-left">
        <ul>
          <li>&copy; Marisa Clardy 2020</li>
          <li>
            <a className="text-yellow-400 no-underline hover:underline" href="mailto:marisa@clardy.eu">
              marisa@clardy.eu
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div className={cl`
        border border-yellow-400 p-2 w-1/2 md:w-1/4 mt-10
        mx-auto flex justify-between content-center items-center
      `}
    >
      <div className={cl`
          w-full border border-yellow-400 h-8 p-5 text-yellow-400
          flex justify-between content-center items-center
        `}
      >
        <Social />
      </div>
    </div>
  </footer>
);

export default Footer;
