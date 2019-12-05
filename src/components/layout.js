/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import Header from "./header"
import Footer from "./footer"
import "./layout.css"

const Layout = ({ hero = null, children }) => {
  return (
    <>
      <Header headerGap={hero === null} />
      {hero}
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 1025,
          padding: `0px 1.0875rem 1.45rem`,
          paddingTop: 0,
        }}
      >
        <main>{children}</main>
        <Footer/>
      </div>
    </>
  )
}

Layout.propTypes = {
  hero: PropTypes.node,
  children: PropTypes.node.isRequired,
}

export default Layout

export const Section = ({ children }) => (
  <section style={{ margin: `3rem 1rem` }}>
    {children}
  </section>
)
Section.propTypes = {
  children: PropTypes.node.isRequired,
}
