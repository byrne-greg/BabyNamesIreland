import { CACHE_CLEAR, CACHE_ADD_SEARCH_RESULT } from "./actionTypes"

export const addCachedSearchResult = (dispatch, value) =>
  updateState(dispatch, CACHE_ADD_SEARCH_RESULT, value)
export const clearCache = (dispatch, value) =>
  updateState(dispatch, CACHE_CLEAR, value)

const updateState = (dispatch, actionType, newValue) =>
  dispatch({ type: actionType, value: newValue })
