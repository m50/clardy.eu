import * as React from "react"
import { Link } from "gatsby"

const NotFoundPage = () => {
  return (
    <div>
      <p>404 Not Found</p>
      <p><Link to="/" className="text-indigo-400 hover:text-indigo-700">Go home</Link></p>
    </div>
  );
}

export default NotFoundPage
