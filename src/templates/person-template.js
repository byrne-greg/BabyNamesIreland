import React from "react";
import { Link } from "gatsby"
import {FlexibleWidthXYPlot,XYPlot, VerticalBarSeries, VerticalBarSeriesCanvas, LineSeries, LabelSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines} from 'react-vis';
import Layout from "../components/layout"
import SEO from "../components/seo"
import '../../node_modules/react-vis/dist/style.css';

export default ({ pageContext: { person } }) => { 
  
  const chartData =  person.data.map(dataObj => { return {x: dataObj.year, y: dataObj.total}})

  return (
    <Layout>
    <SEO title={person.name} />
    <h1>{person.name}</h1>
    <h2>{person.gender}</h2>
    {/* <XYPlot height={300} width={300}>
      <VerticalBarSeries data={chartData} />
    </XYPlot> */}
    <FlexibleWidthXYPlot xType="ordinal" height={500} margin={{left:100}} >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title="year" tickPadding={35} tickSizeInner={500} tickLabelAngle={90} tickTotal={chartData.length} />
      <YAxis title="births registered"/>
      <LineSeries  data={chartData} />
      <LabelSeries data={chartData} getLabel={d => `${d.y}`} style={{fontSize:"0.5rem"}} />
    </FlexibleWidthXYPlot>
    <Link to="/search">Back</Link>{` `}<Link to="/about">Home</Link>
  </Layout>
)}




    