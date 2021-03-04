/* eslint-disable react/prop-types */
/**
 * Implement Gatsby's SSR (Server Side Rendering) APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/ssr-apis/
 */

import React from "react"
import App from "./src/components/app"

export const wrapRootElement = ({ element }) => {
  return <App>{element}</App>
}
