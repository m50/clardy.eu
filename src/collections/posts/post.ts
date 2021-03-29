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

export const isPost = (obj: any): obj is Post => typeof obj.content === 'string'
  && typeof obj.meta?.title === 'string' && typeof obj.slug === 'string';
