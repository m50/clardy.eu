import * as React from 'react';
import Link from 'next/link';
import PageTemplate from 'templates/PageTemplate';
import Undraw from 'components/images/undraw';
import { getAllPosts } from 'lib/node-only/posts';
import { Post } from 'collections/posts/post';
import { GetStaticProps } from 'next';

interface Props {
  posts: Post[];
}

const Blog: React.FunctionComponent<Props> = ({ posts }: Props) => (
  <PageTemplate>
    <div className="mx-2 md:mx-10 mb-10">
      <section className="flex justify-between h-64 items-center">
        <Undraw name="updated" className="h-full p-5" />
        <h1 className="text-4xl bold mb-5 w-full border-b border-gray-300">Recent posts</h1>
      </section>
      <ul className="flex flex-wrap justify-start">
        {posts.map(({ meta, slug }, idx) => (
          <li className="p-2 w-full md:w-1/2 lg:w-1/3 2xl:w-1/4" key={idx}>
            <section className="border-l-2 border-indigo-600 bg-gray-200 p-5 hover:bg-gray-300 w-full">
              <Link href={`/${slug}`}>
                <a>
                  <h3 className="text-2xl bold text-indigo-600">{meta.title}</h3>
                  <ul><li className="ml-3 mt-2 text-sm">Released: {meta.date}</li></ul>
                </a>
              </Link>
            </section>
          </li>
        ))}
      </ul>
    </div>
  </PageTemplate>
);

export default Blog;

export const getStaticProps: GetStaticProps = async (): Promise<{ props: Props }> => {
  const allPosts = await getAllPosts();
  const posts = allPosts.slice(0, 20);

  return { props: { posts } };
};
