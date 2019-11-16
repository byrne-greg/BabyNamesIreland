import 'antd/dist/antd.css'
import React from "react"
import { graphql, navigate } from "gatsby"
import { Row, Col, Card, Button } from 'antd'
import Layout from "../components/layout"
import Image from "../components/image"
import SEO from "../components/seo"
import { LinkButton } from "../components/button"
import routes from "../routes"

export const query = graphql`
  query IndexPageQuery {
    allBirthNames {
      nodes {
        gender
        name
      }
    }
  }  
`

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      {/* Hero */}
      <h1>The Popular Names of Ireland</h1>
      {/* Blurb */}
      <p>Some descriptive (or perhaps minimalist) blurb about the purpose of this corner of the internet</p>
      <LinkButton to={routes.SEARCH_NAME}>Start Searching</LinkButton>
      <LinkButton to={routes.ABOUT}>About</LinkButton>
      {/* Top Stats */}
      <Row type="flex" justify="space-around">
        <Col>
          <Card>Top Male Names</Card>
        </Col>
        <Col>
          <Card>Top Female Names</Card>
        </Col>
      </Row>
      {/* Search */}



      {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
       */}
    </Layout>
  )
}

export default IndexPage
