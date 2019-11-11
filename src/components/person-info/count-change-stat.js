import React from 'react'
import PropTypes from 'prop-types'
import { Statistic, Icon } from 'antd'
import constants from "./constants"

const BirthNameCountChangeStat = ({ lastRecordedYear = null, name = null, countChange = -1, countChangeDirection = null, style = {} }) => {
  let countChangeDirectionIcon = <Icon type="minus" />
  let countChangeDirectionColor = `#A9A9A9`
  let cardInfoMessage = `Same amount of ${name}'s 🤔`
  if (countChangeDirection === constants.MOVEMENT.UP) { cardInfoMessage = `More ${name}'s in Ireland! 😎`; countChangeDirectionIcon = <Icon type="arrow-up" />; countChangeDirectionColor = `#3f8600` }
  if (countChangeDirection === constants.MOVEMENT.DOWN) { cardInfoMessage = `Not as many ${name}'s in the wild 😟`; countChangeDirectionIcon = <Icon type="arrow-down" />; countChangeDirectionColor = `#cf1322` }

  return (
    <>
      <Statistic
        title={`${countChangeDirection !== constants.MOVEMENT.NONE ? countChangeDirection === constants.MOVEMENT.UP ? `More` : `Less` : `No change in`} people born in ${lastRecordedYear}`}
        value={countChange}
        valueStyle={{ color: countChangeDirectionColor }}
        prefix={countChangeDirectionIcon}
        style={style}
      />
      <p>{cardInfoMessage}</p>
    </>
  )
}

export default BirthNameCountChangeStat

BirthNameCountChangeStat.propTypes = {
  lastRecordedYear: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  countChange: PropTypes.number.isRequired,
  countChangeDirection: PropTypes.string,
  style: PropTypes.object,
}
