import React from 'react';
import { GetStaticPaths, GetStaticProps } from 'next';
import { useRouter } from 'next/router';
import ErrorPage from 'next/error';
import PostTemplate from 'templates/PostTemplate';
import { Post } from 'collections/posts/post';
import { getAllPosts, getPostBySlug } from 'lib/node-only/posts';

const Post: React.FC<Post> = (props) => {
  const router = useRouter();
  if (!router.isFallback && !props?.slug) {
    return <ErrorPage statusCode={404} />;
  }

  return <PostTemplate {...props} />;
};

export const getStaticProps: GetStaticProps = async ({ params }): Promise<{ props: Post }> => {
  const props = await getPostBySlug(params?.slug as string);

  return { props };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const allPosts = await getAllPosts();

  return {
    paths: allPosts.map(({ slug }) => ({ params: { slug } })),
    fallback: false,
  };
};
