/* eslint-disable indent */
import React from 'react';
import { ReactComponent as RecentWork } from './recent_work.svg';
import { ReactComponent as Contribute } from './proud_coder.svg';
import { ReactComponent as Completing } from './completing.svg';
import { ReactComponent as Outside } from './imagination.svg';
import { ReactComponent as Updated } from './updated.svg';

type Name =
	| 'work-as'
	| 'completing'
	| 'recent_work'
	| 'recent-work'
	| 'imagination'
	| 'outside'
	| 'proud_coder'
	| 'proud-coder'
	| 'contribute'
	| 'updated';

interface Props {
	name: Name;
	className: string;
}

const Undraw: React.FC<Props> = ({ name, className }) => {
	switch (name) {
		case 'work-as':
		case 'completing':
			return <Completing className={className} />;
		case 'recent_work':
		case 'recent-work':
				return <RecentWork className={className} />;
		case 'imagination':
		case 'outside':
			return <Outside className={className} />;
		case 'proud_coder':
		case 'proud-coder':
		case 'contribute':
			return <Contribute className={className} />;
		case 'updated':
			return <Updated className={className} />;
		default:
			throw new Error(`Unknown undraw name ${name}.`);
	}
};

export default Undraw;
