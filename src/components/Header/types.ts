export interface Data { allSitePage: AllSitePage }
export interface AllSitePage { nodes: Node[] }
export interface Node {
  id: string
  path: string
  internalComponentName: string
}
