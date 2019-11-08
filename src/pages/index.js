import React from "react"
import { Link } from "gatsby"
import 'antd/dist/antd.css'
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"

const IndexPage = () => (
  <Layout>
    <SEO title="Home" />
    <h1>The Popular Names of Ireland</h1>
    <p>Some descriptive (or perhaps minimalist) blurb about the purpose of this corner of the internet</p>
    <Link to="/search">Start Searching</Link>{` `}
    <Link to="/about">About</Link>
    <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
      <Image />
    </div>
    <hr/>

  </Layout>
)

export default IndexPage
