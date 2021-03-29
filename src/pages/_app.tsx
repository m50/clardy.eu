import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/tailwind.css';
import DefaultTemplate from 'templates/DefaultTemplate';

function App({ Component, pageProps }: AppProps) {
  return (
    <DefaultTemplate>
      <Component {...pageProps} />
    </DefaultTemplate>
  );
}

export default App;
