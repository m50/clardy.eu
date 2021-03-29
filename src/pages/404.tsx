import * as React from 'react';
import Link from 'next/link';
import PageTemplate from 'templates/PageTemplate';

const NotFoundPage = () => (
  <PageTemplate>
    <div className="flex justify-center content-center items-center flex-col lg:py-64">
      <h2 className="text-6xl">404 Not Found</h2>
      <p className="text-2xl">
        <Link href="/">
          <a className="text-indigo-400 hover:text-indigo-700">
            Go home
          </a>
        </Link>
      </p>
    </div>
  </PageTemplate>
);

export default NotFoundPage;
