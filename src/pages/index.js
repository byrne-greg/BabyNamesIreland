import 'antd/dist/antd.css'
import React from "react"
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import { Row, Col, Card } from 'antd'
import Layout, { Section } from "../components/layout"
import SEO from "../components/seo"
import { LinkButton } from "../components/button"
import SearchPageAsComponent from "../components/search/SearchPageAsComponent"
import routes from "../routes"

export const query = graphql`
  query IndexPageQuery {
    allBirthNames {
      nodes {
        gender
        name
      }
    }
    site {
      siteMetadata {
        title
      }
    }
  }
`

const IndexPage = ({ data }) => {
  return (
    <Layout>
      <SEO title="Home" />
      {/* Hero */}
      <Section>
        <h1>{data.site.siteMetadata.title}</h1>
      </Section>
      {/* Blurb */}
      <Section>
        <p>Some descriptive (or perhaps minimalist) blurb about the purpose of this corner of the internet</p>
        <LinkButton to={routes.ABOUT}>About</LinkButton>
      </Section>
      {/* Top Stats */}
      <Section>
        <Row type="flex" justify="space-around">
          <Col>
            <Card>Top Male Names</Card>
          </Col>
          <Col>
            <Card>Top Female Names</Card>
          </Col>
        </Row>
      </Section>
      {/* Search */}
      <Section>
        <SearchPageAsComponent data={data}/>
      </Section>

      {/* <div style={{ maxWidth: `300px`, marginBottom: `1.45rem` }}>
        <Image />
      </div>
       */}
    </Layout>
  )
}

// TODO: should we be enforcing prop types for data retrieved by GraphQL?
IndexPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default IndexPage
