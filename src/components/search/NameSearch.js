import React, { useState, useContext, useEffect, useCallback } from "react"
import PropTypes from 'prop-types'
import { List, Card } from 'antd'
import { navigate } from 'gatsby'
import NameSearchInput from './NameSearchInput'
import routes from "../../routes"
import styleColors from "../../style-colors"
import { isFemale, debounce } from "../../utils"
import { GlobalDispatchContext, GlobalStateContext } from "../../context/global/GlobalContextProvider"
import { addCachedSearchResult } from "../../context/global/actions"

const getCardStyle = (gender) => {
  const style = {
    borderRadius: `1.5rem`,
    cursor: `pointer`,
  }
  isFemale(gender)
    ? style.backgroundColor = styleColors.CARD.FEMALE_BACKGROUND_COLOR
    : style.backgroundColor = styleColors.CARD.MALE_BACKGROUND_COLOR

  return style
}

const sortBirthNamesList = birthNamesList => birthNamesList.sort((a, b) => {
  const aName = a.name.toUpperCase()
  const bName = b.name.toUpperCase()
  if (aName < bName) { return -1 }
  if (aName > bName) { return 1 }
  return 0
})

const calculateActiveNameList = (searchName, searchResultCache, activeNameList) => {
  if (searchName === ``) {
    console.log(`searchname=${searchName}`, `Reusing All Values`)
    return searchResultCache.none
  }

  if (searchResultCache[searchName]) {
    console.log(`searchname=${searchName}`, `Reusing Cache Value`)
    return searchResultCache[searchName]
  }

  if (!searchResultCache[searchName]) {
    console.log(`searchname=${searchName}`, `Calculating New Value`)

    // When a user searches for a name, they will likely start with the initial character of that name.
    // The result list should order the results with the characters that match the start of the name first before showing 'fuzzy' matches (names containing part of the name)
    // e.g. typing 'GA' should show 'Gary' first before 'Abigail'
    const startsWithSearchNameList = activeNameList.filter(({ name }) => name.toUpperCase().startsWith(searchName.toUpperCase()))
    const containsSearchNameList = activeNameList.filter(person => person.name.toUpperCase().includes(searchName.toUpperCase() || (person.name.toUpperCase().includes(searchName.toUpperCase()) && startsWithSearchNameList.indexOf(person) < 0)))

    const filteredNameList = [
      ...startsWithSearchNameList,
      ...containsSearchNameList]

    return filteredNameList
  }
}

const NameSearch = ({ data, showNamesByDefault = false }) => {
  const globalDispatch = useContext(GlobalDispatchContext)
  const { searchResultCache } = useContext(GlobalStateContext)

  const [activeNameList, setActiveNameList] = useState(data.allBirthNames.nodes)
  const [isActive, setIsActive] = useState(false)
  console.log(`searchResultCache`, searchResultCache)

  useEffect(() => {
    const sortedBirthNames = sortBirthNamesList(data.allBirthNames.nodes)
    setActiveNameList(sortBirthNamesList)
    addCachedSearchResult(globalDispatch, { none: sortedBirthNames })
  }, [data.allBirthNames.nodes, sortBirthNamesList, addCachedSearchResult, setActiveNameList])

  const getActiveNameListForName = name => {
    const nameList = calculateActiveNameList(name, searchResultCache, activeNameList)
    if (name && name !== ``) {
      const searchResult = {}
      searchResult[name] = nameList
      addCachedSearchResult(globalDispatch, searchResult)
    }
    setActiveNameList(nameList)
  }

  return (
    <>
      <NameSearchInput
        onSearch={enteredValue => {
          setIsActive(true)
          getActiveNameListForName(enteredValue)
          if (activeNameList.length === 1) { navigate(`${routes.NAME_SEARCH}/${activeNameList[0].name}`) }
        }}
        onChange={event => {
          setIsActive(true)
          getActiveNameListForName(event.target.value)
        }}
        onClick={event => { setIsActive(true); event.target.value = ``; getActiveNameListForName(``) }}/>
      {isActive || showNamesByDefault
        ? (
          <div style={{ maxHeight: `800px` }}>
            <NameCardList nameList={activeNameList} />
          </div>) : null}
    </>
  )
}

// TODO: should we be enforcing prop types for data retrieved by GraphQL?
NameSearch.propTypes = {
  data: PropTypes.object.isRequired,
  showNamesByDefault: PropTypes.bool,
}

// eslint-disable-next-line react/prop-types
const NameCardList = ({ nameList = [] }) => (
  <List
    grid={{ gutter: 16, xs: 2, sm: 3, xl: 4 }}
    dataSource={nameList}
    pagination={{
      showSizeChanger: true,
      defaultPageSize: 100,
      pageSizeOptions: [`100`, `300`, `500`, `800`],
      total: nameList.length,
      position: `both`,
    }}
    renderItem={item => (
      <List.Item>
        <Card
          style={getCardStyle(item.gender)}
          onClick={() => navigate(routes.PERSON_INFO(item.name))}
        >
          <Card.Meta title={item.name} description={item.gender} />
        </Card>
      </List.Item>

    )}
  />
)

export default NameSearch
