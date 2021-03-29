/* eslint-disable react/no-danger */
import * as React from 'react';
import { Markdown } from 'components/Markdown';
import { coy } from 'react-syntax-highlighter/dist/cjs/styles/prism';
import { Post } from 'collections/posts/post';
import { cl } from 'lib/clean-lines';
import PageTemplate from './PageTemplate';

const PostTemplate: React.FC<Post> = ({ content, meta }) => {
  const headerBG = {
    backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)), url('${meta.image}')`,
  };
  return (
    <PageTemplate>
      <article className="pt-5 mb-40 md:mb-auto">
        <header style={headerBG}
          className={cl`
            -mx-3 md:mx-0 h-40 md:h-64 bg-gray-800 mb-10 px-2 md:px-8 rounded-lg
            bg-cover bg-center text-white flex content-center items-center
          `}
        >
          <div>
            <h1 className="text-4xl md:text-6xl font-bold font-welcome leading-tight tracking-wide">
              {meta.title}
            </h1>
            <h2 className="text-4xl md:text-3xl font-bold font-welcome">{meta.subtitle}</h2>
            <p className="ml-10 font-bold text-sm">
              <time dateTime={meta.date}>
                Published on: {meta.date}
              </time>
              ~
              <time dateTime={meta.dateModified}>
                Modified on: {meta.dateModified}
              </time>
            </p>
          </div>
        </header>

        <Markdown className="px-5 prose-indigo max-w-none" style={coy}>{content}</Markdown>
      </article>
    </PageTemplate>
  );
};

export default PostTemplate;
