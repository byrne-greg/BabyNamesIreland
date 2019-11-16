import React from 'react'
import PropTypes from 'prop-types'
import { Statistic, Icon } from 'antd'
import enums from "../../enums"

const BirthNameCountChangeStat = ({ recordedYear = null, name = null, countChange = -1, countChangeDirection = null, style = {} }) => {
  let countChangeDirectionIcon = <Icon type="minus" />
  let countChangeDirectionColor = `#A9A9A9`
  if (countChangeDirection === enums.MOVEMENT.UP) { countChangeDirectionIcon = <Icon type="arrow-up" />; countChangeDirectionColor = `#3f8600` }
  if (countChangeDirection === enums.MOVEMENT.DOWN) { countChangeDirectionIcon = <Icon type="arrow-down" />; countChangeDirectionColor = `#cf1322` }

  return (
    <>
      <Statistic
        title={`${countChangeDirection !== enums.MOVEMENT.NONE ? countChangeDirection === enums.MOVEMENT.UP ? `More` : `Less` : `No change in`} people born since ${recordedYear}`}
        value={countChange}
        valueStyle={{ color: countChangeDirectionColor }}
        prefix={countChangeDirectionIcon}
        style={style}
      />
    </>
  )
}

export default BirthNameCountChangeStat

BirthNameCountChangeStat.propTypes = {
  recordedYear: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  countChange: PropTypes.number.isRequired,
  countChangeDirection: PropTypes.string,
  style: PropTypes.object,
}
