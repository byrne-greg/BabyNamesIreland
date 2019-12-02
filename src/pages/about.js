import React from "react"
import { Helmet } from 'react-helmet'
import { LinkButton } from "../components/button"
import Layout from "../components/layout"
import SEO from "../components/seo"
import routes from "../routes"
import styleColors from "../style-colors"
import { LinkedInLink, GithubRepoLink, GatsbyLink, NetlifyLink, CSOLink, DataBackgroundNotes, AntDesignLink, ReactLink, ReactVisLink, AxiosLink, JSONStatLink, PopularFirstNamesInIrelandLink } from "../components/links"

const AboutPage = () => (
  <>
    <Helmet>
      <script type="text/javascript" src="https://platform.linkedin.com/badges/js/profile.js" async defer></script>
    </Helmet>
    <Layout>
      <SEO title="About" />
      <h1>About</h1>
      <AboutTheAuthor/>
      <AboutTheSite/>
      <LinkButton type="primary" style={{ backgroundColor: styleColors.PRIMARY_GREEN, borderColor: styleColors.PRIMARY_GREEN, margin: `0 1rem` }}to={routes.NAME_SEARCH}>Search Name</LinkButton>
      <LinkButton type="default" style={{ borderColor: styleColors.PRIMARY_GREEN, margin: `0 1rem` }} to={routes.HOME}>Home</LinkButton>
    </Layout>
  </>
)

export default AboutPage

const AboutTheAuthor = () => (
  <div style={{ margin: `1rem 0` }}>
    <h2>The Author</h2>
    <p>This site was created by <LinkedInLink/> who likes to dabble in all things software engineering.</p>
    <div style={{ margin: `1rem` }}>
      <div className="LI-profile-badge" data-version="v1" data-size="medium" data-locale="en_US" data-type="horizontal" data-theme="light" data-vanity="byrne-greg"><a className="LI-simple-link" href='https://ie.linkedin.com/in/byrne-greg?trk=profile-badge'>Greg Byrne</a></div>
    </div>
    <p>The project&apos;s overall mission to further understand Gatsby through use. As a means to that mission, the project goal was a rewrite of <PopularFirstNamesInIrelandLink/> which, while good for a first attempt, had some initial and entropic problems which I never resolved.</p>
  </div>
)

const AboutTheSite = () => (
  <div style={{ margin: `2rem 0` }}>
    <h2>The Site</h2>
    <p>The underlying birth name data that&apos;s used is provided by the Irish Central Statistics Office. More information on the data can be found on the CSO&apos; collated <DataBackgroundNotes/>.</p>
    <p>The code for this site can be found on the <GithubRepoLink/>.</p>
    <p>It uses a mix of technologies such as:</p>
    <ul>
      <li>using <GatsbyLink/> to statically generate the site</li>
      <li>continuously deployed using <NetlifyLink/></li>
      <li>built with <ReactLink/> components on top of the <AntDesignLink/> React components</li>
      <li>charts built with <ReactVisLink/> components</li>
      <li>data retrieved via API using <AxiosLink/> from <CSOLink/> and parsed with <JSONStatLink/></li>
    </ul>
  </div>)
