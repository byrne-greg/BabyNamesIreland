import React from 'react'
import PropTypes from 'prop-types'
import { Statistic } from 'antd'
import utils from './utils'

const BirthNameLowestRankStat = ({ name = null, data = [], style = {} }) => {
  const lowestRankRecord = data.reduce((acc, currentRecord) => currentRecord.rank > acc.rank ? currentRecord : acc)

  return (
    <Statistic
      title={`Least popular year for ${name}`}
      value={`${lowestRankRecord.rank}${utils.getRankingSuffix(lowestRankRecord.rank)} in ${lowestRankRecord.year}`}
      style={style}
    />

  )
}

export default BirthNameLowestRankStat

BirthNameLowestRankStat.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ year: PropTypes.string })).isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
}
