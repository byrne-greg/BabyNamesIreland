
import React from "react"
import PropTypes from "prop-types"
import { navigate } from "gatsby"
import { Button } from 'antd'
import routes from "../routes"

export const LinkButton = ({ type = `link`, to = routes.HOME, style = {}, children }) => <Button type={type} onClick={() => navigate(to)} style={style}>{children}</Button>
LinkButton.propTypes = {
  type: PropTypes.string,
  to: PropTypes.string.isRequired,
  style: PropTypes.object,
  children: PropTypes.node.isRequired,
}
