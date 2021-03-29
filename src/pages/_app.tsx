import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/tailwind.css';
import DefaultLayout from 'templates/DefaultLayout';

function App({ Component, pageProps, router }: AppProps) {
  if (router.pathname === '/') {
    return <Component {...pageProps} />;
  }
  return (
    <DefaultLayout>
      <Component {...pageProps} />
    </DefaultLayout>
  );
}

export default App;
