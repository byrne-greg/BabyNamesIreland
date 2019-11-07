import React from "react";
import { Link } from "gatsby"
import {FlexibleWidthXYPlot,XYPlot, VerticalBarSeries, VerticalBarSeriesCanvas, LineSeries, LabelSeries, XAxis, YAxis, VerticalGridLines, HorizontalGridLines} from 'react-vis';
import Layout from "../components/layout"
import SEO from "../components/seo"
import '../../node_modules/react-vis/dist/style.css';

export default ({ pageContext: { person } }) => { 
  
  const birthsRegisteredData =  person.data.map(dataObj => { return {x: dataObj.year, y: dataObj.total}})
  const nameRankingData =  person.data.map(dataObj => { return {x: dataObj.year, y: dataObj.rank}})

  const currentYear  = new Date().getFullYear();
  const lastRecordedYear = currentYear - 1;
  const lastRecordedRank = person.data.filter(dataObj =>  dataObj.year == lastRecordedYear)[0].rank
  const secondLastRecordedRank = person.data.filter(dataObj =>  dataObj.year == (lastRecordedYear - 1))[0].rank
  const rankingChange = lastRecordedRank - secondLastRecordedRank;

  const topTenRanking = person.data.filter(dataObj => dataObj.rank > 0 && dataObj.rank <= 10).sort((a,b) => {
    if(a.year < b.year) { return 1};
    if(a.year > b.year) { return -1 };
    return 0;
  });

  function getRankingSuffix(num) {
    if( num % 10 == 1 && num != 11) { return "st" };
if (num % 10 == 2 && num != 12) { return "nd" };
if (num % 10 == 3 && num != 13) { return "rd"};
return "th"
  }

  return (
    <Layout>
    <SEO title={person.name} />
    <h1>{person.name}</h1>
    <h2>{`CSO Registered as a ${person.gender} name`}</h2>
    <h2>{`Ranked ${lastRecordedRank}${getRankingSuffix(lastRecordedRank)} of popular ${person.gender.toLowerCase()} names of ${lastRecordedYear}`}</h2>
    <h2>{`Moved ${rankingChange === 0 ? "no places" : `${(rankingChange < 0 ? "down" : "up")} ${Math.abs(rankingChange)} place in the ${person.gender.toLowerCase()} popular name rankings`}`}</h2>
    {topTenRanking.length > 0 && (<div><p>{`Popular ${person.gender} Name`}</p><ul>{topTenRanking.map(topTenDataObj => <li>{`Rank ${topTenDataObj.rank} in ${topTenDataObj.year}`}</li>)}</ul></div>)}
    <FlexibleWidthXYPlot xType="ordinal" height={500} margin={{left:100}} >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title="year" tickPadding={35} tickSizeInner={500} tickLabelAngle={90} tickTotal={birthsRegisteredData.length} />
      <YAxis title="births registered"/>
      <LineSeries  data={birthsRegisteredData} />
      {/* <LineSeries  data={nameRankingData} /> */}
      <LabelSeries data={birthsRegisteredData} getLabel={d => `${d.y}`} style={{fontSize:"0.5rem"}} />
    </FlexibleWidthXYPlot>
    <FlexibleWidthXYPlot xType="ordinal" height={500} margin={{left:100}} >
      <VerticalGridLines />
      <HorizontalGridLines />
      <XAxis title="year" tickPadding={35} tickSizeInner={500} tickLabelAngle={90} tickTotal={birthsRegisteredData.length} />
      <YAxis title="rankings"/>
      <LineSeries  data={nameRankingData} />
      {/* <LineSeries  data={nameRankingData} /> */}
      <LabelSeries data={nameRankingData} getLabel={d => `${d.y}`} style={{fontSize:"0.5rem"}} />
    </FlexibleWidthXYPlot>
    <Link to="/search">Back</Link>{` `}<Link to="/about">Home</Link>
  </Layout>
)}



    