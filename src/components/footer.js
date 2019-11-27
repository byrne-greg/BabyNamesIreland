import React from 'react'
import { LinkedInLink } from "./links"

const Footer = () => (
  <footer style={{ marginTop: `2rem`, marginBottom: `1rem` }}>
    {`© ${new Date().getFullYear()}, Built with ❤️ by `} <LinkedInLink/>
  </footer>
)

export default Footer
