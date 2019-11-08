import React from 'react'
import PropTypes from 'prop-types'
import { Card, Statistic, Icon } from 'antd'
import constants from "./constants"

const BirthNameRankChangeStat = ({ lastRecordedYear = `0000`, rankChange = 0, rankChangeDirection = constants.MOVEMENT.NONE }) => {
  let rankChangeDirectionIcon = <Icon type="minus" />
  let rankChangeDirectionColor = `#A9A9A9`
  let cardInfoMessage = `No change in popularity 🤔`
  if (rankChangeDirection === constants.MOVEMENT.UP) { cardInfoMessage = `Rising popularity! 😎`; rankChangeDirectionIcon = <Icon type="arrow-up" />; rankChangeDirectionColor = `#3f8600` }
  if (rankChangeDirection === constants.MOVEMENT.DOWN) { cardInfoMessage = `Not as popular 😟`; rankChangeDirectionIcon = <Icon type="arrow-down" />; rankChangeDirectionColor = `#cf1322` }

  return (
    <Card>
      <p>{cardInfoMessage}</p>
      <Statistic
        title={`Moved ${rankChangeDirection !== constants.MOVEMENT.NONE ? rankChangeDirection.toLowerCase() : `no places`} since ${lastRecordedYear}`}
        value={rankChange}
        valueStyle={{ color: rankChangeDirectionColor }}
        prefix={rankChangeDirectionIcon}
      />
    </Card>
  )
}

export default BirthNameRankChangeStat

BirthNameRankChangeStat.propTypes = {
  lastRecordedYear: PropTypes.string.isRequired,
  rankChange: PropTypes.number.isRequired,
  rankChangeDirection: PropTypes.string,
}
