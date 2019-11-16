import React from 'react'
import PropTypes from 'prop-types'
import { Statistic } from 'antd'
import { getRankingSuffix } from '../../utils'

const BirthNameRankStat = ({ lastRecordedYear = null, rank = -1, gender = null, style = {} }) => {
  return (

    <Statistic
      title={`${gender} name popularity in ${lastRecordedYear}`}
      value={rank}
      suffix={getRankingSuffix(rank)}
      style={style}
    />

  )
}

export default BirthNameRankStat

BirthNameRankStat.propTypes = {
  lastRecordedYear: PropTypes.string.isRequired,
  rank: PropTypes.number.isRequired,
  gender: PropTypes.string.isRequired,
  movementArrow: PropTypes.string,
  style: PropTypes.object,
}
