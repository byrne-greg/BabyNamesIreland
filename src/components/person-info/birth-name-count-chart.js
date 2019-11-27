import React from 'react'
import PropTypes from 'prop-types'
import { FlexibleWidthXYPlot, LineMarkSeries, LabelSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines } from 'react-vis'

const BirthNameCountChart = ({ birthNameCountData }) => {
  const birthNameCountChartData = birthNameCountData.map(dataObj => { return { x: dataObj.year, y: dataObj.total } }).sort((a, b) => Number(a.x) - Number(b.x))

  // due to the unknown size of the numbers on the x-axis (e.g. 1 -> 1000's), we need to indent the margin when numbers are sufficiently large enough that they clip in the edge
  const birthNameCountLargestNumber = birthNameCountChartData.reduce((acc, currentValue) => Math.max(acc, currentValue.y), 0)
  let chartLeftMargin = 40 // default
  if (birthNameCountLargestNumber >= 1000) {
    chartLeftMargin = 45
  }

  return (
    <FlexibleWidthXYPlot xType="ordinal" height={500} margin={{ left: chartLeftMargin }} >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title="year" tickPadding={5} tickSizeInner={500} tickLabelAngle={-90} />
      <YAxis title="births registered"/>
      <LineMarkSeries data={birthNameCountChartData} />
      <LabelSeries data={birthNameCountChartData} getLabel={d => `${d.y}`} style={{ fontSize: `0.5rem` }} />
    </FlexibleWidthXYPlot>
  )
}

export default BirthNameCountChart

BirthNameCountChart.propTypes = {
  birthNameCountData: PropTypes.arrayOf(PropTypes.shape({ year: PropTypes.string, total: PropTypes.number })).isRequired,
}
