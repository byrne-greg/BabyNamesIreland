import React from 'react'
import PropTypes from 'prop-types'
import { Statistic } from 'antd'

const BirthNameCountStat = ({ name = null, lastRecordedYear = null, count = -1, style = {} }) => {
  return (

    <Statistic
      title={`${name}'s in ${lastRecordedYear}`}
      value={count}
      style={style}
    />

  )
}

export default BirthNameCountStat

BirthNameCountStat.propTypes = {
  lastRecordedYear: PropTypes.string.isRequired,
  count: PropTypes.number.isRequired,
  name: PropTypes.string.isRequired,
  style: PropTypes.object,
}
