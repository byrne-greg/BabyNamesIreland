import 'antd/dist/antd.css'
import React from "react"
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import { Row, Col } from 'antd'
import Layout, { Section } from "../components/layout"
import SEO from "../components/seo"
import { LinkButton } from "../components/button"
import TopNameStatCard from "../components/index/top-name-card"
import SearchNameComponent from "../components/search/SearchNameComponent"
import routes from "../routes"
import enums from "../enums"

export const query = graphql`
  query IndexPageQuery {
    allBirthNames {
      nodes {
        gender
        name
        data {
          rank
          total
          year
        }
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
            <TopNameStatCard nameData={data.allBirthNames.nodes} genderEnum={enums.GENDER.MALE} cardStyle={{ margin: `1rem 0.5rem` }}/>
          </Col>
          <Col>
            <TopNameStatCard nameData={data.allBirthNames.nodes} genderEnum={enums.GENDER.FEMALE} cardStyle={{ margin: `1rem 0.5rem` }}/>
          </Col>
        </Row>
      </Section>
      {/* Search */}
      <Section>
        <SearchNameComponent data={data}/>
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
