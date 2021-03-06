import React from 'react'
import PropTypes from 'prop-types'
import { Row, Col, Card } from 'antd'
import BirthNameRankStat from "./rank-stat"
import BirthNameRankChangeStat from "./rank-change-stat"
import BirthNameHighestRankStat from './rank-highest-stat'
import BirthNameLowestRankStat from './rank-lowest-stat'
import BirthNameCountStat from "./count-stat"
import BirthNameCountChangeStat from "./count-change-stat"
import BirthNameHighestCountStat from './count-highest-stat'
import BirthNameLowestCountStat from './count-lowest-stat'
import GenderStat from './gender-stat'
import LastRecordedYearStat from './last-recorded-year-stat'
import enums from "../../enums"

const PersonInfoStatistics = ({ person }) => {
  const personData = person.data
  const latestRecord = getLatestRecord(personData)
  const latestRecordedYear = latestRecord.year
  const latestRecordedRank = latestRecord.rank
  const rankingChange = getRankingChangeFromPreviousRecord(personData, person)
  const secondLatestRecordYear = getPreviousRecordedYear(personData)
  const countChange = getCountChangeFromPreviousRecord(personData)

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
        <Col>
          <StatCard><GenderStat gender={person.gender}/></StatCard>
        </Col>
        <Col>
          <StatCard><LastRecordedYearStat year={latestRecordedYear}/></StatCard>
        </Col>
      </Row>
      <Row type='flex' justify="space-between" align="top">
        <Col >
          <StatCard>
            <BirthNameCountStat name={person.name} lastRecordedYear={latestRecordedYear} count={latestRecord.total}/>
          </StatCard>
        </Col>
        {secondLatestRecordYear && (
          <Col>
            <StatCard>
              <BirthNameCountChangeStat name={person.name} recordedYear={secondLatestRecordYear} countChange={countChange.value} countChangeDirection={countChange.direction} />
            </StatCard>
          </Col>
        )}
        <Col>
          <StatCard>
            <BirthNameHighestCountStat name={person.name} data={person.data} />
          </StatCard>
        </Col>
        <Col>
          <StatCard>
            <BirthNameLowestCountStat name={person.name} data={person.data}/>
          </StatCard>
        </Col>
      </Row>
      <Row type='flex' justify="space-between" align="top">
        <Col >
          <StatCard>
            <BirthNameRankStat lastRecordedYear={latestRecordedYear} rank={latestRecordedRank} gender={person.gender} movementArrow={rankingChange.direction}/>
          </StatCard>
        </Col>
        {secondLatestRecordYear && (
          <Col>
            <StatCard>
              <BirthNameRankChangeStat recordedYear={secondLatestRecordYear} rankChange={rankingChange.value} rankChangeDirection={rankingChange.direction}/>
            </StatCard>
          </Col>)}
        <Col>
          <StatCard>
            <BirthNameHighestRankStat name={person.name} data={person.data} />
          </StatCard>
        </Col>
        <Col>
          <StatCard>
            <BirthNameLowestRankStat name={person.name} data={person.data} />
          </StatCard>
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

function getPreviousRecordedYear (personData) {
  const sortedData = sortPersonDataByYear(personData)
  if (sortedData.length > 1) {
    return sortedData[1].year
  } else {
    return null
  }
}

function getRankingChangeFromPreviousRecord (personData, person) {
  let rankingMovement = enums.MOVEMENT.NONE
  if (personData.length > 1) {
    const sortedRecords = sortPersonDataByYear(personData)
    const rankingChangeRaw = sortedRecords[0].rank - sortedRecords[1].rank
    if (rankingChangeRaw < 0) rankingMovement = enums.MOVEMENT.UP
    if (rankingChangeRaw > 0) rankingMovement = enums.MOVEMENT.DOWN
    return { value: Math.abs(rankingChangeRaw), direction: rankingMovement }
  } else {
    return { value: 0, direction: rankingMovement }
  }
}

function getCountChangeFromPreviousRecord (personData) {
  let countMovement = enums.MOVEMENT.NONE
  if (personData.length > 1) {
    const sortedRecords = sortPersonDataByYear(personData)
    const countChangeRaw = sortedRecords[0].total - sortedRecords[1].total
    if (countChangeRaw < 0) countMovement = enums.MOVEMENT.DOWN
    if (countChangeRaw > 0) countMovement = enums.MOVEMENT.UP
    return { value: Math.abs(countChangeRaw), direction: countMovement }
  } else {
    return { value: 0, direction: countMovement }
  }
}
