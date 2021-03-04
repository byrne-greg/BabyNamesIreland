import React from "react"
import PropTypes from "prop-types"
import GlobalContextProvider from "../context/global/GlobalContextProvider"

// This API allows wrapping of the root Component in Gatsby
// Use: Wrapping a global Context for web app state management
const App = ({ children }) => {
  return (
    <GlobalContextProvider>
      {children}
    </GlobalContextProvider>
  )
}
App.propTypes = {
  children: PropTypes.node.isRequired,
}
export default App
