import React from 'react'
import PropTypes from 'prop-types'
import { Statistic, Icon } from 'antd'
import constants from "./constants"

const BirthNameRankChangeStat = ({ lastRecordedYear = null, rankChange = -1, rankChangeDirection = null, style = {} }) => {
  let rankChangeDirectionIcon = <Icon type="minus" />
  let rankChangeDirectionColor = `#A9A9A9`
  let cardInfoMessage = `No change in popularity 🤔`
  if (rankChangeDirection === constants.MOVEMENT.UP) { cardInfoMessage = `Rising popularity! 😎`; rankChangeDirectionIcon = <Icon type="arrow-up" />; rankChangeDirectionColor = `#3f8600` }
  if (rankChangeDirection === constants.MOVEMENT.DOWN) { cardInfoMessage = `Not as popular 😟`; rankChangeDirectionIcon = <Icon type="arrow-down" />; rankChangeDirectionColor = `#cf1322` }

  return (
    <>
      <Statistic
        title={`Moved ${rankChangeDirection !== constants.MOVEMENT.NONE ? rankChangeDirection.toLowerCase() : `no places`} in popularity since ${lastRecordedYear}`}
        value={rankChange}
        valueStyle={{ color: rankChangeDirectionColor }}
        prefix={rankChangeDirectionIcon}
        style={style}
      />
      <p>{cardInfoMessage}</p>
    </>
  )
}

export default BirthNameRankChangeStat

BirthNameRankChangeStat.propTypes = {
  lastRecordedYear: PropTypes.string.isRequired,
  rankChange: PropTypes.number.isRequired,
  rankChangeDirection: PropTypes.string,
  style: PropTypes.object,
}
