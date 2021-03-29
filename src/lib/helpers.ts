import slugify from 'slugify';

export const slug = (str: string) => slugify(str, { lower: true, strict: true, locale: 'en' });
export const isClientSide = (): boolean => typeof window !== 'undefined';
export const isServerSide = (): boolean => !isClientSide;
export const isProduction = (): boolean => process.env.CONTEXT === 'production';
export const isDeployed = (): boolean => !!process.env.NETLIFY;
