/**
 * Layout component that queries for data
 * with Gatsby's useStaticQuery component
 *
 * See: https://www.gatsbyjs.org/docs/use-static-query/
 */

import React from "react"
import PropTypes from "prop-types"
import { useStaticQuery, graphql } from "gatsby"
import Header from "./header"
import Footer from "./footer"
import "./layout.css"

const Layout = ({ hero = null, children }) => {
  const data = useStaticQuery(graphql`
    query SiteTitleQuery {
      site {
        siteMetadata {
          title
        }
      }
    }
  `)

  return (
    <>
      <Header headerGap={hero === null} siteTitle={data.site.siteMetadata.title} />
      {hero}
      <div
        style={{
          margin: `0 auto`,
          maxWidth: 1025,
          padding: 0,
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
