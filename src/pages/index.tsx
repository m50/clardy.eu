import * as React from 'react';
import Link from 'next/link';
import Hero from 'components/Hero';
import Undraw from 'components/svg/undraw';
import tw from 'tailwind-styled-components';
import { ReactComponent as Pagely } from '../components/svg/pagely.svg';

const Section = tw.div`flex flex-col md:flex-row items-start mx-5 my-20 justify-between`;
const Main = tw.main`
  w-auto text-lg leading-loose mt-20 mb-40
  md:w-2/3 2xl:w-1/3 md:mx-auto
`;
const SectionHeader = tw.span`text-2xl bold block`;
const A = tw.a`text-indigo-400 no-underline hover:underline`;
const Paragraph = tw.p`w-full px-2 md:w-2/3`;

const IndexPage = () => (
  <>
    <Hero />
    <Main aria-label="Content">
      <Section>
        <Undraw name="work-as" className="w-full md:w-1/3 p-5 h-full" />
        <Paragraph>
          <SectionHeader>I currently work as</SectionHeader> a software enginer at{' '}
          <Pagely aria-label="pagely" className="h-5 inline-block" style={{ fill: '#0f4f72' }} />,{' '}
          working on PHP microservices and a React front-end.
        </Paragraph>
      </Section>
      <Section>
        <Undraw name="recent-work" className="w-full md:w-1/3 p-5 h-full" />
        <Paragraph>
          <SectionHeader>Previously, I worked as</SectionHeader> a
          Senior Developer on <span style={{ color: '#fab559' }}>SpamTitan</span> at{' '}
          <span style={{ color: '#1fb9a0' }}>TitanHQ</span>.{' '}
          I worked primarily on evolving a legacy codebase to modern standards.
          Working in Laravel for API generation, as well as modernizing framework-less
          PHP code as well. I worked on the full stack, on both the front-end web-GUI
          as well as the appliance back-end, and the full devops/CI/CD process as well.
        </Paragraph>
      </Section>

      <Section>
        <Undraw name="contribute" className="w-full md:w-1/3 p-5 h-full" />
        <Paragraph>
          <SectionHeader>I contribute</SectionHeader> my freetime to open source software.
          See the{' '}
          <Link href="/projects">
            <A>projects</A>
          </Link>{' '}
          page to see what I have worked on.
        </Paragraph>
      </Section>

      <Section>
        <Undraw name="outside" className="w-full md:w-1/3 p-5 h-full" />
        <Paragraph>
          <SectionHeader>Outside of the tech sphere</SectionHeader>
          I have a passion for board games, love to travel and
          see new things.
        </Paragraph>
      </Section>
    </Main>
  </>
);

export default IndexPage;
