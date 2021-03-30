import React from 'react';
import { cl } from 'lib/helpers';
import Social from './Social';
import { Gravatar } from './Gravatar';

const heroClasses = cl`
  bg-gradient h-screen flex text-white py-64
  justify-center items-center content-center flex-col
  md:h-auto md:flex-row
`;
const Hero = () => (
  <section className={heroClasses}>
    <div className="my-auto mx-auto md:mx-0 md:my-5">
      <h1 className="text-3xl font-extrabold lg:text-7xl tracking-wider text-center lg:text-left font-welcome">
        Hi, I'm Marisa!
      </h1>
      <h2 className="mt-5 text-xl lg:text-4xl max-w-lg text-center lg:text-left">
        I'm an native Texan, LGBT, Software Developer, with a passion for constant learning.
      </h2>
    </div>
    <div className="mt-10 md:mt-0 md:ml-10">
      <Gravatar className="mx-auto" />
      <div className="py-5 mx-5">
        <Social />
      </div>
    </div>
  </section>
);

export default Hero;
