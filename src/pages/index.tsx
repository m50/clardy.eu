import * as React from 'react';
import Link from 'next/link';
import Header from 'components/Header';
import Footer from 'components/Footer';
import Hero from 'components/Hero';
import Undraw from 'images/undraw';
import { ReactComponent as Pagely } from 'images/pagely.svg';
import { cl } from 'lib/clean-lines';

const mainClasses = cl`md:w-2/3 2xl:w-1/3 w-auto text-lg leading-loose mt-20 mb-40 md:mx-auto`;
const IndexPage = () => (
  <div className="flex justify-between flex-col min-h-screen">
    <div>
      <Header />
      <Hero />
      <main className={mainClasses} aria-label="Content">
        <div className="flex flex-col md:flex-row items-start mx-5 my-20 justify-between">
          <Undraw name="work-as" className="fill-current w-full md:w-1/3 p-5 h-full" />
          <p className="w-full px-2 md:w-2/3">
            <div className="text-2xl bold">I currently work as</div> a software enginer at{' '}
            <Pagely aria-label="pagely" className="h-5 inline-block" style={{ fill: '#0f4f72' }} />,
            working on PHP microservices and a React front-end.
          </p>
        </div>
        <div className="flex flex-col md:flex-row items-start mx-5 my-20 justify-between">
          <Undraw name="recent-work" className="fill-current w-full md:w-1/3 p-5 h-full" />
          <p className="w-full px-2 md:w-2/3">
            <div className="text-2xl bold">Previously, I worked as</div> a
            Senior Developer on <span style={{ color: '#fab559' }}>SpamTitan</span> at{' '}
            <span style={{ color: '#1fb9a0' }}>TitanHQ</span>.{' '}
            I worked primarily on evolving a legacy codebase to modern standards.
            Working in Laravel for API generation, as well as modernizing framework-less
            PHP code as well. I worked on the full stack, on both the front-end web-GUI
            as well as the appliance back-end, and the full devops/CI/CD process as well.
          </p>
        </div>

        <div className="flex flex-col md:flex-row items-start mx-5 my-20 justify-between">
          <Undraw name="contribute" className="fill-current w-full md:w-1/3 p-5 h-full" />
          <p className="w-full px-2 md:w-2/3">
            <div className="text-2xl bold">I contribute</div> my freetime to open source software.
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
          <Undraw name="outside" className="fill-current w-full md:w-1/3 p-5 h-full" />
          <p className="w-full px-2 md:w-2/3">
            <div className="text-2xl bold">Outside of the tech sphere</div>
            I have a passion for board games, love to travel and
            see new things.
          </p>
        </div>
      </main>

      <Footer />
    </div>
  </div>
);

export default IndexPage;
