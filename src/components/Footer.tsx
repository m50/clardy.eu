import * as React from "react";
import Social from "./Social";

interface Props { }

const Footer: React.FunctionComponent<Props> = (_props: Props) => {
  return (
    <footer className="print:hidden w-full static py-10 border-t border-gray-400">
      <div className="flex flex-col md:flex-row justify-center content-center items-center w-full">
          <div className="px-10 text-center md:text-left">
              <ul className="contact-list">
                <li>&copy; Marisa Clardy 2020</li>
                <li><a className="text-indigo-400 no-underline hover:underline" href="mailto:marisa@clardy.eu">marisa@clardy.eu</a></li>
                <li className="text-xs mt-2">Logo by <a target="_blank" rel="noreferrer" href="https://www.instagram.com/squid.lyds/" className="text-indigo-400 hover:underline">Lydia Bullock</a></li>
              </ul>
          </div>
          <div className="max-w-lg px-10 text-center md:text-left">
              <p>I am Marisa Clardy, and this is my site, where I share information about myself, what I'm working on, and cool things I have discovered.</p>
          </div>
      </div>
      <div className="w-1/2 md:w-1/4 border border-gray-400 text-gray-600 h-8 p-5 mt-10 mx-auto flex justify-between content-center items-center">
        <Social />
      </div>
    </footer>
  );
}

export default Footer;
