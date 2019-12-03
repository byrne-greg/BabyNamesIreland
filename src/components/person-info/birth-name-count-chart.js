import React from 'react'
import PropTypes from 'prop-types'
import { FlexibleWidthXYPlot, LineSeries, LineMarkSeries, LabelSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines, Hint } from 'react-vis'

const BirthNameCountChart = ({ birthNameCountData }) => {
  const birthNameTotalCountLineData = birthNameCountData.map(dataObj => { return { x: dataObj.year, y: dataObj.total } }).sort((a, b) => Number(a.x) - Number(b.x))

  // due to the unknown size of the numbers on the x-axis (e.g. 1 -> 1000's), we need to indent the margin when numbers are sufficiently large enough that they clip in the edge
  const birthNameCountLargestNumber = birthNameTotalCountLineData.reduce((acc, currentValue) => Math.max(acc, currentValue.y), 0)
  let chartLeftMargin = 40 // default
  if (birthNameCountLargestNumber >= 1000) {
    chartLeftMargin = 45
  }

  const birthNameCountAverage = birthNameTotalCountLineData.reduce((acc, currentValue) => acc + currentValue.y, 0) / birthNameTotalCountLineData.length
  const birthNameCountAverageLineData = birthNameCountData.map(dataObj => { return { x: dataObj.year, y: birthNameCountAverage } }).sort((a, b) => Number(a.x) - Number(b.x))

  return (
    <FlexibleWidthXYPlot xType="ordinal" height={500} margin={{ left: chartLeftMargin }} >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title="year" tickPadding={5} tickSizeInner={500} tickLabelAngle={-90} />
      <YAxis title="births registered"/>
      <LineMarkSeries data={birthNameTotalCountLineData} curve={`curveMonotoneX`} />
      <LineSeries data={birthNameCountAverageLineData} strokeStyle={`dashed`}/>
      <LabelSeries data={birthNameTotalCountLineData} getLabel={d => `${d.y}`} style={{ fontSize: `0.5rem` }} />
    </FlexibleWidthXYPlot>
  )
}

export default BirthNameCountChart

BirthNameCountChart.propTypes = {
  birthNameCountData: PropTypes.arrayOf(PropTypes.shape({ year: PropTypes.string, total: PropTypes.number })).isRequired,
}
