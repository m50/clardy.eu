import React from 'react';
import type { AppProps } from 'next/app';
import '../styles/tailwind.css';
import DefaultTemplate from 'templates/DefaultTemplate';
import { init as sentry } from '@sentry/react';
import { Integrations } from '@sentry/tracing';

sentry({
  enabled: process.env.NODE_ENV === 'production',
  dsn: process.env.NEXT_PUBLIC_SENTRY_DSN,
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 0.5,
  release: process.env.RELEASE,
});

function App({ Component, pageProps }: AppProps) {
  return (
    <DefaultTemplate>
      <Component {...pageProps} />
    </DefaultTemplate>
  );
}

export default App;
