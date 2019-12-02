import '../../node_modules/react-vis/dist/style.css'
import React from "react"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import SEO from "../components/seo"
import { LinkButton } from "../components/button"
import PersonInfoPageTitle from "../components/person-info/page-title"
import PersonInfoStatistics from "../components/person-info/statistics"
import BirthNameCountChart from "../components/person-info/birth-name-count-chart"
import BirthNameRankChart from "../components/person-info/birth-name-rank-chart"
import routes from '../routes'

const PersonTemplate = ({ pageContext: { person } }) => {
  return (
    <Layout>
      <SEO title={person.name} />
      <LinkButton to={routes.NAME_SEARCH}>Back</LinkButton>
      <PersonInfoPageTitle title={person.name}/>
      <PersonInfoStatistics person={person} />
      <div style={{ margin: `2rem 0` }}>
        <BirthNameCountChart birthNameCountData={person.data}/>
      </div>
      <div style={{ margin: `2rem 0` }}>
        <BirthNameRankChart birthNameRankData={person.data} />
      </div>
    </Layout>
  )
}

export default PersonTemplate

PersonTemplate.propTypes = {
  pageContext: PropTypes.shape({ person: PropTypes.object }).isRequired,
}
