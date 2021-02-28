import * as React from "react";
import { Link } from "gatsby";
import { Node } from "./types";

interface Props { node: Node }
const HeaderLink: React.FC<Props> = ({node}) => (
  <Link className="uppercase text-lg flex-grow mx-3 hover:text-indigo-800" to={node.path}>{
    node.internalComponentName
      .replace('Component', '')
      .replace(/([A-Z])/g, ' $1')
  }</Link>
);

export default HeaderLink;
