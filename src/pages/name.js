import React from "react"
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import SEO from "../components/seo"
import { LinkButton } from "../components/button"
import SearchNameComponent from '../components/search/SearchNameComponent'
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
    <SEO title="Search for Irish baby name" />
    <LinkButton to={routes.HOME}>Back</LinkButton><LinkButton to={routes.ABOUT}>About</LinkButton>
    <SearchNameComponent data={data}/>
  </Layout>
)

// TODO: should we be enforcing prop types for data retrieved by GraphQL?
SearchPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default SearchPage
