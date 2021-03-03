import React from "react"
import Layout, { Section } from "../components/layout"
import SEO from "../components/seo"

const newsItem_20210304_1 = {
  headline: `Archival of Registered Births in Ireland`,
  date: `March 3, 2021`,
  content: (<div><p>For the last number of years, this site used the "Births Registered in Ireland" datasets provided by the CSO. These tracked babies who were born and registered within Ireland and ranged for more than last 20 years. These datasets (VSA10 and VSA11) have been archived as of this year and are no longer updated past 2019.
  </p>
  <p>From 2020 onwards, the datasets used by the CSO to calculate baby names will be VSA50 and VSA60 which record the "Names in Ireland with 3 or More Occurrences". This means that the name isn't necessarily one used during registration of a baby in Ireland but rather just that a person existed in Ireland when their name was recorded for a year and could be in Ireland from any means including birth.</p>
  <p>We have updated the data to use these occurrences datasets which means a greater amount of data is available. It must be remembered though that these are occurrences rather than real registered birth figures.</p>
  </div>)
}

const newsItems = [
  newsItem_20210304_1
]


const NewsPage = () => {
  return (
    <Layout>
      <SEO title="News" />
      <Section>
        {/* <h1>{data.site.siteMetadata.title}</h1> */}
        <h2>News</h2>
        {console.log(newsItems)}
        {newsItems.map(newsItem => <NewsItemTemplate headline={newsItem.headline} date={newsItem.date} content={newsItem.content} />)}
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

 
 



  