import React from "react"
import { LinkButton } from "../components/button"
import Layout from "../components/layout"
import SEO from "../components/seo"
import routes from "../routes"
import styleColors from "../style-colors"
import { LinkedInLink, GithubRepoLink, GatsbyLink, NetlifyLink, CSOLink, DataBackgroundNotes } from "../components/links"

const AboutPage = () => (
  <Layout>
    <SEO title="About" />
    <h1>About</h1>
    <h2>The Author</h2>
    <p>This site was created by <LinkedInLink/> who likes to dabble in all things software engineering.</p>
    <h2>The Site</h2>
    <p>The code for this site can be found on the <GithubRepoLink/>.</p>
    <p>It uses a mix of technologies, with the core being <GatsbyLink/> to statically generate the site using data retrieved from the <CSOLink/> and then deployed to <NetlifyLink/>.</p>
    <p>More information about the birth name data that&apos;s used can be found on the CSO&apos; collated <DataBackgroundNotes/>.</p>
    <LinkButton type="primary" style={{ backgroundColor: styleColors.PRIMARY_GREEN, borderColor: styleColors.PRIMARY_GREEN, margin: `0 1rem` }}to={routes.NAME_SEARCH}>Search Name</LinkButton>
    <LinkButton type="default" style={{ borderColor: styleColors.PRIMARY_GREEN, margin: `0 1rem` }} to={routes.HOME}>Home</LinkButton>
  </Layout>
)

export default AboutPage
