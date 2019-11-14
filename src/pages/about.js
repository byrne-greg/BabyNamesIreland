import React from "react"
import { Link } from "gatsby"
import Layout from "../components/layout"
import SEO from "../components/seo"
import routes from "../routes"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <h1>About This</h1>
    <h2>The Site</h2>
    <p>Some blurb on the site&#39;s history and tech</p>
    <h2>The Author</h2>
    <p>Some blurb on the author</p>
    <Link to={routes.HOME}>Home</Link>
    <Link to={routes.SEARCH_NAME}>Start Searching</Link>
  </Layout>
)

export default AboutPage
