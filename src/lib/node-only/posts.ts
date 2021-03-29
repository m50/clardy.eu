import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { promisify } from 'util';
import { isPost, Post } from 'collections/posts/post';
import { postsDir } from '../constants';

const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);

export const getPostSlugs = async () => readdir(postsDir)
  .then((files) => files.filter((fileName) => fileName.endsWith('.md')));
export const getPostBySlug = async (slug: string): Promise<Post> => {
  const realSlug = slug.replace(/\.md$/, '');
  const fullPath = join(postsDir, `${realSlug}.md`);
  const fileContents = await readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  if (typeof data.date !== 'string') {
    data.date = data.date.toDateString();
  }
  if (typeof data.dateModified !== 'string') {
    data.dateModified = data.dateModified.toDateString();
  }
  const post = {
    slug: realSlug,
    meta: data,
    content,
  };

  if (!isPost(post)) {
    throw new Error(`post undetermined . ${JSON.stringify(post, null, 2)}`);
  }

  return post;
};
export const getAllPosts = async () => {
  const slugs = await getPostSlugs();
  const seriesPromises = slugs
    .map(async (slug) => getPostBySlug(slug));

  const posts = (await Promise.all(seriesPromises))
    .sort((series1, series2) => (new Date(series1.meta.dateModified) > new Date(series2.meta.dateModified) ? 1 : -1));

  return posts;
};
