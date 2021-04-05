import * as React from 'react';
import tw from 'tailwind-styled-components';
import Github from './Github';
import Gitlab from './Gitlab';
import Instagram from './Instagram';
import Twitter from './Twitter';
import DevTo from './DevTo';

// eslint-disable-next-line no-undef
const socials: JSX.Element[] = [
  <Twitter />,
  <Github />,
  <Gitlab />,
  <Instagram />,
  <DevTo />,
];

const Container = tw.ul`
  flex-grow flex justify-between py-3 content-center items-center
  print:hidden
`;

const Item = tw.li`
  list-none !my-0 flex justify-center items-center
`;

interface Props {
  className?: string;
}

const Social: React.FC<Props> = ({ className }) => (
  <Container className={className}>
    {socials.map((S, idx: number) => <Item key={idx}>{S}</Item>)}
  </Container>
);

export default Social;
