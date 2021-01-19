import React from "react";
import { graphql, StaticQuery } from "gatsby"
import { ReactComponent as Logo } from '../images/icon.svg';

interface Props { }

interface Data { allSitePage: AllSitePage }

interface AllSitePage { nodes: Node[] }

interface Node {
  id: string
  path: string
  internalComponentName: string
}

const Header: React.FunctionComponent<Props> = (_props: Props) => (
  <StaticQuery
      query={graphql`
        query HeaderQuery {
          allSitePage(filter: {path: {nin: ["/", "/404/", "/dev-404-page/", "/404.html"]}}) {
            nodes {
              id
              path
              internalComponentName
            }
          }
        }
      `}
      render={(data: Data) => (
        <>
          <header className="h-16 print:hidden flex items-center content-center justify-between bg-indigo-500 py-3 text-white fixed right-0 left-0 top-0 md:relative">
            <div></div>
            <a key="large" className="hidden sm:inline-block uppercase text-xl tracking-wider" rel="author" href="/">
              <Logo className="w-12 h-12 inline" />&nbsp;Marisa Clardy
          </a>
            <nav>
              {data.allSitePage.nodes.map(node => {
                return <a className="uppercase text-lg flex-grow mx-3 hover:text-indigo-800" href={node.path}>{
                  node.internalComponentName
                    .replace('Component', '')
                    .replace(/([A-Z])/g, ' $1')
                }</a>
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
