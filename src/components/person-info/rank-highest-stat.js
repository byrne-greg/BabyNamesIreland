import React from 'react'
import PropTypes from 'prop-types'
import { Statistic } from 'antd'
import { getRankingSuffix } from '../../utils'

const BirthNameHighestRankStat = ({ name = null, data = [], style = {} }) => {
  const highestRankRecord = data.reduce((acc, currentRecord) => currentRecord.rank < acc.rank ? currentRecord : acc)

  return (
    <Statistic
      title={`Most popular year for ${name}`}
      value={`${highestRankRecord.rank}${getRankingSuffix(highestRankRecord.rank)} in ${highestRankRecord.year}`}
      style={style}
    />

  )
}

export default BirthNameHighestRankStat

BirthNameHighestRankStat.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ year: PropTypes.string })).isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
}
