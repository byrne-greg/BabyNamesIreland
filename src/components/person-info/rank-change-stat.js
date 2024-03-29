import React from 'react'
import PropTypes from 'prop-types'
import { Statistic, Icon } from 'antd'
import enums from "../../enums"
import styleColors from "../../style-colors"

const BirthNameRankChangeStat = ({ recordedYear = null, rankChange = -1, rankChangeDirection = null, style = {} }) => {
  let rankChangeDirectionIcon = <Icon type="minus" />
  let rankChangeDirectionColor = styleColors.STAT_CHANGE.NO_CHANGE
  if (rankChangeDirection === enums.MOVEMENT.UP) { rankChangeDirectionIcon = <Icon type="arrow-up" />; rankChangeDirectionColor = styleColors.STAT_CHANGE.INCREASE }
  if (rankChangeDirection === enums.MOVEMENT.DOWN) { rankChangeDirectionIcon = <Icon type="arrow-down" />; rankChangeDirectionColor = styleColors.STAT_CHANGE.DECREASE }

  let dynamicStatText = `Same popularity`
  if (rankChangeDirection === enums.MOVEMENT.UP) { dynamicStatText = `More popular` }
  if (rankChangeDirection === enums.MOVEMENT.DOWN) { dynamicStatText = `Less popular` }

  return (
    <>
      <Statistic
        title={`${dynamicStatText} since ${recordedYear}`}
        value={rankChange}
        valueStyle={{ color: rankChangeDirectionColor }}
        prefix={rankChangeDirectionIcon}
        style={style}
      />
    </>
  )
}

export default BirthNameRankChangeStat

BirthNameRankChangeStat.propTypes = {
  recordedYear: PropTypes.string.isRequired,
  rankChange: PropTypes.number.isRequired,
  rankChangeDirection: PropTypes.string,
  style: PropTypes.object,
}
