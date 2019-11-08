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

const PersonTemplate = ({ pageContext: { person } }) => {
  const notSorted = person.data
  const sortedD = person.data.sort((a, b) => {
    const aYear = Number(a.year)
    const bYear = Number(b.year)
    console.log(`${aYear} < ${bYear}`, aYear < bYear)
    if (aYear < bYear) { return -1 }
    if (aYear > bYear) { return 1 }
    return 0
  })
  console.log(`person template-notsorted`, notSorted)
  console.log(`person template-sorted`, sortedD)

  // const topTenRanking = person.data.filter(dataObj => dataObj.rank > 0 && dataObj.rank <= 10).sort((a, b) => {
  //   if (a.year < b.year) { return 1 }
  //   if (a.year > b.year) { return -1 }
  //   return 0
  // })

  // function getRankingSuffix (num) {
  //   if (num % 10 === 1 && num !== 11) { return `st` }
  //   if (num % 10 === 2 && num !== 12) { return `nd` }
  //   if (num % 10 === 3 && num !== 13) { return `rd` }
  //   return `th`
  // }

  return (
    <Layout>
      <SEO title={person.name} />
      <PersonInfoPageTitle title={person.name}/>
      <h2>{`CSO Registered as a ${person.gender} name`}</h2>
      <PersonInfoStatistics person={person} />
      <hr/>
      <BirthNameCountChart birthNameCountData={person.data}/>
      <hr/>
      <BirthNameRankChart birthNameRankData={person.data} />
      <hr/>
      <Link to="/search">Back</Link>{` `}<Link to="/about">Home</Link>
    </Layout>
  )
}

export default PersonTemplate

PersonTemplate.propTypes = {
  pageContext: PropTypes.shape({ person: PropTypes.object }).isRequired,
}
