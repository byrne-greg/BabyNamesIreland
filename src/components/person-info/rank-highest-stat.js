import React from 'react'
import PropTypes from 'prop-types'
import { Statistic } from 'antd'
import utils from './utils'

const BirthNameHighestRankStat = ({ name = null, data = [], style = {} }) => {
  const highestCountRecord = data.reduce((acc, currentRecord) => currentRecord.rank < acc.rank ? currentRecord : acc)

  return (
    <Statistic
      title={`Most popular year for ${name}`}
      value={`${highestCountRecord.rank}${utils.getRankingSuffix(highestCountRecord.rank)} in ${highestCountRecord.year}`}
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
