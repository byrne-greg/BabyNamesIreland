import React from 'react'
import PropTypes from 'prop-types'
import BirthNameRankStat from "./rank-stat"
import BirthNameRankChangeStat from "./rank-change-stat"
import constants from "./constants"

const PersonInfoStatistics = ({ person }) => {
  const personData = person.data
  const latestRecord = getLatestRecord(personData)
  const latestRecordedYear = latestRecord.year
  const latestRecordedRank = latestRecord.rank
  const rankingChange = getRankingChangeFromPreviousRecord(personData)
  const secondLatestRecordYear = getRecordBeforeLatest(personData).year

  return (
    <>
      <BirthNameRankStat lastRecordedYear={latestRecordedYear} rank={latestRecordedRank} gender={person.gender} movementArrow={rankingChange.direction}/>
      <BirthNameRankChangeStat lastRecordedYear={secondLatestRecordYear} rankChange={rankingChange.value} rankChangeDirection={rankingChange.direction}/>
    </>
  )
}

export default PersonInfoStatistics

PersonInfoStatistics.propTypes = {
  person: PropTypes.shape({ name: PropTypes.string.isRequired, gender: PropTypes.string.isRequired, data: PropTypes.arrayOf(PropTypes.shape({ year: PropTypes.string })).isRequired }).isRequired,
}

function sortPersonDataByYear (isAscending, personData) {
  return personData.sort((a, b) => {
    if (a.year < b.year) { return isAscending ? -1 : 1 }
    if (a.year > b.year) { return isAscending ? 1 : -1 }
    return 0
  })
}

function getLatestRecord (personData) {
  return sortPersonDataByYear(false, personData)[0]
}

function getRecordBeforeLatest (personData) {
  return sortPersonDataByYear(false, personData)[1]
}

function getRankingChangeFromPreviousRecord (personData) {
  const sortedRecords = sortPersonDataByYear(false, personData)
  const rankingChangeRaw = sortedRecords[0].rank - sortedRecords[1].rank
  let rankingMovement = constants.MOVEMENT.NONE
  if (rankingChangeRaw < 0) rankingMovement = constants.MOVEMENT.DOWN
  if (rankingChangeRaw > 0) rankingMovement = constants.MOVEMENT.UP
  return { value: Math.abs(rankingChangeRaw), direction: rankingMovement }
}
