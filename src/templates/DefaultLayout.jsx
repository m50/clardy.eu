import * as React from 'react';
import Header from '../components/Header';
import MainLayout from './MainLayout';
import Footer from '../components/Footer';

const DefaultLayout = ({ children }) => (
  <MainLayout className="flex justify-between flex-col min-h-screen">
    <div>
      <Header />
      <main className="print:font-serif xl:w-5/6 2xl:w-1/2 w-auto text-lg leading-loose my-10 print:my-0 md:mx-auto" aria-label="Content">
        <div className="mx-5">
          {children}
        </div>
      </main>
    </div>
    <Footer />
  </MainLayout>
);

export default DefaultLayout;
