import { Link } from "gatsby"
import PropTypes from "prop-types"
import React from "react"
import { LinkButton } from "./button"
import styleColors from "../style-colors"
import routes from "../routes"
import BniTextLogo from "./image"

const Header = ({ headerGap = true, siteTitle }) => (
  <header
    style={{
      background: styleColors.HEADER.BACKGROUND,
      marginBottom: headerGap ? `1.45rem` : 0,
    }}
  >
    <div
      style={{
        margin: `0 auto`,
        maxWidth: 960,
        padding: `1.45rem 1.0875rem`,
        display: `flex`,
        justifyContent: `space-between`,
        flexDirection: `column`,
      }}
    >
      {/* <h1 style={{ margin: 0 }}> */}
      <div id="bni-text-logo" style={{ width: 300 }}>
        <Link
          to="/"
          style={{
            color: `white`,
            textDecoration: `none`,
          }}
        >
          <BniTextLogo />
        </Link>
      </div>
      {/* </h1> */}
      <div >
        <LinkButton type="default" to={routes.ABOUT} style={{ backgroundColor: `white`, margin: `0.5rem 1rem` }}>About</LinkButton>
        <LinkButton type="default" to={routes.NAME_SEARCH} style={{ backgroundColor: `white`, margin: `0.5rem 1rem` }}>Search</LinkButton>
      </div>
    </div>
  </header>
)

Header.propTypes = {
  siteTitle: PropTypes.string,
  headerGap: PropTypes.bool,
}

Header.defaultProps = {
  siteTitle: ``,
}

export default Header
