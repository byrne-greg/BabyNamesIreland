import React from "react"
import Layout from "../components/layout"
import SEO from "../components/seo"

const NotFoundPage = () => (
  <Layout>
    <SEO title="404: Not found" />
    <h1>Page not found</h1>
    <p>You just clicked a route that doesn&#39;t exist... the sadness.</p>
  </Layout>
)

export default NotFoundPage
