import React from 'react'
import PropTypes from 'prop-types'

const PersonInfoPageTitle = ({ title }) => (
  <h1>{title}</h1>
)

export default PersonInfoPageTitle

PersonInfoPageTitle.propTypes = {
  title: PropTypes.string.isRequired,
}
