import * as React from 'react';
import Link from 'next/link';

const NotFoundPage = () => (
  <div>
    <p>404 Not Found</p>
    <p>
      <Link href="/">
        <a className="text-indigo-400 hover:text-indigo-700">
          Go home
        </a>
      </Link>
    </p>
  </div>
);

export default NotFoundPage;
