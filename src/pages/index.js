import 'antd/dist/antd.css'
import React from "react"
import PropTypes from 'prop-types'
import { graphql } from "gatsby"
import { Row, Col } from 'antd'
import Layout, { Section } from "../components/layout"
import SEO from "../components/seo"
import { LinkButton } from "../components/button"
import TopNameStatCard from "../components/index/top-name-card"
import NameSearch from "../components/search/NameSearch"
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
        {/* <h1>{data.site.siteMetadata.title}</h1> */}
        <h2>Search for the popularity of names in Ireland</h2>
      </Section>
      {/* Blurb */}
      <Section>
        {/* Some descriptive (or perhaps minimalist) blurb about the purpose of this corner of the internet */}
        <p>Every year, the Irish Central Statistics Office compiles data on the registered birth names within the Republic of Ireland including their gender nominative, their rank within that nominative, and the total registered with that name.</p>
        <p>This data is recorded as far back as 1998. Data on names that are included are where the observation of record is not missing and doesn&apos;t fall under a limit of discretion/uncertainty </p>
        <p>Use the search feature below to discover how popular any given first name is in Ireland</p>
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
        <NameSearch data={data}/>
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
