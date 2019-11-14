import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import SEO from "../components/seo"
import PersonInfoPageTitle from "../components/person-info/page-title"
import PersonInfoStatistics from "../components/person-info/statistics"
import BirthNameCountChart from "../components/person-info/birth-name-count-chart"
import BirthNameRankChart from "../components/person-info/birth-name-rank-chart"
import '../../node_modules/react-vis/dist/style.css'
import routes from '../routes'

const PersonTemplate = ({ pageContext: { person } }) => {
  return (
    <Layout>
      <SEO title={person.name} />
      <PersonInfoPageTitle title={person.name}/>
      <PersonInfoStatistics person={person} />
      <hr/>
      <div>
        <BirthNameCountChart birthNameCountData={person.data}/>
        <BirthNameRankChart birthNameRankData={person.data} />
      </div>
      <Link to={routes.SEARCH_NAME}>Back</Link>{` `}<Link to={routes.ABOUT}>Home</Link>
    </Layout>
  )
}

export default PersonTemplate

PersonTemplate.propTypes = {
  pageContext: PropTypes.shape({ person: PropTypes.object }).isRequired,
}
