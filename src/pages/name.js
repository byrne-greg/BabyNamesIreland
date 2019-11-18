import React from "react"
import PropTypes from 'prop-types'
import { graphql } from 'gatsby'
import Layout from "../components/layout"
import SearchPageAsComponent from '../components/search/SearchPageAsComponent'

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

const SearchPage = ({ data }) => (<Layout><SearchPageAsComponent data={data}/></Layout>)

// TODO: should we be enforcing prop types for data retrieved by GraphQL?
SearchPage.propTypes = {
  data: PropTypes.object.isRequired,
}

export default SearchPage
