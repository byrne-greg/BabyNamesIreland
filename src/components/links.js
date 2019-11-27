import React from 'react'
import PropTypes from 'prop-types'

export const LinkedInLink = () => <CoreLink url={`https://www.linkedin.com/in/byrne-greg/`} text={`Greg Byrne`}/>

export const GithubRepoLink = () => <CoreLink url={`https://github.com/byrne-greg/BabyNamesIreland`} text={`Baby Names Ireland Github Repo`}/>

export const GatsbyLink = () => <CoreLink url={`https://www.gatsbyjs.org/`} text={`Gatsby`}/>

export const NetlifyLink = () => <CoreLink url={`https://www.netlify.com/`} text={`Netlify`}/>

export const CSOLink = () => <CoreLink url={`https://www.cso.ie/en/databases/`} text={`Central Statistics Office`}/>

export const DataBackgroundNotes = () => <CoreLink url={`https://www.cso.ie/en/releasesandpublications/ep/p-ibn/irishbabiesnames2018/backgroundnotes/`} text={`background notes`}/>

const CoreLink = ({ url = `http://www.babynamesireland.netlify.com`, text = `Baby Names Ireland` }) => (<a href={url} target="_blank" rel="noopener noreferrer">{text}</a>)

export default CoreLink
CoreLink.propTypes = {
  url: PropTypes.string.isRequired,
  text: PropTypes.string.isRequired,
}
