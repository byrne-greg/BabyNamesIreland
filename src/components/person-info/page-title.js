import React from 'react'
import PropTypes from 'prop-types'

const PersonInfoPageTitle = ({ title }) => (
  <div style={{ display: `flex`, justifyContent: `center` }}>
    <h1>{title}</h1>
  </div>
)

export default PersonInfoPageTitle

PersonInfoPageTitle.propTypes = {
  title: PropTypes.string.isRequired,
}
