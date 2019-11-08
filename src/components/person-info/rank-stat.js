import React from 'react'
import PropTypes from 'prop-types'
import { Card, Statistic } from 'antd'

const BirthNameRankStat = ({ lastRecordedYear = new Date().getFullYear(), rank = 0, gender = `General` }) => {
  return (
    <Card>
      <Statistic
        title={`${gender} name popularity in ${lastRecordedYear}`}
        value={rank}
        suffix={getRankingSuffix(rank)}
      />
    </Card>
  )
}

function getRankingSuffix (num) {
  if (num % 10 === 1 && num !== 11) { return `st` }
  if (num % 10 === 2 && num !== 12) { return `nd` }
  if (num % 10 === 3 && num !== 13) { return `rd` }
  return `th`
}

export default BirthNameRankStat

BirthNameRankStat.propTypes = {
  lastRecordedYear: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  gender: PropTypes.string.isRequired,
  movementArrow: PropTypes.string,
}
