import * as React from "react"
import Header from '../components/Header';
import MainLayout from '../templates/MainLayout';
import Social from '../components/Social';
import Footer from '../components/Footer';
import { ReactComponent as RecentWork } from '../images/undraw/recent_work.svg';
import { ReactComponent as Contribute } from '../images/undraw/proud_coder.svg';
import { ReactComponent as WorkAs } from '../images/undraw/completing.svg';
import { ReactComponent as Outside } from '../images/undraw/imagination.svg';

const IndexPage = () => {
  return (
    <MainLayout className="flex justify-between flex-col min-h-screen">
      <div>
        <Header></Header>
        <div className="bg-gradient h-screen md:h-auto flex bg-indigo-400 text-white py-64 justify-center items-center content-center flex-col md:flex-row">
          <div className="my-auto mx-auto md:mx-0 my-5">
            <h1 className="text-3xl font-extrabold lg:text-7xl tracking-wider text-center lg:text-left font-welcome">Hi, I'm Marisa!</h1>
            <h2 className="mt-5 text-xl lg:text-4xl max-w-lg text-center lg:text-left">
            I'm an native Texan, LGBT, Software Developer, with a passion for constant learning.
            </h2>
          </div>
          <div className="mt-10 md:mt-0 md:ml-10">
            <img alt="Marisa" className="mx-auto rounded-full border-2 border-white shadow-lg" src="https://www.gravatar.com/avatar/febc3d5f662cd665425a91c67e68bedc?s=240" />
            <div className="py-5 mx-5">
              <Social />
            </div>
          </div>
        </div>

        <main className="lg:w-1/3 w-auto text-lg leading-loose mt-20 mb-40 md:mx-auto" aria-label="Content">
          <div className="flex flex-col md:flex-row items-start mx-5 my-20 justify-between items-center">
            <WorkAs className="fill-current w-full md:w-1/3 p-5 h-full" />
            <p className="w-full px-2 md:w-2/3">
              <span className="block text-2xl bold">I currently work as</span> a Salesforce engineer for Happy Money,
              on the Loan Origination platform. I am helping to expand the Loan Origination platform to fit future
              business needs.
            </p>
          </div>
          <div className="flex flex-col md:flex-row items-start mx-5 my-20 justify-between items-center">
            <RecentWork className="fill-current w-full md:w-1/3 p-5 h-full" />
            <p className="w-full px-2 md:w-2/3">
              <span className="block text-2xl bold">Recently I worked as</span> a Senior Developer on SpamTitan at TitanHQ. I am working primarily
              on evolving a legacy codebase to modern standards. Working in Laravel for API generation,
              as well as modernizing framework-less PHP code as well. I work on the full stack,
              working on both the front-end web-GUI as well as the appliance back-end, and the
              full CI/CD process as well.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start mx-5 my-20 justify-between items-center">
            <Contribute className="fill-current w-full md:w-1/3 p-5 h-full" />
            <p className="w-full px-2 md:w-2/3">
              <span className="block text-2xl bold">I contribute</span> my freetime to open source software.
              See the <a className="text-indigo-400 no-underline hover:underline" href="/oss-projects">projects</a> page to see what I have worked on.
            </p>
          </div>

          <div className="flex flex-col md:flex-row items-start mx-5 my-20 justify-between items-center">
            <Outside className="fill-current w-full md:w-1/3 p-5 h-full" />
            <p className="w-full px-2 md:w-2/3">
              <span className="block text-2xl bold">Outside of the tech sphere</span>
              I have a passion for board games, love to travel and
              see new things.
            </p>
          </div>
        </main>

        <Footer />
      </div>
    </MainLayout>
  )
}

export default IndexPage
