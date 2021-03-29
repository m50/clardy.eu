import * as React from 'react';
import Link from 'next/link';
import PageTemplate from 'templates/PageTemplate';

const NotFoundPage = () => (
  <PageTemplate>
    <p>404 Not Found</p>
    <p>
      <Link href="/">
        <a className="text-indigo-400 hover:text-indigo-700">
          Go home
        </a>
      </Link>
    </p>
  </PageTemplate>
);

export default NotFoundPage;
