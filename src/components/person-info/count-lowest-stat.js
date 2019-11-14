import React from 'react'
import PropTypes from 'prop-types'
import { Statistic } from 'antd'

const BirthNameLowestCountStat = ({ name = null, data = [], style = {} }) => {
  const lowestCountRecord = data.reduce((acc, currentRecord) => currentRecord.total < acc.total ? currentRecord : acc)

  return (
    <Statistic
      title={`Year with least ${name}'s`}
      value={`${lowestCountRecord.total} in ${lowestCountRecord.year}`}
      style={style}
    />

  )
}

export default BirthNameLowestCountStat

BirthNameLowestCountStat.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ year: PropTypes.string })).isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
}
