import { CACHE_CLEAR, CACHE_ADD_SEARCH_RESULT } from "./actionTypes"

/**
 * Reducer to manage any global (app-level) state changes
 * @param {Object} state the global state
 * @param {string} action the action describing the state change
 * @return {Object} new state object
 */
function globalReducer (state, action) {
  switch (action.type) {
    case CACHE_ADD_SEARCH_RESULT:
      console.log(state)
      return { ...state, searchResultCache: { ...state.searchResultCache, ...action.value } }
    case CACHE_CLEAR:
      return { ...state, searchResultCache: {} }

    default:
      return { ...state }
  }
}
export default globalReducer
