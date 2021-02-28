import React from "react";
import { graphql, StaticQuery, Link } from "gatsby"
import { ReactComponent as Logo } from '../images/icon.svg';

interface Data { allSitePage: AllSitePage }
interface AllSitePage { nodes: Node[] }
interface Node {
  id: string
  path: string
  internalComponentName: string
}

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
      render={(data: Data) => (
        <>
          <header className="h-16 print:hidden flex items-center content-center justify-between bg-indigo-500 py-3 text-white fixed right-0 left-0 top-0 md:relative">
            <div></div>
            <Link key="large" className="hidden sm:inline-block uppercase text-xl tracking-wider" rel="author" to="/">
              <Logo className="w-12 h-12 inline" />&nbsp;Marisa Clardy
            </Link>
            <nav>
              {data.allSitePage.nodes.map(node => {
                return <Link key={node.path} className="uppercase text-lg flex-grow mx-3 hover:text-indigo-800" to={node.path}>{
                  node.internalComponentName
                    .replace('Component', '')
                    .replace(/([A-Z])/g, ' $1')
                }</Link>
              })}
            </nav>
            <div></div>
          </header>
          <div className="md:hidden">&nbsp;</div>
        </>
      )}
    />
);

export default Header;
