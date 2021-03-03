import React from 'react'
import { navigate } from 'gatsby'
import routes from '../routes'

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer style={{ marginTop: `2rem`, marginBottom: `1rem` }}>
      {`© ${currentYear === 2019 ? `2019` : `2019-${currentYear}`}, Built with ♡ by `} 
      <span style={{ color: `#1890ff`, cursor: `pointer` }}onClick={() => navigate(routes.ABOUT)}>Greg Byrne</span>
    </footer>
  )
}

export default Footer
