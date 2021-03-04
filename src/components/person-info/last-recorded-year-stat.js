import React from 'react'
import PropTypes from 'prop-types'
import { Statistic } from 'antd'

const LastRecordedYearStat = ({ year = null, style = {} }) => {
  return (
    <Statistic
      title={`Last recorded year of CSO data:`}
      value={year}
      groupSeparator={``}
      style={style}
    />

  )
}

export default LastRecordedYearStat

LastRecordedYearStat.propTypes = {
  year: PropTypes.string.isRequired,
  style: PropTypes.object,
}
