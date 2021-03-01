import CMS from 'netlify-cms-app';
import PostLayout from './templates/PostLayout';

CMS.init();
CMS.registerPreviewTemplate('posts', PostLayout);
