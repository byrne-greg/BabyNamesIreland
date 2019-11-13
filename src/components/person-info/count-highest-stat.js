import React from 'react'
import PropTypes from 'prop-types'
import { Statistic } from 'antd'

const BirthNameHighestCountStat = ({ name = null, data = [], style = {} }) => {
  const highestCountRecord = data.reduce((acc, currentRecord) => currentRecord.total > acc.total ? currentRecord : acc)

  return (
    <Statistic
      title={`Year with most amount of ${name}'s`}
      value={`${highestCountRecord.year} with ${highestCountRecord.total} registers`}
      style={style}
    />

  )
}

export default BirthNameHighestCountStat

BirthNameHighestCountStat.propTypes = {
  data: PropTypes.arrayOf(PropTypes.shape({ year: PropTypes.string })).isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
}
