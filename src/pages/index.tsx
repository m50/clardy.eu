import * as React from 'react';
import Link from 'next/link';
import Hero from 'components/Hero';
import Undraw from 'components/svg/undraw';
import { cl } from 'lib/clean-lines';
import { ReactComponent as Pagely } from '../components/svg/pagely.svg';

const mainClasses = cl`
  w-auto text-lg leading-loose mt-20 mb-40
  md:w-2/3 2xl:w-1/3 md:mx-auto
`;
const IndexPage = () => (
  <>
    <Hero />
    <main className={mainClasses} aria-label="Content">
      <div className="flex flex-col md:flex-row items-start mx-5 my-20 justify-between">
        <Undraw name="work-as" className="w-full md:w-1/3 p-5 h-full" />
        <p className="w-full px-2 md:w-2/3">
          <span className="text-2xl bold block">I currently work as</span> a software enginer at{' '}
          <Pagely aria-label="pagely" className="h-5 inline-block" style={{ fill: '#0f4f72' }} />,
          working on PHP microservices and a React front-end.
        </p>
      </div>
      <div className="flex flex-col md:flex-row items-start mx-5 my-20 justify-between">
        <Undraw name="recent-work" className="w-full md:w-1/3 p-5 h-full" />
        <p className="w-full px-2 md:w-2/3">
          <span className="text-2xl bold block">Previously, I worked as</span> a
          Senior Developer on <span style={{ color: '#fab559' }}>SpamTitan</span> at{' '}
          <span style={{ color: '#1fb9a0' }}>TitanHQ</span>.{' '}
          I worked primarily on evolving a legacy codebase to modern standards.
          Working in Laravel for API generation, as well as modernizing framework-less
          PHP code as well. I worked on the full stack, on both the front-end web-GUI
          as well as the appliance back-end, and the full devops/CI/CD process as well.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-start mx-5 my-20 justify-between">
        <Undraw name="contribute" className="w-full md:w-1/3 p-5 h-full" />
        <p className="w-full px-2 md:w-2/3">
          <span className="text-2xl bold block">I contribute</span> my freetime to open source software.
          See the{' '}
          <Link href="/projects">
            <a className="text-indigo-400 no-underline hover:underline">
              projects
            </a>
          </Link>{' '}
          page to see what I have worked on.
        </p>
      </div>

      <div className="flex flex-col md:flex-row items-start mx-5 my-20 justify-between">
        <Undraw name="outside" className="w-full md:w-1/3 p-5 h-full" />
        <p className="w-full px-2 md:w-2/3">
          <span className="text-2xl bold block">Outside of the tech sphere</span>
          I have a passion for board games, love to travel and
          see new things.
        </p>
      </div>
    </main>
  </>
);

export default IndexPage;
