export interface Post {
  slug: string;
  meta: {
    title: string;
    subtitle?: string;
    image: string;
    date: string;
    dateModified: string;
  };
  content: string;
}

export const isPost = (obj: any): obj is Post => typeof obj.content === 'string' && obj.meta
  && typeof obj.meta.title === 'string';
