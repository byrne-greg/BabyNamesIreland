import React from "react"
import PropTypes from "prop-types"
import { FlexibleWidthXYPlot, LineSeries, LabelSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines } from "react-vis"

const BirthNameRankChart = ({ birthNameRankData }) => {
  const birthNameRankChartData = birthNameRankData.map(dataObj => { return { x: dataObj.year, y: dataObj.rank } })
  const rankings = birthNameRankData.map(dataObj => { return dataObj.rank })
  const nameRankMax = Math.max(...rankings)
  const nameRankMin = Math.min(...rankings)

  return (
    <FlexibleWidthXYPlot xType="ordinal" height={500} margin={{ left: 100 }} yDomain={[nameRankMax, nameRankMin]}>
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title="year" tickPadding={35} tickSizeInner={500} tickLabelAngle={90} tickTotal={birthNameRankChartData.length} />
      <YAxis title="rankings"/>
      <LineSeries data={birthNameRankChartData} />
      <LabelSeries data={birthNameRankChartData} getLabel={d => `${d.y}`} style={{ fontSize: `0.5rem` }} />
    </FlexibleWidthXYPlot>
  )
}

export default BirthNameRankChart

BirthNameRankChart.propTypes = {
  birthNameRankData: PropTypes.arrayOf(PropTypes.shape({ year: PropTypes.string, total: PropTypes.number })).isRequired,
}
