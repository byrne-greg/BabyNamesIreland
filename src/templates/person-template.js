import React from "react";
import { Link } from "gatsby"
import 'antd/dist/antd.css';
import Layout from "../components/layout"
import SEO from "../components/seo"

export default ({ pageContext: { person } }) => (
    <Layout>
    <SEO title={person.name} />
    <h1>{person.name}</h1>
    <h2>{person.gender}</h2>
    <p>Some descriptive (or perhaps minimalist) blurb about the purpose of this corner of the internet</p>
    <Link to="/search">Back</Link>{` `}
    <Link to="/about">Home</Link>
  </Layout>
)