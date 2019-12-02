import React from 'react'
import { LinkedInLink } from "./links"

const Footer = () => {
  const currentYear = new Date().getFullYear()
  return (
    <footer style={{ marginTop: `2rem`, marginBottom: `1rem` }}>
      {`© ${currentYear === 2019 ? `2019` : `2019-${currentYear}`}, Built with ❤️ by `} <LinkedInLink/>
    </footer>
  )
}

export default Footer
