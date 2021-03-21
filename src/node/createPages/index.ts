import { GatsbyNode } from 'gatsby';
import { createPosts } from './posts';

export const createPages: GatsbyNode['createPages'] = async (params) => {
	createPosts(params);
};
