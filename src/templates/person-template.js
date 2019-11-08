import React from "react"
import { Link } from "gatsby"
import PropTypes from "prop-types"
import Layout from "../components/layout"
import SEO from "../components/seo"
import BirthNameCountChart from "../components/birth-name-count-chart"
import BirthNameRankChart from "../components/birth-name-rank-chart"
import '../../node_modules/react-vis/dist/style.css'

const PersonTemplate = ({ pageContext: { person } }) => {
  const currentYear = new Date().getFullYear()
  const lastRecordedYear = currentYear - 1
  const lastRecordedRank = person.data.filter(dataObj => `${dataObj.year}` === lastRecordedYear)[0].rank
  const secondLastRecordedRank = person.data.filter(dataObj => `${dataObj.year}` === (lastRecordedYear - 1))[0].rank
  const rankingChange = lastRecordedRank - secondLastRecordedRank

  const topTenRanking = person.data.filter(dataObj => dataObj.rank > 0 && dataObj.rank <= 10).sort((a, b) => {
    if (a.year < b.year) { return 1 }
    if (a.year > b.year) { return -1 }
    return 0
  })

  function getRankingSuffix (num) {
    if (num % 10 === 1 && num !== 11) { return `st` }
    if (num % 10 === 2 && num !== 12) { return `nd` }
    if (num % 10 === 3 && num !== 13) { return `rd` }
    return `th`
  }

  return (
    <Layout>
      <SEO title={person.name} />
      <h1>{person.name}</h1>
      <h2>{`CSO Registered as a ${person.gender} name`}</h2>
      <h2>{`Ranked ${lastRecordedRank}${getRankingSuffix(lastRecordedRank)} of popular ${person.gender.toLowerCase()} names of ${lastRecordedYear}`}</h2>
      <h2>{`Moved ${rankingChange === 0 ? `no places` : `${(rankingChange < 0 ? `down` : `up`)} ${Math.abs(rankingChange)} place in the ${person.gender.toLowerCase()} popular name rankings`}`}</h2>
      {topTenRanking.length > 0 && (<div><p>{`Popular ${person.gender} Name`}</p><ul>{topTenRanking.map(topTenDataObj => <li key={`${topTenDataObj.year}-${topTenDataObj.rank}`}>{`Rank ${topTenDataObj.rank} in ${topTenDataObj.year}`}</li>)}</ul></div>)}
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
  pageContext: PropTypes.shapeOf({ person: PropTypes.object }).isRequired,
}
