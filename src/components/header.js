import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { LinkButton } from "./button"
import styleColors from "../style-colors"
import routes from "../routes"

const Header = ({ siteTitle }) => (
  <header
    style={{
      background: styleColors.HEADER.BACKGROUND,
      marginBottom: `1.45rem`,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
        display: `flex`,
        justifyContent: `space-between`,
      }}
    >
      <h1 style={{ margin: 0 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          {siteTitle}
        </Link>
      </h1>
      <div>
        <LinkButton type="default" to={routes.ABOUT} style={{ backgroundColor: `white`, margin: `0.5rem` }}>About</LinkButton>
        <LinkButton type="default" to={routes.NAME_SEARCH} style={{ backgroundColor: `white`, margin: `0.5rem` }}>Search for Name</LinkButton>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
