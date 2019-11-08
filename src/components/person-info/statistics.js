import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card } from 'antd'
import BirthNameRankStat from "./rank-stat"
import BirthNameRankChangeStat from "./rank-change-stat"
import BirthNameCountStat from "./count-stat"
import GenderStat from './gender-stat'
import constants from "./constants"

const PersonInfoStatistics = ({ person }) => {
  const personData = person.data
  const latestRecord = getLatestRecord(personData)
  const latestRecordedYear = latestRecord.year
  const latestRecordedRank = latestRecord.rank
  const rankingChange = getRankingChangeFromPreviousRecord(personData)
  const secondLatestRecordYear = getRecordBeforeLatest(personData).year

  const StatCard = ({ children }) => (
    <Card bordered={false}>
      {children}
    </Card>
  )
  StatCard.propTypes = {
    children: PropTypes.node,
  }

  return (
    <>
      <Row type='flex' justify="space-between" align="top">
        <Col >
          <StatCard><GenderStat gender={person.gender}/></StatCard>
        </Col>
        <Col >
          <StatCard><BirthNameCountStat name={person.name} lastRecordedYear={latestRecordedYear} count={latestRecord.total}/></StatCard>
        </Col>
        <Col >
          <StatCard><BirthNameRankStat lastRecordedYear={latestRecordedYear} rank={latestRecordedRank} gender={person.gender} movementArrow={rankingChange.direction}/></StatCard>
        </Col>
        <Col >
          <StatCard><BirthNameRankChangeStat lastRecordedYear={secondLatestRecordYear} rankChange={rankingChange.value} rankChangeDirection={rankingChange.direction}/></StatCard>
        </Col>
      </Row>
    </>
  )
}

export default PersonInfoStatistics

PersonInfoStatistics.propTypes = {
  person: PropTypes.shape({ name: PropTypes.string.isRequired, gender: PropTypes.string.isRequired, data: PropTypes.arrayOf(PropTypes.shape({ year: PropTypes.string })).isRequired }).isRequired,
}

function sortPersonDataByYear (personData) {
  return personData.sort((a, b) => {
    return Number(b.year) - Number(a.year)
  })
}

function getLatestRecord (personData) {
  return sortPersonDataByYear(personData)[0]
}

function getRecordBeforeLatest (personData) {
  return sortPersonDataByYear(personData)[1]
}

function getRankingChangeFromPreviousRecord (personData) {
  const sortedRecords = sortPersonDataByYear(personData)
  const rankingChangeRaw = sortedRecords[0].rank - sortedRecords[1].rank
  let rankingMovement = constants.MOVEMENT.NONE
  if (rankingChangeRaw < 0) rankingMovement = constants.MOVEMENT.UP
  if (rankingChangeRaw > 0) rankingMovement = constants.MOVEMENT.DOWN
  return { value: Math.abs(rankingChangeRaw), direction: rankingMovement }
}
