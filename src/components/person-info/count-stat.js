import React from 'react'
import PropTypes from 'prop-types'
import { Statistic } from 'antd'

const BirthNameCountStat = ({ name = null, lastRecordedYear = null, count = -1 }) => {
  return (

    <Statistic
      title={`People born as ${name} in ${lastRecordedYear}`}
      value={count}
    />

  )
}

export default BirthNameCountStat

BirthNameCountStat.propTypes = {
  lastRecordedYear: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
}
