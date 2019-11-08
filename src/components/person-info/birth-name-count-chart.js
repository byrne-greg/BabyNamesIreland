import React from 'react'
import PropTypes from 'prop-types'
import { FlexibleWidthXYPlot, LineSeries, LabelSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines } from 'react-vis'

const BirthNameCountChart = ({ birthNameCountData }) => {
  const birthNameCountChartData = birthNameCountData.map(dataObj => { return { x: dataObj.year, y: dataObj.total } })
  console.log(birthNameCountChartData)

  return (
    <FlexibleWidthXYPlot xType="ordinal" height={500} margin={{ left: 100 }} >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title="year" tickPadding={35} tickSizeInner={500} tickLabelAngle={90} />
      <YAxis title="births registered"/>
      <LineSeries data={birthNameCountChartData} />
      <LabelSeries data={birthNameCountChartData} getLabel={d => `${d.y}`} style={{ fontSize: `0.5rem` }} />
    </FlexibleWidthXYPlot>
  )
}

export default BirthNameCountChart

BirthNameCountChart.propTypes = {
  birthNameCountData: PropTypes.arrayOf(PropTypes.shape({ year: PropTypes.string, total: PropTypes.number })).isRequired,
}
