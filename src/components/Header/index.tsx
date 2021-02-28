import * as React from "react";
import { graphql, StaticQuery } from "gatsby";
import { Data } from './types';
import { Header as HeaderRender } from './Header';

const Header: React.FC = () => (
  <StaticQuery
      query={graphql`
        query HeaderQuery {
          allSitePage(filter: {componentPath: {regex: "/^.*(?<!PostLayout\\.jsx)$/"}, path: {regex: "/^\\/(?!(dev-)?404).*\\/$/"}}, sort: {fields: internalComponentName, order: ASC}) {
            nodes {
              id
              path
              internalComponentName
            }
          }
        }`}
      render={(data: Data) => <HeaderRender data={data} />}
    />
);

export default Header;
