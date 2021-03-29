import fs from 'fs';
import { join } from 'path';
import matter from 'gray-matter';
import { promisify } from 'util';
import { isPost, Post } from 'collections/posts/post';
import { postsDir } from '../constants';

const readFile = promisify(fs.readFile);
const readdir = promisify(fs.readdir);

let postCache: Post[] = [];
export const getPostSlugs = async () => readdir(postsDir);
export const getPostBySlug = async (slug: string): Promise<Post> => {
  const cacheIndex = postCache.findIndex((s) => s.slug === slug);
  if (cacheIndex >= 0) {
    return postCache[cacheIndex];
  }

  const realSlug = slug.replace(/\.json$/, '');
  const fullPath = join(postsDir, slug);
  const fileContents = await readFile(fullPath, 'utf8');
  const { data, content } = matter(fileContents);
  const post = {
    slug: realSlug,
    meta: data,
    content,
  };

  if (!isPost(data)) {
    throw new Error(`post undetermined . ${JSON.stringify(post, null, 2)}`);
  }

  postCache.push(data);

  return data;
};
export const getAllPosts = async () => {
  if (postCache.length >= (await getPostSlugs()).length) {
    return postCache;
  }
  const slugs = await getPostSlugs();
  postCache = (await Promise.all(
    slugs.map(async (slug) => getPostBySlug(slug)),
  )).filter((c) => c !== null) as Post[];

  return postCache;
};
