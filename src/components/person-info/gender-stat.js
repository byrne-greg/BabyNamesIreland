import React from 'react'
import PropTypes from 'prop-types'
import { Statistic } from 'antd'

const GenderStat = ({ gender = null }) => {
  return (
    <Statistic
      title={`Name registered by the CSO as:`}
      value={gender === `Male` ? `Boy` : `Girl`}
    />

  )
}

export default GenderStat

GenderStat.propTypes = {
  gender: PropTypes.string.isRequired,
}
