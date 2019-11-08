import React from 'react'
import PropTypes from 'prop-types'
import { Statistic } from 'antd'

const GenderStat = ({ gender = `` }) => {
  let registeredGenderByCSO = ``
  if (gender === `Male`) registeredGenderByCSO = `Boy`
  if (gender === `Female`) registeredGenderByCSO = `Girl`
  return (

    <Statistic
      title={`Name registered by the CSO as:`}
      value={registeredGenderByCSO}
    />

  )
}

export default GenderStat

GenderStat.propTypes = {
  gender: PropTypes.string.isRequired,
}
