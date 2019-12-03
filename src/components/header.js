import React from "react"
import PropTypes from "prop-types"
import { Link, navigate, withPrefix } from "gatsby"
import { Menu } from 'antd'
import styleColors from "../style-colors"
import routes from "../routes"
import BniTextLogo from "./image"

const Header = ({ headerGap = true }) => {
  return (
    <>
      <header
        style={{
          background: styleColors.HEADER.BACKGROUND,
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
          <section style={{ maxWidth: 350 }}>
            <Link
              to="/"
              style={{
                color: `white`,
                textDecoration: `none`,
              }}
            >
              <BniTextLogo />
            </Link>
          </section>
        </div>
      </header>
      <NavigationMenu headerGap={headerGap}/>
    </>
  )
}

Header.propTypes = {
  headerGap: PropTypes.bool,
}

export default Header

const NavigationMenu = ({ headerGap }) => {
  const keyRouteMap = [{ key: `1`, route: routes.HOME }, { key: `2`, route: routes.NAME_SEARCH }, { key: `3`, route: routes.ABOUT }]

  const setSelectedMenuKey = () => {
    const keyRoute = keyRouteMap.filter((keyRoute) => location.pathname === withPrefix(keyRoute.route))[0]
    return keyRoute ? keyRoute.key : `0`
  }

  return (
    <section>
      <Menu
        mode="horizontal"
        selectedKeys={[setSelectedMenuKey()]}
        style={{ lineHeight: `3rem`, display: `flex`, justifyContent: `center`, marginBottom: headerGap ? `1.45rem` : 0 }}
        onClick={(e) => {
          keyRouteMap.forEach(keyRoute => {
            if (keyRoute.key === e.key) {
              navigate(keyRoute.route)
            }
          })
        }}
      >
        <Menu.Item key="1">Home</Menu.Item>
        <Menu.Item key="2" >Search</Menu.Item>
        <Menu.Item key="3">About</Menu.Item>
      </Menu>
    </section>
  )
}

NavigationMenu.propTypes = {
  headerGap: PropTypes.bool,
}
