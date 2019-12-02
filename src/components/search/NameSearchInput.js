import React from "react"
import PropTypes from 'prop-types'
import { Input } from 'antd'

const NameSearchInput = ({ onSearch = () => {}, onClick = () => {}, onChange = () => {} }) => {
  return (
    <div style={{ margin: `1rem` }}>
      <div style={{ display: `flex`, justifyContent: `center` }}>
        <label htmlFor="name-search" style={{
          color: `rgba(0, 0, 0, 0.85)`,
          fontWeight: `600`,
          fontSize: `1rem`,
        }}>Search for a baby name</label>
      </div>
      <Input.Search
        placeholder="type name here"
        size="large"
        enterButton
        onSearch={onSearch}
        onChange={onChange}
        onClick={onClick}
        style={{ margin: `1rem 0` }}
        id="name-search"
      />
    </div>)
}
NameSearchInput.propTypes = {
  onSearch: PropTypes.func.isRequired,
  onClick: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
}

export default NameSearchInput
