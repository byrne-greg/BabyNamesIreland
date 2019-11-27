import React from "react"
import { LinkButton } from "../components/button"
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
    <LinkButton to={routes.HOME}>Home</LinkButton>
    <LinkButton to={routes.NAME_SEARCH}>Start Searching</LinkButton>
  </Layout>
)

export default AboutPage
