import React from "react"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { LinkButton } from "../components/button"
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
      <LinkButton to={routes.SEARCH_NAME}>Back</LinkButton><LinkButton to={routes.ABOUT}>Home</LinkButton>
    </Layout>
  )
}

export default PersonTemplate

PersonTemplate.propTypes = {
  pageContext: PropTypes.shape({ person: PropTypes.object }).isRequired,
}
