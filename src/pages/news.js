import React from "react"
import Layout, { Section } from "../components/layout"
import SEO from "../components/seo"
// TODO - move the news to markdown and apply gatsby templates.

const newsItem_20210304_1 = {
  headline: `Archival of Registered Births in Ireland`,
  date: `March 3, 2021`,
  content: (<div><p>For the last number of years, this site used the &quote;Births Registered in Ireland&quote; datasets provided by the CSO. These tracked babies who were born and registered within Ireland and ranged for more than last 20 years. These datasets (VSA10 and VSA11) have been archived as of this year and are no longer updated past 2019.
  </p>
  <p>From 2020 onwards, the datasets used by the CSO to calculate baby names will be VSA50 and VSA60 which record the &quote;Names in Ireland with 3 or More Occurrences&quote;. This data, according to correspondence with the CSO, is still births registered data as per registrations with the General Registrars Office in Roscommon.</p>
  <p>We have updated the data to use these occurrences datasets which means a greater amount of data is available.</p>
  </div>),
}

const newsItems = [
  newsItem_20210304_1,
]

const NewsPage = () => {
  return (
    <Layout>
      <SEO title="News" />
      <Section>
        {/* <h1>{data.site.siteMetadata.title}</h1> */}
        <h2>News</h2>
        {newsItems.map(newsItem => (
          <NewsItemTemplate
            key={newsItem.date}
            headline={newsItem.headline}
            date={newsItem.date}
            content={newsItem.content} />
        ))}
      </Section>
      {/* Blurb */}
    </Layout>
  )
}
export default NewsPage

const NewsItemTemplate = ({ headline, date, content }) => (
  <div>
    <h3>{headline}</h3>
    <h4>{date}</h4>
    {content}
  </div>
)
