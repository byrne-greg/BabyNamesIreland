import React from "react"
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { LinkButton } from "../components/button"
import NameSearch from '../components/search/NameSearch'
import routes from '../routes'

export const query = graphql`
  query SearchPageQuery {
    allBirthNames {
      nodes {
        gender
        name
      }
    }
  }  
`

const SearchPage = ({ data }) => (
  <Layout>
    <SEO title="Search Baby Name" />
    <LinkButton to={routes.HOME}>Back</LinkButton>
    <NameSearch data={data} showNamesByDefault={false}/>
  </Layout>
)

// TODO: should we be enforcing prop types for data retrieved by GraphQL?
SearchPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default SearchPage
