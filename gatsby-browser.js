/* eslint-disable react/prop-types */
/**
 * Implement Gatsby's Browser APIs in this file.
 *
 * See: https://www.gatsbyjs.org/docs/browser-apis/
 */

// This API allows wrapping of the root Component in Gatsby that will wrap every page with our global components.
import React from "react"
import App from "./src/components/app"

export const wrapRootElement = ({ element }) => {
  return <App>{element}</App>
}
